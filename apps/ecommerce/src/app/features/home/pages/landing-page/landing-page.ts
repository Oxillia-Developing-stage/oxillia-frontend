import { Component } from '@angular/core';
import { HeroLanding } from "../../components/hero-landing/hero-landing";
import {  SkinConcern } from "../../components/skinConcern/skinConcern";
import { LandingSilder } from "../../components/landing-silder/landing-silder";
import { BeforeAndAfter } from "../../components/before-and-after/before-and-after";
import { HowItWorks } from "../../components/how-it-works/how-it-works";
import { ContactUs } from "../../components/contact-us/contact-us";

@Component({
  selector: 'app-landing-page',
  imports: [HeroLanding, SkinConcern, LandingSilder, BeforeAndAfter, HowItWorks, ContactUs],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}
