import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService, sharedRefreshAccessToken } from './auth.service';
import { isApiV1Request } from './api-base';

/** Prevents infinite 401 → refresh → 401 loops on the retried request. */
export const AUTH_RETRY_ONCE = new HttpContextToken<boolean>(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  let outgoing = req;
  if (isApiV1Request(req.url)) {
    outgoing = outgoing.clone({ withCredentials: true });
  }

  const isRefresh = outgoing.url.includes('/auth/refresh');
  const token = isRefresh ? null : auth.getAccessToken();
  if (token) {
    outgoing = outgoing.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(outgoing).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401) {
        return throwError(() => err);
      }
      if (
        isRefresh ||
        outgoing.url.includes('/auth/logout') ||
        outgoing.context.get(AUTH_RETRY_ONCE)
      ) {
        return throwError(() => err);
      }
      if (!isApiV1Request(outgoing.url)) {
        return throwError(() => err);
      }

      return sharedRefreshAccessToken(auth).pipe(
        switchMap((newToken) =>
          next(
            outgoing.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
              withCredentials: true,
              context: outgoing.context.set(AUTH_RETRY_ONCE, true),
            })
          )
        ),
        catchError(() =>
          // TODO: distinguish network errors from invalid refresh (UX + retry).
          auth.logout().pipe(switchMap(() => throwError(() => err)))
        )
      );
    })
  );
};
