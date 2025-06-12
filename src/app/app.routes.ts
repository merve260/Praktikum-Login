import {CanMatchFn, Routes} from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import {RegisterComponent} from './auth/register/register.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {TaskComponent} from './tasks/task.component';
import {SettingsComponent} from './settings/settings.component';


export const routes: Routes = [
  {
    path: 'register', component: RegisterComponent, title: 'Register', canActivate: [],
  },
  {
    path: 'dashboard', component: Dashboard, title: 'Dashboard', canActivate: [],
  },
  {
    path: 'not-found', component: NotFoundComponent,title: 'Not Found'
  },
  {
    path: 'tasks', component: TaskComponent,title: 'Tasks'
  },
  {
    path:'settings', component: SettingsComponent, title: 'Settings'
  },
  {
    path: '', component: LoginComponent, pathMatch: 'full', title: 'Login'
  },
  {
    path: '**', redirectTo: 'not-found'
  },
];
