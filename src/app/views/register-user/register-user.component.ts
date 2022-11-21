import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserList } from 'src/app/interfaces/user-list';
import { localStorageKey } from 'src/app/services/local-storage.constants';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;

  constructor(
    private localStorage: LocalStorageService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userList: UserList, index: number, update: boolean},
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      cpf: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
      telefone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11)])),
    });

    if(this.data.update) {
      console.log(this.data);
      this.form.setValue({
        nome: this.data.userList[this.data.index].nome,
        email: this.data.userList[this.data.index].email,
        cpf: this.data.userList[this.data.index].cpf,
        telefone: this.data.userList[this.data.index].telefone,
      })
    }
  }

  onSubmit() {
    if(this.data.update) {
      this.updateUserList();
    } else {
      this.saveUserList();
    }
  }

  updateUserList() {
    if(!this.form.valid) {
      this.snackBar.open('Ops, parece que ficou faltando alguma informação. Favor Verificar!', null, {
        duration: 2000,
        verticalPosition: 'top'
      })
      return
    }

    this.loading = true;

    //adicionado timeout para podermos ver a interação do loading
    setTimeout(() => {
      this.data.userList[this.data.index] = this.form.value;

      this.localStorage.saveData(localStorageKey, this.data.userList);
      this.snackBar.open('Salvo com sucesso!', null, {
        duration: 2000,
        verticalPosition: 'top'
      })
      this.resetForm()
      this.loading = false;
      this.dialogRef.close(this.data.userList);
    }, 2500);
  }

  saveUserList() {
    if(!this.form.valid) {
      this.snackBar.open('Ops, parece que ficou faltando alguma informação. Favor Verificar!', null, {
        duration: 2000,
        verticalPosition: 'top'
      })
      return
    }

    this.loading = true;
    let users = this.localStorage.getData(localStorageKey);

    //adicionado timeout para podermos ver a interação do loading
    setTimeout(() => {

      if (!users || users.length <= 0) {
        this.localStorage.saveData(localStorageKey, [this.form.value]);
      } else {
        users.push(this.form.value);
        this.localStorage.saveData(localStorageKey, users);
      }

      this.snackBar.open('Salvo com sucesso!', null, {
        duration: 2000,
        verticalPosition: 'top'
      })
      this.resetForm()
      this.loading = false;
    }, 2500);
  }


  resetForm() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
  });
  }
}
