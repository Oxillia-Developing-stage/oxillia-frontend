import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { after } from 'node:test';
@Component({
  selector: 'app-before-and-after',
  imports: [CarouselModule, CommonModule, CurrencyPipe],
  templateUrl: './before-and-after.html',
  styleUrl: './before-and-after.scss',
})
export class BeforeAndAfter {
  activeIndex = 0; // Track carousel first visible index
  visibleCount = 5; // default, will update with responsive events if needed

people =[
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },
  {
    name:'Karlen .M Andro',
    before_url:'assests/pictures/landing-page/before.png',
    after_url:'assests/pictures/landing-page/after.png',
  },

]
responsiveOptions = [
  {
    breakpoint: '1200px',
    numVisible: 6,
    numScroll: 1
  },
  {
    breakpoint: '992px',
    numVisible: 5,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '576px',
    numVisible: 3,
    numScroll: 1
  }
];
 /**
   * Calculate the visual position of an item
   * 
   * Example: If activeIndex = 1 and visibleCount = 5
   * - Array index 1 → Visual position 0 (leftmost)
   * - Array index 2 → Visual position 1
   * - Array index 3 → Visual position 2 (center!)
   * - Array index 4 → Visual position 3
   * - Array index 0 → Visual position 4 (wraps around)
   */
  getVisualPosition(arrayIndex: number): number {
    const totalItems = this.people.length;
    
    // Calculate distance from activeIndex, handling wrap-around
    let position = arrayIndex - this.activeIndex;
    
    // Handle wrap-around (circular behavior)
    if (position < 0) {
      position += totalItems;
    }
    
    return position;
  }

  /**
   * Calculate distance from center position
   * 
   * Example with visibleCount = 5:
   * - Center is at position 2 (middle of 0,1,2,3,4)
   * - Position 0 → distance = -2 (2 steps left)
   * - Position 1 → distance = -1 (1 step left)
   * - Position 2 → distance = 0 (center!)
   * - Position 3 → distance = 1 (1 step right)
   * - Position 4 → distance = 2 (2 steps right)
   */
  getDistanceFromCenter(arrayIndex: number): number {
    const visualPosition = this.getVisualPosition(arrayIndex);
    const centerPosition = Math.floor(this.visibleCount / 2);
    
    return visualPosition - centerPosition;
  }

  /**
   * Apply opacity and scale based on distance from center
   * 
   * Center item: full opacity (1.0), slightly larger
   * ±1 from center: 85% opacity
   * ±2 from center: 60% opacity
   * Further: 40% opacity
   */
  getSlideStyle(arrayIndex: number) {
    const distance = Math.abs(this.getDistanceFromCenter(arrayIndex));
    const maxDistance = Math.floor(this.visibleCount / 2);
    
    // Calculate opacity: 1.0 at center, decreasing to corners
    // Formula: opacity = 1 - (distance / maxDistance) * 0.7
    // This gives: center = 1.0, corners = 0.3
    const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
    
    // Calculate translateY: maximum at center, decreasing to corners
    // Formula: translateY = -20 * (1 - distance / maxDistance)
    // This gives: center = -20px, corners = 0px
    const translateY = -20 * (1 - distance / maxDistance);
    
    // Calculate scale: larger at center, smaller at corners
    const scale = 1.05 - (distance / maxDistance) * 0.2;
    
    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale}) rotate(0deg)`,
      transition: 'all 0.5s ease-in-out',
    };
  }


/** Update tracking when carousel moves */
onSlideChange(event: any) {
  // event.first = index of first visible item
  // To get center, add half of visible count
  const firstVisible = event.first || 0;
  const centerOffset = Math.floor(this.visibleCount / 2);
  this.activeIndex = firstVisible + centerOffset;
  
  // Handle wrap-around if needed
  if (this.activeIndex >= this.people.length) {
    this.activeIndex = this.activeIndex % this.people.length;
  }
}
}
