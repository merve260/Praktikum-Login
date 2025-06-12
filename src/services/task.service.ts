import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  CollectionReference
} from '@angular/fire/firestore';
import { Task } from '../app/models/task.model';
import { Observable } from 'rxjs';
import { db } from '../app/firebase';
import { getAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class TaskService {

  // Dinamik olarak her seferinde ilgili kullanıcının collectionunu alıyoruz
  private get userTaskCollection(): CollectionReference<Task> {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return collection(db, `users/${userId}/tasks`) as CollectionReference<Task>;
  }

  addTask(task: Task) {
    return addDoc(this.userTaskCollection, task);
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.userTaskCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  updateTask(taskId: string, task: Task) {
    const taskDocRef = doc(db, `users/${getAuth().currentUser?.uid}/tasks`, taskId);
    return updateDoc(taskDocRef, { ...task });
  }

  deleteTask(taskId: string) {
    const taskDocRef = doc(db, `users/${getAuth().currentUser?.uid}/tasks`, taskId);
    return deleteDoc(taskDocRef);
  }
}
