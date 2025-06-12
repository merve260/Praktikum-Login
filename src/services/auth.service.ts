import {inject, Injectable, signal, Signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
  User,
  UserCredential
} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({providedIn: 'root'})
export class AuthService {
  private auth: Auth = inject(Auth);
  public user: Signal<User | null | undefined> = toSignal(user(this.auth));
  public userEmail = signal<string | null | undefined>(null);
  public userDisplayName = signal<string | null | undefined>(null);
  private router: Router = inject(Router)

  setUserEmail(email: string): void {
    this.userEmail.set(email);
    this.userDisplayName.set(this.userDisplayName());
  }

  constructor() {

  }

  public register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public settings(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public async login({email, password}: any) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(response => {
        console.log(response.user);
        if (response.user) {
          this.router.navigate(['/dashboardƒ']);
        } else {
          console.error('Login failed')
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  public async logout() {
    await this.auth.signOut().then(() => {
      this.userEmail.set(null);
      this.userDisplayName.set(null);
      this.router.navigate(['/login']);
    });
  }

}
