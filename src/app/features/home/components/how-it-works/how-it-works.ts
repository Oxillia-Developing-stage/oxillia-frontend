import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: 'app-how-it-works',
  imports: [AccordionModule, AvatarModule, BadgeModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
})
export class HowItWorks {
   methods =[{
    'header': 'Choose Your Skin Concern',
    'content':"Select your main concern : acne, pigmentation, sensitivity, dryness, or pores and we’ll instantly filter the right medical-grade products for you.",
    'index':0
   }
   ,{
    'header':'Get Clear, Doctor-Based Explanations ',
    'content':'Each product includes simple ingredient breakdowns, suitability badges, real before/after results, warnings, and expert-level clarity without medical jargon.',
    'index':1
  }
   ,{
    'header':'One Step Checkout & Delivery',
    'content':'Fast, seamless checkout with COD.Track your order via SMS/WhatsApp and receive 100% authentic products, safely packed and delivered to your door.',
    'index':2
  }
  ]
}
