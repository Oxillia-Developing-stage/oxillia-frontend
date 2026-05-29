import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../../core/services/theme.service';
import { IconComponent } from '../../../../shared/icon/components/icon.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../../../features/cart/cart.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  _themeService = inject(ThemeService);
  isMobileMenuOpen = signal(false);
  openCategoryIndex: number | null = null;
  _cookieService = inject(CookieService);
  private readonly _cartService = inject(CartService);
  cartCount = signal(0);

  isAuthenticated = signal(false);
  accountLabel = signal('Register/Sign In');
  accountRoute = signal('/auth/login');



  menuItems = [
    { label: 'Home', route: 'main/home' },
    { label: 'Shop', route: 'main/shop' },
    { label: 'Categories', type: 'categories' },
    { label: 'Docs', route: '#' }
  ];
  categories = [
    {
      name: 'Skin Care',
      children: [
        'Cleansers',
        'Moisturizers',
        'Serums',
        'Toners',
        'Face Masks',
        'Eye Cream',
        'Sunscreen',
        'Exfoliators',
        'Acne Treatment',
        'Anti-Aging'
      ]
    },
    {
      name: 'Hair Care',
      children: [
        'Shampoo',
        'Conditioner',
        'Hair Masks',
        'Hair Oils',
        'Leave-In Treatment',
        'Scalp Care',
        'Hair Styling',
        'Hair Color',
        'Hair Growth',
        'Dry Shampoo'
      ]
    },
    {
      name: 'Body Care',
      children: [
        'Body Wash',
        'Body Lotion',
        'Body Scrub',
        'Body Oil',
        'Hand Cream',
        'Foot Care',
        'Deodorant',
        'Body Mist',
        'Bath Salts',
        'Body Butter'
      ]
    },
    {
      name: 'Makeup',
      children: [
        'Foundation',
        'Concealer',
        'Powder',
        'Blush',
        'Bronzer',
        'Highlighter',
        'Eyeshadow',
        'Mascara',
        'Lipstick',
        'Makeup Tools'
      ]
    },
    {
      name: 'Fragrance',
      children: [
        'Perfume',
        'Eau de Toilette',
        'Body Spray',
        'Roll-On',
        'Travel Size',
        'Gift Sets',
        'Floral',
        'Woody',
        'Fresh',
        'Oriental'
      ]
    },
    {
      name: 'Wellness',
      children: [
        'Supplements',
        'Vitamins',
        'Essential Oils',
        'Aromatherapy',
        'Sleep Aid',
        'Stress Relief',
        'Immune Support',
        'Detox',
        'Energy Boost',
        'Digestive Health'
      ]
    }
  ];
 constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isMobileMenuOpen.set(false);
      this.openCategoryIndex = null;
      this.refreshAccountState();
    });
    this.refreshAccountState()
    // subscribe to cart count and keep badge updated
    this._cartService.cartCount$.subscribe((c) => this.cartCount.set(c));
    this._cartService.refreshCartCount();
  }
    ngOnInit(): void {
    this.refreshAccountState();
  }

  private refreshAccountState(): void {
    const token = this._cookieService.get('accessToken');
    const name = this._cookieService.get('name');

    const loggedIn = !!token;
    this.isAuthenticated.set(loggedIn);
    this.accountLabel.set(loggedIn ? (name || 'Profile') : 'Register/Sign In');
    this.accountRoute.set(loggedIn ? '/main/profile' : '/auth/login');
  }
  toggleTheme() {
    this._themeService.toggleTheme();
  }
  get currentTheme() {
    return this._themeService.getTheme();
  }
    toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  toggleCategory(index: number) {
    this.openCategoryIndex =
      this.openCategoryIndex === index ? null : index;
  }
}
