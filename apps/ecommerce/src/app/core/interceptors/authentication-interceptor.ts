import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject  } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthLibraryService } from '@oxillia/features-auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthLibraryService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  // STEP 1: Check if this is an auth endpoint that doesn't need a token
  const excludedAuthPaths = ['auth/login', 'auth/register', 'auth/refresh'];
  const isAuthEndpoint = excludedAuthPaths.some((path) => req.url.includes(path));



  // STEP 2: Get token from storage
const token = cookieService.get('accessToken');

  // STEP 3: Add token to request header (if not auth endpoint and token exists)
  if (!isAuthEndpoint && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // STEP 4: Send request and handle response
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // STEP 5: Check if error is 401 (Unauthorized/Token Expired)
      if (error.status === 401 && !isAuthEndpoint) {
        const email = cookieService.get('userEmail');
        if (!email) {
          return throwError(() => error);
        }

        // STEP 6: Try to refresh token
        return authService.refreshToken({
          email,
        }).pipe(
          switchMap((response: { token: string }) => {
            // Success: Store new token
            cookieService.set('accessToken', response.token, {
              path: '/',
              sameSite: 'Lax',
              secure: false, // true in prod https
            });
            cookieService.set('userEmail', email, {
              path: '/',
              sameSite: 'Lax',
              secure: false, // true in prod https
            });

            // Retry original request with new token
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`
              }
            });

            return next(retryReq);
          }),
          catchError((refreshError: HttpErrorResponse) => {
            // Refresh failed: Clear auth and redirect to login
            cookieService.delete('accessToken', '/');
            cookieService.delete('userEmail', '/');
            router.navigate(['/auth/login']);
            return throwError(() => refreshError);
          })
        );
      }

      // Other errors: Pass to error interceptor
      return throwError(() => error);
    })
  );
};