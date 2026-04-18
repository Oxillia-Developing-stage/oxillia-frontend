import { Component } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Footbar } from "./components/footbar/footbar";

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet, Footbar],
  templateUrl: './main-layout.html',
})
export class MainLayout {

}
