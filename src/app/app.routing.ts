import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ListeventsComponent } from './events/listevents/listevents.component';
import { AddediteventComponent } from './events/addeditevent/addeditevent.component';
import { AccountrecoveryComponent } from './authentication/accountrecovery/accountrecovery.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { PasswordresetComponent } from './authentication/passwordreset/passwordreset.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events', component: ListeventsComponent },
  { path: 'organisation', component: OrganisationComponent },
  { path: 'events/create', component: AddediteventComponent },
  { path: 'events/edit/:id', component: AddediteventComponent },
  { path: 'accountrecovery', component: AccountrecoveryComponent },
  { path: 'passwordreset/:id', component: PasswordresetComponent },
  { path: 'verifyaccount/:id', component: VerifyaccountComponent },
];
