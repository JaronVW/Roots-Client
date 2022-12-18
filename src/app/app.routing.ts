import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ListeventsComponent } from './events/listevents/listevents.component';
import { AddediteventComponent } from './events/addeditevent/addeditevent.component';
import { SearchComponent } from "./search/search.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events', component: ListeventsComponent },
  { path: 'events/create', component: AddediteventComponent },
  { path: 'events/edit/:id', component: AddediteventComponent },
];
