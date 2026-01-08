import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-landing-silder',
  imports: [CarouselModule, CommonModule, CurrencyPipe],
  templateUrl: './landing-silder.html',
  styleUrl: './landing-silder.scss',
})
export class LandingSilder {
  activeIndex = 0; // Track carousel first visible index
  visibleCount = 5; // default, will update with responsive events if needed

categories =[
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product1.png',
        oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215,
    router:'#'
  },
    {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product2.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product3.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product4.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  },
  {
    name:'garnier Micellar Water Face Cleanser & Daily Makeup Remover Clear 100 ml',
    url:'assests/pictures/landing-page/slider-product5.png',
    router:'#',
    oldprice:'350',
    newprice:'299',
    rating:1.3,
    revierwersNumber:215
  }
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
    const totalItems = this.categories.length;
    
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
    // Calculate Y-axis rotation for curved effect
    // Positive distance (right side) = negative rotation (turn left towards center)
    // Negative distance (left side) = positive rotation (turn right towards center)
    const rotateY = distance * -15; // 15 degrees per step from center
        // Calculate scale: larger at center (1.1), smaller at edges (0.85)
    const scale = 1.1 - (distance / maxDistance) * 0.25;
    
    // Calculate translateZ: center item forward, edges backward for depth
    
    // Calculate translateX: slight offset to enhance curve
    const translateX = distance * 20; // 20px offset per step
    

    
    return {
      opacity,
      transform: `scale(${scale}) rotateY(${rotateY}deg) translateX(${translateX}px)`,
      transition: 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
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
  if (this.activeIndex >= this.categories.length) {
    this.activeIndex = this.activeIndex % this.categories.length;
  }
}
}
