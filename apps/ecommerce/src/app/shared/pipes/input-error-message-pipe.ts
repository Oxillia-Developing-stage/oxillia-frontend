import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'inputErrorMessage',
})
export class InputErrorMessagePipe implements PipeTransform {

  transform(errors: ValidationErrors|undefined|null, label:string='Field'): string|null {
    if (!errors) {
      return null;
    }

    if (errors['required']) {
      return `${label} is required`;
    }

    if (errors['email']) {
      return `${label} must be a valid email`;
    }

    if (errors['minlength']) {
      return `${label} must be at least ${errors['minlength'].requiredLength} characters long`;
    }

    if (errors['maxlength']) {
      return `${label} must be no more than ${errors['maxlength'].requiredLength} characters long`;
    }
    if (errors['serverError']) {
  return errors['serverError']; // The actual string sent from your Interceptor
}
    return `${label} is invalid`;
  }

}
