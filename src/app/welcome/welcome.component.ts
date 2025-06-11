import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  email: Signal<string | null | undefined> = computed(() => this.service.user()?.email);
  displayName: Signal<string | null | undefined> = computed(() => this.service.user()?.displayName);


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
  private logOut = false;
  private msg= '' ;


  ngOnInit(): void {
    this.loadAvatar();
    this.loadTasks();
  }



  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.avatar = reader.result as string;
        localStorage.setItem('avatar', this.user.avatar);
      }
      reader.readAsDataURL(file);
    } else {
      alert("Please select a file");
    }
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
    if (!this.logOut) {
      this.service.logout();
      localStorage.removeItem('userTasks');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('saved-userForm')
      alert('Logout is succesfull.');
      this.router.navigate(['']);
    }else{

    }
  }

}

