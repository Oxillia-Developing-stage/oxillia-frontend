import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private buildRecord(values: Record<string, string | number | boolean | null | undefined>) {
    const result: Record<string, string | number | boolean> = {};

    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === 'undefined' || value === null) {
        return;
      }

      result[key] = value;
    });

    return Object.keys(result).length ? result : null;
  }

  buildCategoryFilter(selectedCategoryIds: string[] | null) {
    if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;
    return { category: selectedCategoryIds.join(',') };
  }

  buildSubCategoryFilter(selectedSubCategoryIds: string[] | null) {
    if (!selectedSubCategoryIds || selectedSubCategoryIds.length === 0) return null;
    return { subCategory: selectedSubCategoryIds.join(',') };
  }

  buildBrandFilter(selectedBrandIds: string[] | null) {
    if (!selectedBrandIds || selectedBrandIds.length === 0) return null;
    return { brand: selectedBrandIds.join(',') };
  }

  buildConcernsFilter(selectedConcerns: string[] | null) {
    if (!selectedConcerns || selectedConcerns.length === 0) return null;
    return { concerns: selectedConcerns.join(',') };
  }

  buildSensitivityFilter(isSensitive?: boolean) {
    if (typeof isSensitive === 'undefined' || isSensitive === null) return null;
    return { isSensitiveSkin: isSensitive };
  }

  buildCertificationFilter(isCertified?: boolean) {
    if (typeof isCertified === 'undefined' || isCertified === null) return null;
    return { isCertified };
  }

  buildFlagsFilter(flags: { isBestSeller?: boolean; isBundle?: boolean } | null) {
    if (!flags) return null;
    return this.buildRecord({
      isBestSeller: flags.isBestSeller,
      isBundle: flags.isBundle,
    });
  }

  buildPriceRangeFilter(min?: number | null, max?: number | null) {
    return this.buildRecord({
      priceMin: typeof min === 'number' && !isNaN(min) ? min : null,
      priceMax: typeof max === 'number' && !isNaN(max) ? max : null,
    });
  }

  buildOffersFilter(flags: { allOffers?: boolean; todayOffers?: boolean; noOffers?: boolean } | null) {
    if (!flags) return null;
    return this.buildRecord({
      allOffers: flags.allOffers,
      todayOffers: flags.todayOffers,
      noOffers: flags.noOffers,
    });
  }

  buildKeywordFilter(keyword?: string | null) {
    if (!keyword || keyword.trim() === '') return null;
    return { keyword: keyword.trim() };
  }
}
