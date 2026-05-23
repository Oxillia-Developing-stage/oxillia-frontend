import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { AuthLibraryService } from '@oxillia/features-auth';
import { ToasterService } from 'apps/ecommerce/src/app/shared/components/toaster/toaster-service';
@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, FormInput],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  _AuthLibraryService = inject(AuthLibraryService);
  _toasterService = inject(ToasterService);
fb = inject(FormBuilder);
RegisterForm= this.fb.nonNullable.group({
  name: ['', Validators.required],
  email: ['', [Validators.required,Validators.email]],
  password: ['',Validators.required]
})
text= ''
  onSubmit(){
    if(this.RegisterForm.valid){
      const paylpod = this.RegisterForm.getRawValue();
      this._AuthLibraryService.register(paylpod).subscribe(
        {
          next:()=>{
            this._toasterService.showsuccess('Registration successful!');
            this.RegisterForm.reset();
          },
          error:(error)=>{
            console.error('Registration failed:', error);
            this._toasterService.showError('Registration failed. Please try again.');
          }

        }
      );
    }
    else{
      this._toasterService.showError('Please fill in all required fields correctly.');
      this.RegisterForm.markAllAsTouched();
    }
}
}