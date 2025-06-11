import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideNativeDateAdapter} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({
      projectId: "my-app-751d0",
      appId: "1:11204740828:web:a6f805f6359e76fbffd619",
      storageBucket: "my-app-751d0.firebasestorage.app",
      apiKey: "AIzaSyCtrk5swIMbydffgEMrRSPJawjGd7XlIVo",
      authDomain: "my-app-751d0.firebaseapp.com",
      messagingSenderId: "11204740828"
    })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideNativeDateAdapter(),
  ]

};
