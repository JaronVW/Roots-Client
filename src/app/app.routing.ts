import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AddeventComponent } from './events/addevent/addevent.component';
import {SearchComponent} from "./search/search.component";

export const routes: Routes = [
  { path: '', component: SearchComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events/create', component: AddeventComponent },
];
