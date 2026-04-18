import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../../core/services/theme.service';
import { IconComponent } from '../../../../shared/icon/components/icon.component';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  _themeService = inject(ThemeService);

  toggleTheme() {
    this._themeService.toggleTheme();
  }
  get currentTheme() {
    return this._themeService.getTheme();
  }
}
