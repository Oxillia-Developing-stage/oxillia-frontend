import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthLibraryService } from '@oxillia/features-auth';
import { ButtonModule } from 'primeng/button';
import { ToasterService } from 'apps/ecommerce/src/app/shared/components/toaster/toaster-service';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { LucideIconsModule } from '../../../../shared/modules/lucide-icons.module';
@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, FormInput, LucideIconsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {
  hideImg = true;
  clicked = output();
  private readonly fb = inject(FormBuilder);
  private readonly authLibraryService = inject(AuthLibraryService);
  private readonly toasterService = inject(ToasterService);
  isLoading = false;
  isSuccess = false;

  forgetPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.isLoading) {
      return;
    }

    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
      this.toasterService.showError('Please enter a valid email address.');
      return;
    }

    this.isLoading = true;
    this.authLibraryService.forgotPassword(this.forgetPasswordForm.getRawValue()).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isLoading = false;
        this.toasterService.showsuccess('Reset link sent. Please check your inbox.');
      },
      error: () => {
        this.isSuccess = false;
        this.isLoading = false;
        this.toasterService.showError('Unable to send reset link. Please try again.');
      },
    });
  }

}
