import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="wrap">
      @if (auth.currentUser$ | async; as user) {
        <div class="card">
          <h1>Dashboard</h1>
          <p class="muted">Signed in as <strong>{{ user.name }}</strong></p>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{{ user.email }}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{{ user.role }}</dd>
            </div>
            <div>
              <dt>Id</dt>
              <dd class="mono">{{ user.id }}</dd>
            </div>
          </dl>
          <button type="button" class="btn" (click)="signOut()">Sign out</button>
        </div>
      } @else {
        <div class="card">
          <p class="muted">Loading profile…</p>
        </div>
      }
      <!-- TODO: skeleton UI and resolver-driven profile load for direct /dashboard hits. -->
    </div>
  `,
  styles: [
    `
      .wrap {
        min-height: 100vh;
        padding: 2rem 1.5rem;
        background: #f6f7f9;
      }
      .card {
        max-width: 640px;
        margin: 0 auto;
        padding: 1.75rem;
        border-radius: 14px;
        background: #fff;
        border: 1px solid #e5e7eb;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
      }
      h1 {
        margin: 0 0 0.5rem;
        font-size: 1.35rem;
      }
      .muted {
        margin: 0 0 1.25rem;
        color: #6b7280;
      }
      dl {
        margin: 0 0 1.25rem;
        display: grid;
        gap: 0.75rem;
      }
      dt {
        font-size: 0.75rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #9ca3af;
      }
      dd {
        margin: 0.15rem 0 0;
        color: #111827;
      }
      .mono {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
          'Courier New', monospace;
        font-size: 0.9rem;
        word-break: break-all;
      }
      .btn {
        padding: 0.55rem 1rem;
        border-radius: 10px;
        border: 1px solid #d1d5db;
        background: #fff;
        cursor: pointer;
        font-weight: 600;
      }
      .btn:hover {
        background: #f9fafb;
      }
    `,
  ],
})
export class DashboardComponent {
  readonly auth = inject(AuthService);

  signOut(): void {
    this.auth.logout().subscribe();
  }
}
