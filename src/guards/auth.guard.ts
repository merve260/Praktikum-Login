import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const authService = inject(AuthService);
}
