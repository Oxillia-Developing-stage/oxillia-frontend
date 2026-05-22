import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters-service';

describe('FiltersService', () => {
  let service: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('buildCategoryFilter returns null for empty input', () => {
    expect(service.buildCategoryFilter(null)).toBeNull();
    expect(service.buildCategoryFilter([])).toBeNull();
  });

  it('buildCategoryFilter returns comma-separated ids', () => {
    const out = service.buildCategoryFilter(['a','b']);
    expect(out).toEqual({ category: 'a,b' });
  });

  it('buildPriceRangeFilter handles min/max', () => {
    expect(service.buildPriceRangeFilter(10, 100)).toEqual({ priceMin: 10, priceMax: 100 });
    expect(service.buildPriceRangeFilter(null, 50)).toEqual({ priceMax: 50 });
    expect(service.buildPriceRangeFilter(5, null)).toEqual({ priceMin: 5 });
  });

  it('buildKeywordFilter trims and returns', () => {
    expect(service.buildKeywordFilter('  test ')).toEqual({ keyword: 'test' });
    expect(service.buildKeywordFilter('')).toBeNull();
  });
});
