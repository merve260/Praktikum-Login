import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { getAuth, updateEmail, updatePassword, updateProfile } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  private userService = inject(UserService);
  private authService = inject(AuthService);

  updateForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(6)]),  // Optional password update
    street: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  public avatar: string | ArrayBuffer | null = 'https://www.gravatar.com/avatar/?d=mp&f=y';

  ngOnInit() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    if (uid) {
      this.userService.getUserData(uid)
        .then(response => {
          this.updateForm.patchValue({
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            street: response.strasse,
            postcode: response.plz,
            city: response.stadt,
            country: response.land,
          });
          this.avatar = response.photoURL || this.avatar;
        })
        .catch(error => {
          console.log('Failed to load user data', error);
        });
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result;
        localStorage.setItem('userAvatar', this.avatar as string);
      };
      reader.readAsDataURL(file);
    }
  }

 onSubmit() {
  const auth = getAuth();
  const currentEmail = auth.currentUser?.email;
  const newEmail = this.updateForm.value.email as string;
  const newPassword = this.updateForm.value.password as string;

  const userData = {
    vorname: this.updateForm.value.firstName,
    nachname: this.updateForm.value.lastName,
    email: this.updateForm.value.email,
    strasse: this.updateForm.value.street,
    plz: this.updateForm.value.postcode,
    photoURL: this.avatar,
    stadt: this.updateForm.value.city,
    land: this.updateForm.value.country,
    avatar: 'https://i.pravatar.cc/150?u=' + auth.currentUser?.uid
  };

  // Profile update (displayName & photoURL) için kontrol → sadece geçerli URL gönder
  const isDataURL = typeof this.avatar === 'string' && this.avatar.startsWith('data:');

  //  Firestore user data güncelle
  this.userService.updateUserData(auth.currentUser?.uid!, userData)
    .then(() => {
      console.log('User data updated');

      //  E-Mail güncelleme (eğer değişmişse)
      if (currentEmail !== newEmail) {
        updateEmail(auth.currentUser!, newEmail)
          .then(() => {
            console.log('Email updated');
          })
          .catch(error => {
            console.log('Email update failed', error);
          });
      } else {
        console.log('Email not changed, skipping update');
      }

      // Şifre güncelleme (eğer girilmişse ve geçerliyse)
      if (newPassword && newPassword.length >= 6) {
        updatePassword(auth.currentUser!, newPassword)
          .then(() => {
            console.log('Password updated');
          })
          .catch(error => {
            console.log('Password update failed', error);
          });
      } else {
        console.log('Password not changed or not provided');
      }

      //  Profil güncelleme (displayName & photoURL) → sadece geçerli URL gönder
      updateProfile(auth.currentUser!, {
        displayName: this.updateForm.value.firstName + ' ' + this.updateForm.value.lastName,
        photoURL: isDataURL ? undefined : this.avatar as string
      })
        .then(() => {
          console.log('Profile updated');
          // Başarı mesajı göster
          alert('Änderungen wurden erfolgreich gespeichert!');
        })
        .catch(error => {
          console.log('Profile update failed', error);
        });
    })
    .catch(error => {
      console.log('User data saving failed', error);
    });
}

}
