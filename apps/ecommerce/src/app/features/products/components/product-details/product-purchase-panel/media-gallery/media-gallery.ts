import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  templateUrl: './media-gallery.html',
})
export class MediaGallery {
  title = input.required<string>();
  images = input<string[]>([]);
  rounded = input<'lg' | 'full'>('lg');

  readonly displayImages = computed(() => {
    const list = this.images().filter(Boolean);
    if (!list.length) return [];
    return Array.from({ length: 4 }, (_, index) => list[index % list.length]);
  });
}
