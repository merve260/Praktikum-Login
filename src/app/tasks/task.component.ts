import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {

  private taskService = inject(TaskService)

  tasks$: Observable<Task[]> = this.taskService.getTasks();

  newTaskTitle: string = '';
  newTaskDate: string = new Date().toISOString().substring(0, 10); // YYYY-MM-DD format


  ngOnInit(): void {}

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
  title: this.newTaskTitle.trim(),
  description: '', // şimdilik boş geçebilirsin veya yeni input eklersin
  completed: false,
  dueDate: new Date(this.newTaskDate),  // Burada new Date yapıyoruz çünkü modelde dueDate: Date
  priority: 'Medium' // varsayılan değer → istersen Priority input da ekleriz
};
      this.taskService.addTask(newTask).then(() => {
        // Reset inputs after add
        this.newTaskTitle = '';
        this.newTaskDate = new Date().toISOString().substring(0, 10);
      });
    }
  }

  updateTask(task: Task) {
    if (task.id) {
      this.taskService.updateTask(task.id, task);
    }
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }

}
