import { Component, forwardRef, inject, input, Optional, Self } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgControl } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputErrorMessagePipe } from '../../pipes/input-error-message-pipe';
@Component({
  selector: 'app-form-input',
  imports: [InputTextModule, FormsModule, MessageModule, InputErrorMessagePipe],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput implements ControlValueAccessor {
  label = input.required<string>();
  id = input.required<string>();
  type = input<'text' | 'email' | 'password'|'number'>('text');
  placeholder = input<string>('');
  errorMessage = input<string>();
  value!:string;
  onChange = (val: any) => {};
  onTouched = () => {};
  disabled:boolean = false;

  public controlDir = inject(NgControl, {self:true, optional:true});
constructor(){
  if(this.controlDir) {
    this.controlDir.valueAccessor = this;
  }
}



  writeValue(obj: any): void {
    this.value =obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
   handleValueChange(newValue: any) {
    this.value = newValue;
    this.onChange(newValue); // Tell Angular the value updated
  }
   onBlur() {
    this.onTouched(); // Notify Angular the control was touched
  }
  isInvalid():boolean{
    const control = this.controlDir?.control
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
