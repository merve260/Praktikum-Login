import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {updateProfile} from '@angular/fire/auth';
import {doc, setDoc} from '@angular/fire/firestore';
import {AuthService} from '../../../services/auth.service';
import {db} from '../../firebase';
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
    strasse: new FormControl('', [Validators.required]),
    postleitzahl: new FormControl('', [Validators.required]),
    stadt: new FormControl('', [Validators.required]),
    land: new FormControl('', [Validators.required]),
  });

  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private userService= inject(UserService);
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
          console.log(response);
          updateProfile(response.user, {displayName});

          const userDocRef = doc(db, `users/${response.user?.uid}`);
          setDoc(userDocRef, {
            vorname: this.userForm.value.firstName,
            nachname: this.userForm.value.lastName,
            email: this.userForm.value.email,
            password: this.userForm.value.password,
            displayName: displayName,
            strasse: this.userForm.value.strasse,
            plz: this.userForm.value.postleitzahl,
            stadt: this.userForm.value.stadt,
            land: this.userForm.value.land
          });

          this.authService.setUserEmail(this.userForm.value.email as string);//User speichern in Authservice
          this.router.navigate(['/welcome']);

          this.userForm.reset();
        }).catch(error => {
        console.log('Registration failed', error);
      });
    }
  }

}
