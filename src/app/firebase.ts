import {initializeApp} from '@angular/fire/app';
import{getFirestore} from '@angular/fire/firestore';
import {environment} from './environments/environments';

const app= initializeApp(environment.firebaseConfig)
export const db = getFirestore(app);
