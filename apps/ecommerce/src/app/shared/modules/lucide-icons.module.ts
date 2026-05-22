import { NgModule } from '@angular/core';
import { Lock, LucideAngularModule } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Lock })],
  exports: [LucideAngularModule],
})
export class LucideIconsModule {}
