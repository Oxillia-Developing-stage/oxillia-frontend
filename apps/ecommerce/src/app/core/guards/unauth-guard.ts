import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
export const unauthGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('accessToken');
  const router = inject(Router);
  if (token) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
