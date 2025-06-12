import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../tasks/task.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  email: Signal<string | null | undefined> = computed(() => this.service.user()?.email);
  displayName: Signal<string | null | undefined> = computed(() => this.service.user()?.displayName);
  selectedMenu: string = 'dashboard';


  user = {
    name: 'Max Mustermann',
    avatar: 'https://www.gravatar.com/avatar/?d=mp&f=y',
    email: 'max@musterman.com'
  };
  events = [
    {
      title: 'Team Metting', date: '2025-06-14', completed: false
    },
    {
      title: 'Project Rewiev', date: '2025-06-16', completed: true
    }
  ]
  tasks: { title: string; completed: boolean }[] = [];
  newTask: string = '';
  protected readonly name = name;
  private service = inject(AuthService)
  private router: Router = inject(Router);



  ngOnInit(): void {
    this.loadAvatar();
    this.loadTasks();
  }


  loadAvatar() {
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedAvatar) {
      this.user.avatar = storedAvatar;
    }
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({title: this.newTask.trim(), completed: true});
      this.newTask = '';
      this.saveTasks();
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks()
  }

  taskCompleted(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('userTasks', JSON.stringify(this.tasks))
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('userTasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  onLogOut(): void {
      this.service.logout();
      localStorage.removeItem('userTasks');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('saved-userForm')
      alert('Logout is succesfull:)');
  }

}

