import {afterNextRender, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {getAuth, updateProfile} from '@angular/fire/auth';


@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  private userService= inject(UserService);
  private authService= inject(AuthService);

  updateForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    street: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  public avatar :string | ArrayBuffer | null= 'https://www.gravatar.com/avatar/?d=mp&f=y';

  constructor() {
    this.avatar = 'https://www.gravatar.com/avatar/?d=mp&f=y';

    afterNextRender(() => {
      const auth = getAuth();
      console.log(auth.currentUser?.uid);
      this.userService.getUserData(auth.currentUser?.uid as string)
        .then(response => {
          this.updateForm.patchValue({
          firstName: response.firstName,
        })
      });
    })
  }


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar= reader.result
      }
    }
  }

  onSubmit() {


    this.authService.settings(
      this.updateForm.value.email as string,
      this.updateForm.value.password as string,
    )
      .then(response => {
        //console.log(response);
        //console.log('User UID',response.user?.uid);
        const userData =
          {
            vorname: this.updateForm.value.firstName,
            nachname: this.updateForm.value.lastName,
            email: this.updateForm.value.email,
            strasse: this.updateForm.value.street,
            plz: this.updateForm.value.postcode,
            photoURL:this.avatar,
            stadt: this.updateForm.value.city,
            land: this.updateForm.value.country,
            avatar: 'https://i.pratar.cc/150?u=' + response.user?.uid
          };
        this.userService.updateUserData(response.user?.uid!, userData)
          .then(response => {
            this.authService.setUserEmail(this.updateForm.value.email as string);
          }).catch(error => {
          console.log('User Data saving failed', error);
        }).catch(error => {
          console.log('Registration failed', error);
        })
      })
  }
}
