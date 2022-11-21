import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './views/list-user/list-user.component';
import { NavComponent } from './views/nav/nav.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';

const routes: Routes = [
  { path: 'home', component: NavComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'list-user', component: ListUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
