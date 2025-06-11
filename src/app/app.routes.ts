import {CanMatchFn, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {RegisterComponent} from './auth/register/register.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {TodoListComponent} from './todo-list/todo-list.component';


export const routes: Routes = [
  {
    path: 'register', component: RegisterComponent, title: 'User', canActivate: [],
  },
  {
    path: 'welcome', component: WelcomeComponent, title: 'Welcome', canActivate: [],
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: 'todo-list', component: TodoListComponent,
  },
  {
    path: '', component: LoginComponent, pathMatch: 'full', title: 'Login'
  },
  {
    path: '**', redirectTo: 'not-found'
  },
];
