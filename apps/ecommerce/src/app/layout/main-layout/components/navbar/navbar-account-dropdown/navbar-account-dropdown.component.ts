import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthLibraryService } from '@oxillia/features-auth';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface AccountOption {
  label: string;
  description: string;
  value: string;
  danger?: boolean;
}

@Component({
  selector: 'app-navbar-account-dropdown',
  standalone: true,
  imports: [CommonModule, MenuModule, RouterLink],
  templateUrl: './navbar-account-dropdown.component.html',
  styleUrl: './navbar-account-dropdown.component.scss',
})
export class NavbarAccountDropdownComponent implements OnChanges {
  @Input() isAuthenticated = false;
  @Input() accountLabel = 'Register/Sign In';
  @Input() accountRoute = '/auth/login';

  readonly menuStyle = {
    background: 'var(--color-bg-surface)',
    'background-color': 'var(--color-bg-surface)',
    padding: '0.5rem',
  };

  private readonly router = inject(Router);
  private readonly authService = inject(AuthLibraryService);
  private readonly cookieService = inject(CookieService);

  menuItems: MenuItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountRoute'] || changes['accountLabel'] || changes['isAuthenticated']) {
      this.menuItems = this.isAuthenticated ? this.buildMenuItems() : [];
    }
  }

  private buildMenuItems(): MenuItem[] {
    const baseOptions: AccountOption[] = [
      {
        label: this.accountLabel,
        description: this.isAuthenticated ? 'Open your profile' : 'Access your account',
        value: this.accountRoute,
      },
      {
        label: 'My Orders',
        description: 'Review recent purchases and tracking',
        value: '/main/order',
      },
      {
        label: 'Wishlist',
        description: 'Saved products and favorites',
        value: '/main/wishlist',
      },
    ];

    if (this.isAuthenticated) {
      baseOptions.push({
        label: 'Sign out',
        description: 'Clear the current session',
        value: '__logout__',
        danger: true,
      });
    } else {
      baseOptions.push({
        label: 'Create account',
        description: 'Register a new customer account',
        value: '/auth/signup',
      });
    }

    return baseOptions.map((option) => ({
      label: option.label,
      command: () => this.handleSelection(option.value),
      styleClass: option.danger ? 'is-danger' : undefined,
      items: undefined,
      icon: undefined,
      disabled: false,
      visible: true,
      separator: false,
      escape: true,
      data: option.description,
    }));
  }

  get menuLabel(): string {
    return this.isAuthenticated ? (this.accountLabel || 'Profile') : 'Register/Sign In';
  }

  get guestLabel(): string {
    return this.accountLabel || 'Register/Sign In';
  }

  handleSelection(route: string): void {
    if (route === '__logout__') {
      this.logout();
      return;
    }

    if (!route || route === this.accountRoute) {
      return;
    }

    this.router.navigateByUrl(route);
  }

  openMenu(event: MouseEvent, menu: any): void {
    menu.toggle(event);
  }

  private logout(): void {
    this.authService
      .logout()
      .pipe(catchError(() => of(null)))
      .subscribe(() => {
        this.cookieService.delete('accessToken', '/');
        this.cookieService.delete('userEmail', '/');
        this.cookieService.delete('name', '/');
        this.router.navigate(['/auth/login']);
      });
  }
}