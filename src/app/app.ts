import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./layout/main-layout/components/navbar/navbar";
import { MainLayout } from "./layout/main-layout/main-layout";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Oxillia-frontend');
}
