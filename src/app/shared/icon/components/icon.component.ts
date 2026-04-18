import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { IconService } from '../services/icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ox-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="ox-icon"
      [style.width.px]="size"
      [style.height.px]="size"
      [innerHTML]="svg">
    </span>
  `,
  styles: [`
    .ox-icon {
      display: inline-flex;
      color: currentColor;
    }
    .ox-icon svg {
      width: 100%;
      height: 100%;
    }
  `],
})
export class IconComponent implements OnInit {
  @Input({ required: true }) name!: string;
  @Input() size = 24;

 svg: SafeHtml = '';


  constructor(private iconService: IconService
    ,    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const icon = this.iconService.getIcon(this.name);
    if (!icon) {
      return;
    }
    this.svg = this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
