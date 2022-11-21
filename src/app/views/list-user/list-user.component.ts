import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { UserList } from 'src/app/interfaces/user-list';
import { localStorageKey } from 'src/app/services/local-storage.constants';
import { LocalStorageService } from '../../services/local-storage.service';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modalcomponent';
import { RegisterUserComponent } from '../register-user/register-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  @ViewChild('table') table: MatTable<UserList[]>;
  public userList: UserList[];
  displayedColumns: string[] = ['nome', 'email', 'cpf', 'telefone', 'editar', 'deletar'];

  constructor(
    private localStorage: LocalStorageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userList = this.localStorage.getData(localStorageKey);
  }

  editLine(index: number) {
    if(this.userList[index]) {
      const dialogRef = this.dialog.open(RegisterUserComponent, {
        width: '350px',
        data: {
          userList: this.userList,
          index: index,
          update: true
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.userList = result;
        this.table.renderRows();
      });
    }
  }

  deleteLine(index: number) {
    if(this.userList[index]) {
      const dialogRef = this.dialog.open(DeleteModalComponent, {
        width: '250px',
        data: this.userList[index]
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.userList.splice(index, 1);
          this.localStorage.saveData(localStorageKey, this.userList);
          this.snackBar.open('Usuário removido com sucesso', null, {
            duration: 2000,
            verticalPosition: 'top'
          })
          this.table.renderRows()
        }
      });
    }
  }
}

