import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthLibraryService } from '@oxillia/features-auth';
import { ButtonModule } from 'primeng/button';
import { ToasterService } from 'apps/ecommerce/src/app/shared/components/toaster/toaster-service';
import { FormInput } from '../../../../shared/components/form-input/form-input';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, FormInput],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.scss',
})
export class Resetpassword {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authLibraryService = inject(AuthLibraryService);
  private readonly toasterService = inject(ToasterService);

  isLoading = false;

  resetPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    token: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor() {
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.resetPasswordForm.patchValue({ email });
    }
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }

    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      this.toasterService.showError('Please fill all fields correctly.');
      return;
    }

    const { confirmPassword, ...payload } = this.resetPasswordForm.getRawValue();
    if (confirmPassword !== payload.newPassword) {
      this.toasterService.showError('Confirm password does not match.');
      return;
    }

    this.isLoading = true;
    this.authLibraryService.resetPassword(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.toasterService.showsuccess('Password reset successful. Please login.');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.isLoading = false;
        this.toasterService.showError('Unable to reset password. Please verify token and try again.');
      },
    });
  }
}
