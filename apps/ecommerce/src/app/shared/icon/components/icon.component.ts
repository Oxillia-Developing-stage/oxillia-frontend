import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  PLATFORM_ID,
    inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { IconService } from '../services/icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ox-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="ox-icon"
      [style.width.px]="getResponsiveSize(size)"

      [innerHTML]="svg"
      [class]="class">
    </span>
  `,
  styles: [`
    .ox-icon {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      color: currentColor;
    }
    .ox-icon svg {
      width: 100%;
      // height: 100%;
    }
`]

,
})
export class IconComponent implements OnInit {
  @Input({ required: true }) name!: string;
  @Input() size = 20;
    @Input() class = '';
    @Input() color = 'currentColor';
 svg: SafeHtml = '';

  private platformId = inject(PLATFORM_ID);


getResponsiveSize(baseSize: number): number {
    if (!isPlatformBrowser(this.platformId)) return baseSize;

  const width = window.innerWidth;
  if (width < 640) return Math.round(baseSize * 0.5);  // mobile: 50%
  if (width < 1024) return Math.round(baseSize * 0.8); // tablet: 70%
  return baseSize;                                      // desktop: 100%
}
  constructor(private iconService: IconService
    ,    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const icon = this.iconService.getIcon(this.name);
    if (!icon) {
      return;
    }
        const coloredSvg = icon.replace(/currentColor/g, this.color)
        .replace(/#161616/g, this.color)  // Replace dark gray
        .replace(/#CCCCCC/g, this.color); // Replace light gray;

    this.svg = this.sanitizer.bypassSecurityTrustHtml(coloredSvg);
  }
}
