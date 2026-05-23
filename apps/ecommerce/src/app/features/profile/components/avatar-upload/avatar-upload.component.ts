import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css']
})
export class AvatarUploadComponent {
  @Input() avatarUrl: string | null = null;
  @Output() fileSelected = new EventEmitter<File>();

  errorMessage = '';

  private readonly allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  private readonly maxSizeInBytes = 2 * 1024 * 1024;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.errorMessage = '';

    if (!file) return;

    if (!this.allowedTypes.includes(file.type)) {
      this.errorMessage = 'Please upload a JPEG, JPG, PNG, or WEBP image.';
      input.value = '';
      return;
    }

    if (file.size > this.maxSizeInBytes) {
      this.errorMessage = 'Image must be 2 MB or smaller.';
      input.value = '';
      return;
    }

    const localUrl = URL.createObjectURL(file);
    this.avatarUrl = localUrl;
    this.fileSelected.emit(file);
  }
}
