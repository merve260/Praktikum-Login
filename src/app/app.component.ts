import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import * as firebase from 'firebase/app';
import {environment} from './environments/environments';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
    console.log(environment.firebaseConfig);
  }

}
