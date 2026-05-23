import { Component, inject } from '@angular/core';
import { ShopService } from './shop.service';
import { ProductItem } from '../../shared/interfacers/products';
import { ProductRespone } from '../../shared/interfacers/products';
import { signal } from '@angular/core';
import { Banner } from './components/banner/banner';
import { CategoryItem } from '../../shared/interfacers/category';
import { CategoryCard } from '../../shared/components/category-card/category-card';
import { BrandCard } from '../../shared/components/brand-card/brand-card';
import { BrandItme } from '../../shared/interfacers/brand';
import { Reasons } from './components/reasons/reasons';
import { Recommendations } from './components/recommendations/recommendations';
import { Browsed } from './components/browsed/browsed';
import { Sale } from './components/sale/sale';
import { SkinConcern } from "../home/components/skinConcern/skinConcern";
import { CookieService } from 'ngx-cookie-service';
import { Offer } from '../../shared/interfacers/offers';
@Component({
	selector: 'app-shop',
	standalone: true,
	imports: [Banner, CategoryCard, BrandCard, Reasons, Recommendations, Browsed, Sale, SkinConcern],
	templateUrl: './shop.html',
	styleUrl: './shop.css',
})
export class Shop {
	private readonly _CookieService = inject(CookieService);
_shopServive =inject(ShopService);
products = signal<ProductItem[]>([]);
categories = signal<CategoryItem[]>([]);
brands = signal<BrandItme[]>([]);
recommedations = signal<ProductItem[]>([]);
browsed = signal<ProductItem[]>([]);
offer = signal<Offer>({} as Offer);
isAuthenticated() {
	return this._CookieService.check('accessToken');
}	
	ngOnInit(): void {
		this.isAuthenticated();
		this._shopServive.getAllProducts().subscribe({
			next: (res:ProductRespone) => {
				this.products.set(res.data);
			},
			error: (err) => {
				console.log(err);
			}
		});
		this._shopServive.getCategories().subscribe({
			next:(res)=>{
				this.categories.set(res.data)
			}
		})
				this._shopServive.getBrands().subscribe({
			next:(res)=>{
				this.brands.set(res.data)
			}
		})
		this._shopServive.getUpComingOffers().subscribe({
			next:(res)=>{
				this.offer.set(res.data)
			}
		})
		if(this.isAuthenticated()){
		this._shopServive.getRecommendations().subscribe({
			next:(res)=>{
				this.recommedations.set(res.data)
			}
		})
		this._shopServive.getBrowesedHistory().subscribe({
			next:(res)=>{
				this.browsed	.set(res.data)
			}
		})
	}
	}
}
