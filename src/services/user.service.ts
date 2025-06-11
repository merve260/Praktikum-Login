import { Injectable} from '@angular/core'
import {db} from '../app/firebase';
import {deleteDoc, doc, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {
  user: Record<string, any> = {};


  public createUserData(uid:string, userData:any): Promise<void> {
    const userDocRef = doc(db, `users/${uid}`);
    return setDoc(userDocRef,userData);
  }


  public async getUserData(uid:string): Promise<any> {
    const userDocRef = doc(db, `users/${uid}`);
    const userSnap = await getDoc(userDocRef);
    if(userSnap.exists()){
      return userSnap.data();
    }else{
      throw new Error('User not found');
    }
  }


  public async updateUserData(uid:string, userData:any): Promise<void> {
    const userDocRef = doc(db, `users/${uid}`);
    await updateDoc(userDocRef, userData);
  }
  public async deleteUserData(uid:string, userData:any): Promise<void> {
    const userDocRef = doc(db, `users/${uid}`);
    await deleteDoc(userDocRef);
  }
  
}
