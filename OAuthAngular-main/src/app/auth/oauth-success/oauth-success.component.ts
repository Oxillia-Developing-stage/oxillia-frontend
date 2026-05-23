import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-oauth-success',
  standalone: true,
  template: `
    <div class="shell">
      @if (loading) {
        <div class="panel" aria-live="polite">
          <div class="spinner" aria-hidden="true"></div>
          <p class="label">Finishing sign-in…</p>
        </div>
      }
      <!-- TODO: show explicit error state if handleOAuthCallback fails before navigation. -->
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
    `,
  ],
})
export class OAuthSuccessComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  loading = true;

  ngOnInit(): void {
    this.auth.handleOAuthCallback().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        void this.router.navigate(['/login'], {
          queryParams: { error: 'oauth_failed' },
          replaceUrl: true,
        });
      },
    });
  }
}
