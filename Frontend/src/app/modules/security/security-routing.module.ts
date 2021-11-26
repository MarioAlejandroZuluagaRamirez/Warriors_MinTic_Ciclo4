import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'password-change',
    component: PasswordChangeComponent 
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent 
  },
  {
    path: 'signin',
    component: SigninComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
