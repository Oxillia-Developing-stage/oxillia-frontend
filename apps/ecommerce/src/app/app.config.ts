import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { inject } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAppInitializer } from '@angular/core';
import { IconService } from './shared/icon/services/icon.service';
import { authenticationInterceptor } from './core/interceptors/authentication-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { MessageService } from 'primeng/api';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideStore(),
    provideEffects(),
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: Aura,
                options:{
                  cssLayer:{
                    name:'primeng',
                    order: 'tailwind-base, primeng, tailwind-utilities'
                  }
                }
            }
        }),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, authenticationInterceptor])),
     provideAppInitializer(() => {
      const iconService = inject(IconService);
      return iconService.loadManifest();
    }),
    MessageService
      ]
};

