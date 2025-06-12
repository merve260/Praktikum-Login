import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {updateProfile} from '@angular/fire/auth';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    street: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
  }

  get email(): FormControl<string | null> {
    return this.userForm.controls.email;
  }

  get password(): FormControl<string | null> {
    return this.userForm.controls.password;
  }

  ngOnInit() {

    const subscribe = this.userForm.valueChanges.subscribe({
      next: value => {
        //console.log(value);
        window.localStorage.setItem('saved-userForm', JSON.stringify(value));
      },
    });
    this.destroyRef.onDestroy(() => subscribe.unsubscribe());
  }


  onSubmit() {
    if (this.userForm.valid) {
      const displayName = `${this.userForm.value.firstName} ${this.userForm.value.lastName}`;
      console.log('Form Data', this.userForm.value);

      this.authService.register(
        this.userForm.value.email as string,
        this.userForm.value.password as string,
      )
        .then(response => {
          //console.log(response);
          //console.log('User UID',response.user?.uid);
          updateProfile(response.user, {displayName});

          const userData =
            {
              vorname: this.userForm.value.firstName,
              nachname: this.userForm.value.lastName,
              email: this.userForm.value.email,
              displayName: displayName,
              strasse: this.userForm.value.street,
              plz: this.userForm.value.postcode,
              stadt: this.userForm.value.city,
              land: this.userForm.value.country,
              avatar: 'https://i.pratar.cc/150?u=' + response.user?.uid
            };

          this.userService.createUserData(response.user?.uid!, userData)
            .then(() => {
              this.authService.setUserEmail(this.userForm.value.email as string);
              this.router.navigate(['/dashboard']);
              this.userForm.reset();
            }).catch(error => {
            console.log('User Data saving failed', error);
          });
        }).catch(error => {
        console.log('Registration failed', error);
      })
    }
  }

}
