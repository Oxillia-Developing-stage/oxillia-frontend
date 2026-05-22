import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges, signal } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion'; 
import { FiltersService } from '../../../filter-page/filters-service';
import { ShopService } from '../../../shop/shop.service';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, InputNumberModule, AccordionModule],
  templateUrl: './products-filter.html',
  styleUrls: ['./products-filter.scss'],
})
export class ProductsFilter implements OnInit, OnChanges {
  @Output() filtersChange = new EventEmitter<Record<string, any>>();
  @Input() initialParams?: Record<string, any> | null = null;

  categories = signal<any[]>([]);
  brands = signal<any[]>([]);

  // Local UI State Models
  searchKeyword = '';
  selectedCategoryIds: string[] = [];
  selectedBrandIds: string[] = [];
  selectedConcerns: string[] = [];
  isSensitive = false;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  allOffers = false;
  todayOffers = false;
  
  // Sorting Models
  sortBy: string | null = null;
  priceSortSelection: 'all' | 'price:asc' | 'price:desc' = 'all';
  minRating: number | null = null;

  constructor(private filters: FiltersService, private shop: ShopService) {}

  ngOnInit(): void {
    this.shop.getCategories().subscribe((c) => this.categories.set(c?.data || []));
    this.shop.getBrands().subscribe((b) => this.brands.set(b?.data || []));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialParams'] && this.initialParams) {
      const p = this.initialParams;
      this.searchKeyword = p.keyword ?? '';
      this.selectedCategoryIds = p.category ? String(p.category).split(',') : [];
      this.selectedBrandIds = p.brand ? String(p.brand).split(',') : [];
      this.selectedConcerns = p.concerns ? String(p.concerns).split(',') : [];
      this.isSensitive = p.isSensitiveSkin === 'true' || p.isSensitiveSkin === true || p.isSensitiveSkin === '1';
      this.minPrice = p.priceMin ? Number(p.priceMin) : null;
      this.maxPrice = p.priceMax ? Number(p.priceMax) : null;
      this.allOffers = p.allOffers === 'true' || p.allOffers === true;
      this.todayOffers = p.todayOffers === 'true' || p.todayOffers === true;
      this.sortBy = p.sort ?? null;
      this.minRating = p.rating ? Number(p.rating) : null;

      // Sync active URL router navigation parameters back into the radio UI buttons
      if (this.sortBy === 'price:asc' || this.sortBy === 'price:desc') {
        this.priceSortSelection = this.sortBy;
      } else {
        this.priceSortSelection = 'all';
      }
    }
  }
//sort price
  onPriceSortChange(): void {
    if (this.priceSortSelection === 'all') {
      this.sortBy = null;
    } else {
      this.sortBy = this.priceSortSelection;
    }
    this.emitFilters();
  }
//rating toggle 
 toggleRating(rate: number): void {
    if (this.minRating === rate) {
      this.minRating = null; // Clear rating filter if active
    } else {
      this.minRating = rate; // Set active numerical criteria
    }
    this.emitFilters(); // Execute query update
  }
  toggleFilterId(type: 'category' | 'brand' | 'concern', id: string): void {
    let targetArray: string[] = [];

    if (type === 'category') {
      const index = this.selectedCategoryIds.indexOf(id);
      if (index > -1) {
        this.selectedCategoryIds = []; // Deselect if user clicks the already active category
      } else {
        this.selectedCategoryIds = [id]; // Overwrite array with only the newly selected category ID
      }
      this.emitFilters();
      return; // Exit function early
    }
    if (type === 'brand') targetArray = this.selectedBrandIds;
    if (type === 'concern') targetArray = this.selectedConcerns;

    const index = targetArray.indexOf(id);
    if (index > -1) {
      targetArray.splice(index, 1);
    } else {
      targetArray.push(id);
    }

    this.emitFilters();
  }

  emitFilters() {
    const params: Record<string, any> = {};
    const kw = this.filters.buildKeywordFilter(this.searchKeyword);
    if (kw) Object.assign(params, kw);
    const cat = this.filters.buildCategoryFilter(this.selectedCategoryIds);
    if (cat) Object.assign(params, cat);
    const brand = this.filters.buildBrandFilter(this.selectedBrandIds);
    if (brand) Object.assign(params, brand);
    const concerns = this.filters.buildConcernsFilter(this.selectedConcerns);
    if (concerns) Object.assign(params, concerns);
    const sensitive = this.filters.buildSensitivityFilter(this.isSensitive);
    if (sensitive) Object.assign(params, sensitive);
    const price = this.filters.buildPriceRangeFilter(this.minPrice, this.maxPrice);
    if (price) Object.assign(params, price);
    const offers = this.filters.buildOffersFilter({ allOffers: this.allOffers, todayOffers: this.todayOffers });
    if (offers) Object.assign(params, offers);
    
    // Assign sorting directly through global key mapping parameters
    if (this.sortBy) params.sort = this.sortBy;
    if (this.minRating) params.rating = this.minRating;

    this.filtersChange.emit(params);
  }
  //for button actiavtion 
    hasActiveFilters(): boolean {
    return (
      this.searchKeyword.trim() !== '' ||
      this.selectedCategoryIds.length > 0 ||
      this.selectedBrandIds.length > 0 ||
      this.selectedConcerns.length > 0 ||
      this.isSensitive === true ||
      this.minPrice !== null ||
      this.maxPrice !== null ||
      this.allOffers === true ||
      this.todayOffers === true ||
      this.sortBy !== null ||
      this.priceSortSelection !== 'all' ||
      this.minRating !== null
    );
  }
  clearAllFilters(): void {
    this.searchKeyword = '';
    this.selectedCategoryIds = [];
    this.selectedBrandIds = [];
    this.selectedConcerns = [];
    this.isSensitive = false;
    this.minPrice = null;
    this.maxPrice = null;
    this.allOffers = false;
    this.todayOffers = false;
    this.sortBy = null;
    this.priceSortSelection = 'all';
    this.minRating = null;
    
    this.emitFilters();
  }
}
