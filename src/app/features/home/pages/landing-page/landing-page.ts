import { Component } from '@angular/core';
import { HeroLanding } from "../../components/hero-landing/hero-landing";
import { Brands } from "../../components/brands/brands";

@Component({
  selector: 'app-landing-page',
  imports: [HeroLanding, Brands],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}
