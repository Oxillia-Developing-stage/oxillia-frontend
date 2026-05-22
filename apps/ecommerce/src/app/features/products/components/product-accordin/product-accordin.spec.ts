import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAccordin } from './product-accordin';

describe('ProductAccordin', () => {
  let component: ProductAccordin;
  let fixture: ComponentFixture<ProductAccordin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAccordin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAccordin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
