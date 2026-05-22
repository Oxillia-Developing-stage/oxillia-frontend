import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="shell">
      <div class="card">
        <h1>Sign in</h1>
        <p class="muted">Use your Google account to continue.</p>

        <button type="button" class="google-btn" (click)="onGoogle()">
          <span class="google-icon" aria-hidden="true">G</span>
          Continue with Google
        </button>

        @if (errorMessage$ | async; as msg) {
          @if (msg) {
            <p class="error" role="alert">{{ msg }}</p>
          }
        }

        <!-- TODO: add terms/privacy links and branded footer for production. -->
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
        background: radial-gradient(circle at 20% 20%, #e8f0fe, #f6f7f9 45%, #eef1f4);
      }
      .card {
        width: min(420px, 100%);
        border-radius: 16px;
        padding: 2rem;
        background: #fff;
        box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
        border: 1px solid #e5e7eb;
      }
      h1 {
        margin: 0 0 0.35rem;
        font-size: 1.5rem;
        letter-spacing: -0.02em;
      }
      .muted {
        margin: 0 0 1.25rem;
        color: #6b7280;
        font-size: 0.95rem;
      }
      .google-btn {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.65rem;
        padding: 0.75rem 1rem;
        border-radius: 10px;
        border: 1px solid #dadce0;
        background: #fff;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s ease, box-shadow 0.15s ease;
      }
      .google-btn:hover {
        background: #f8fafc;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
      }
      .google-btn:focus-visible {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }
      .google-icon {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-size: 0.85rem;
        font-weight: 700;
        color: #1d4ed8;
        background: #e8f0fe;
      }
      .error {
        margin: 1rem 0 0;
        color: #b91c1c;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class LoginComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);

  /** Maps backend/query error codes to readable copy. */
  readonly errorMessage$ = this.route.queryParamMap.pipe(
    map((params) => {
      const code = params.get('error');
      if (!code) return '';
      if (code === 'google_failed') {
        return 'Google sign-in was cancelled or failed. Please try again.';
      }
      if (code === 'oauth_failed') {
        return 'We could not finish signing you in. Please try again.';
      }
      return code;
    })
  );

  onGoogle(): void {
    this.auth.loginWithGoogle();
  }
}
