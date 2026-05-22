import { Component, inject, signal } from '@angular/core';
import { MainLayout } from './layout/main-layout/main-layout';
import { Toaster } from './shared/components/toaster/toaster';
import { LoadingSpinner } from './shared/components/ui/loading-spinner/loading-spinner';
import { LoadingService } from './core/interceptors/loading.service';

@Component({
  selector: 'app-root',
  imports: [MainLayout, Toaster, LoadingSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Oxillia Ecommerce');
  protected readonly loadingService = inject(LoadingService);
}

