import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="mt-4">Welcome to the Oxillia Dashboard</p>
    </div>
  `,
  styles: []
})
export class DashboardComponent {
}

