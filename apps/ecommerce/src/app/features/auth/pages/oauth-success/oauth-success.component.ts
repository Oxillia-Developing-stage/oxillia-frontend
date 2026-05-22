import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthLibraryService } from '@oxillia/features-auth';

@Component({
  selector: 'app-oauth-success',
  standalone: true,
  template: `
    <div class="shell">
        <div class="panel" aria-live="polite">
          <div class="spinner" aria-hidden="true"></div>
          <p class="label">Finishing sign-in…</p>
        </div>
    </div>
  `,
  styles: [
    `
      .shell {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 1.5rem;
        background: #f6f7f9;
      }
      .panel {
        display: grid;
        justify-items: center;
        gap: 1rem;
        padding: 2rem 2.5rem;
        border-radius: 16px;
        background: #fff;
        border: 1px solid #e5e7eb;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      }
      .spinner {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid #e5e7eb;
        border-top-color: #2563eb;
        animation: spin 0.8s linear infinite;
      }
      .label {
        margin: 0;
        color: #4b5563;
        font-size: 0.95rem;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `
  ],
})
export class OauthSuccessComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  private readonly authService = inject(AuthLibraryService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const rawHash = window.location.hash.startsWith('#')
      ? window.location.hash.slice(1)
      : window.location.hash;
    const token = new URLSearchParams(rawHash).get('accessToken');

    if (!token) {
      void this.router.navigate(['/auth/login'], {
        queryParams: { error: 'missing_token' },
        replaceUrl: true,
      });
      return;
    }

    // Save token so the interceptor can use it for getUserInfo
    this.cookieService.set('accessToken', token, {
      path: '/',
      sameSite: 'Lax',
      secure: false, // Set to true in prod https
    });

    this.scrubHashFromUrl();

    this.authService.getUserInfo().subscribe({
      next: (response: any) => {
        // Handle cases where the backend nests the user data
        const user = response.data || response.user || response;
        
        if (user.email) {
          this.cookieService.set('userEmail', user.email, { path: '/', sameSite: 'Lax', secure: false });
        }
        if (user.name) {
          this.cookieService.set('name', user.name, { path: '/', sameSite: 'Lax', secure: false });
        }
        void this.router.navigate(['/main/home'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Failed to fetch user info:', err);
        this.cookieService.delete('accessToken', '/');
        void this.router.navigate(['/auth/login'], {
          queryParams: { error: 'oauth_failed' },
          replaceUrl: true,
        });
      },
    });
  }

  private scrubHashFromUrl(): void {
    const path = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, '', path || '/auth/oauth/success');
  }
}
