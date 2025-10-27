export interface CountryData {
  country: string;
  year: number;
  credit: number;
}

export interface Statistics {
  max: number;
  min: number;
  sum: number;
  mean: number;
  mode: number | number[] | string;
  variance: number;
  standardDeviation: number;
}

export interface FilterOptions {
  selectedCountry: string;
  selectedYear: number | null;
  comparisonType: 'country' | 'year' | null;
  comparisonValue: string | number | null;
}