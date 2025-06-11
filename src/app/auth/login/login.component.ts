import {Component, DestroyRef, ElementRef, inject, OnInit, viewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  protected showPassword: boolean = false;
  private service = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  errorMessage = '';

  constructor() {
  }

  get password(): FormControl<string | null> {
    return this.loginForm.controls.password;
  }

  get email(): FormControl<string | null> {
    return this.loginForm.controls.email;
  }

  ngOnInit() {
    const subscribe = this.loginForm.valueChanges.subscribe({
      next: value => {
        //console.log(value);
        window.localStorage.setItem('saved-userForm', JSON.stringify(value));
      },
    });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  }


  async onSubmit() {
    await this.service.login(this.loginForm.value);

    if (this.loginForm.valid) {
      try {
        await this.service.login(this.loginForm.value);
        this.router.navigate(['/welcome']);
      } catch (error) {
        console.error('login failed', error);
      }
    } else {
      console.log('Form ist ungültig!');
    }
  }
}


