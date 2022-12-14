import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AddeventComponent } from './events/addevent/addevent.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events/create', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events/create', component: AddeventComponent },
];
