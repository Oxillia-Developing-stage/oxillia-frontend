import { Injectable, inject } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  map,
  tap,
  throwError,
  shareReplay,
  finalize,
  catchError,
  of,
} from 'rxjs';
import { apiV1Base } from './api-base';

export type AuthUser = { id: string; name: string; email: string; role: string };

type AccessTokenResponse = { data: { accessToken: string } };
type MeResponse = { data: AuthUser };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly httpNoIntercept = new HttpClient(inject(HttpBackend));
  private readonly router = inject(Router);

  private readonly apiV1 = apiV1Base();

  /** Access JWT kept in memory only (not localStorage). */
  readonly accessToken$ = new BehaviorSubject<string | null>(null);

  readonly currentUser$ = new BehaviorSubject<AuthUser | null>(null);

  readonly isLoggedIn$: Observable<boolean> = this.accessToken$.pipe(
    map((t) => !!t)
  );

  getAccessToken(): string | null {
    return this.accessToken$.value;
  }

  loginWithGoogle(): void {
    window.location.href = `${this.apiV1}/auth/google`;
  }

  /**
   * Completes after user is loaded and the app navigates to `/dashboard`.
   * // TODO: surface parse/API errors to telemetry and a friendlier retry UX.
   */
  handleOAuthCallback(): Observable<AuthUser> {
    const rawHash = window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : window.location.hash;
    const token = new URLSearchParams(rawHash).get('accessToken');

    if (!token) {
      return throwError(() => new Error('Missing accessToken in URL hash'));
    }

    this.accessToken$.next(token);
    this.scrubHashFromUrl();

    return this.http.get<MeResponse>(`${this.apiV1}/auth/me`, { withCredentials: true }).pipe(
      tap(({ data }) => this.currentUser$.next(data)),
      tap(() => void this.router.navigate(['/dashboard'], { replaceUrl: true })),
      map(({ data }) => data)
    );
  }

  /**
   * Uses a non-intercepted HttpClient so refresh does not recurse through this service's own 401 handling.
   * // TODO: backoff / jitter if the refresh endpoint starts rate-limiting.
   */
  refreshAccessToken(): Observable<string> {
    return this.httpNoIntercept
      .post<AccessTokenResponse>(
        `${this.apiV1}/auth/refresh`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((body) => body.data.accessToken),
        tap((accessToken) => this.accessToken$.next(accessToken))
      );
  }

  /**
   * Clears the refresh cookie on the server and wipes client auth state.
   * // TODO: queue a short "signed out" toast and cancel in-flight authenticated requests.
   */
  logout(): Observable<void> {
    return this.httpNoIntercept
      .post<void>(`${this.apiV1}/auth/logout`, {}, { withCredentials: true })
      .pipe(
        map(() => undefined),
        catchError(() => of(undefined)),
        tap(() => {
          this.accessToken$.next(null);
          this.currentUser$.next(null);
          void this.router.navigate(['/login'], { replaceUrl: true });
        })
      );
  }

  private scrubHashFromUrl(): void {
    const path = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, '', path || '/oauth/success');
  }
}

let refreshInFlight$: Observable<string> | null = null;

/** Shared refresh stream for concurrent 401s (e.g. parallel dashboard requests). */
export function sharedRefreshAccessToken(auth: AuthService): Observable<string> {
  if (!refreshInFlight$) {
    refreshInFlight$ = auth.refreshAccessToken().pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      finalize(() => {
        refreshInFlight$ = null;
      })
    );
  }
  return refreshInFlight$;
}
