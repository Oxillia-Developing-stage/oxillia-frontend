import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-address-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.css']
})
export class AddressModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() initial: { city?: string; address?: string; _id?: string } | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ city: string; address: string; _id?: string }>();

  readonly XIcon = X;
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initial'] && this.initial) {
      this.addressForm.patchValue({
        city: this.initial.city ?? '',
        address: this.initial.address ?? '',
      });
    }
    if (changes['isOpen'] && !this.isOpen) {
      // reset when closed
      this.addressForm.reset();
    }
  }

  onClose() {
    this.close.emit();
    this.addressForm.reset();
  }

  onSave() {
    if (this.addressForm.valid) {
      const value = { ...this.addressForm.value } as { city: string; address: string } & { _id?: string };
      if (this.initial && this.initial._id) {
        value._id = this.initial._id;
      }
      this.save.emit(value);
      this.onClose();
    }
  }
}
