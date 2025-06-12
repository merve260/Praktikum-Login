import {Injectable} from '@angular/core';
import {Firestore,collection,collectionData,addDoc,doc,deleteDoc,updateDoc,CollectionReference} from '@angular/fire/firestore';
import {Task} from '../app/models/task.model'
import {Observable} from 'rxjs';
import {db} from '../app/firebase';

@Injectable({providedIn: 'root'})
export class TaskService {
  private taskCollection = collection(db,'tasks') as CollectionReference<Task>;

  addTask(task:Task){
    return addDoc(this.taskCollection, task);
  }
  getTasks(): Observable<Task[]> {
    return collectionData(this.taskCollection,{idField: 'id'}) as Observable<Task[]>;
  }
  updateTask(taskId:string, task:Task){
    const taskDocRef = doc(db,'tasks',taskId);
    return updateDoc(taskDocRef, {...task});
  }
  deleteTask(taskId:string){
    const taskDocRef = doc(db,'tasks',taskId);
    return deleteDoc(taskDocRef);
  }

}
