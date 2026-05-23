import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { Router, RouterLink } from '@angular/router';
import { AuthLibraryService } from '@oxillia/features-auth';
import { ToasterService } from 'apps/ecommerce/src/app/shared/components/toaster/toaster-service';
import { ButtonModule } from 'primeng/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, FormInput, RouterLink, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  _authService = inject(AuthLibraryService);
  _toasterService = inject(ToasterService);
  _cookieService = inject(CookieService);
  router = inject(Router);
  isLoading = false;
  disabled = false;
  fb = inject(FormBuilder);
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  text = ''
  loginWithGoogle() {
    this._authService.loginWithGoogle();
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }

    this.text = 'submittied'
    if (this.loginForm.valid) {
      this.isLoading = true;
      const payload = this.loginForm.getRawValue();
      this._authService.login(payload).subscribe({
        next: (response) => {
          this._toasterService.showsuccess('Login successful');
          this.loginForm.reset();
          this._cookieService.set('accessToken', response.token, {
            path: '/',
            sameSite: 'Lax',
            secure: false, // true in prod https
          }
          );
          
          this._cookieService.set('userEmail', response.email,{
            path: '/',
            sameSite: 'Lax',
            secure: false, // true in prod https
          }
          );
          this._cookieService.set('name', response.name,{
            path: '/',
            sameSite: 'Lax',
            secure: false, // true in prod https
          }
          );
          this.isLoading = false;
          this.router.navigate(['/main/home']);
        },
        error: () => {
          this._toasterService.showError('Login failed');
          this.isLoading = false;
          this.loginForm.reset();
        }
      });
    }
    else {
      this._toasterService.showError('Please fill in all required fields with valid data');
      this.isLoading = false;
      this.loginForm.markAllAsTouched();
    }
  }
}
