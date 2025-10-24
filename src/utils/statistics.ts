import * as ss from 'simple-statistics';
import { CountryData, Statistics } from '@/types';

export function calculateStatistics(data: number[]): Statistics {
  if (data.length === 0) {
    return {
      max: 0,
      min: 0,
      sum: 0,
      mean: 0,
      mode: 0,
      variance: 0,
      standardDeviation: 0
    };
  }

  const max = ss.max(data);
  const min = ss.min(data);
  const sum = ss.sum(data);
  const mean = ss.mean(data);
  const variance = ss.variance(data);
  const standardDeviation = ss.standardDeviation(data);
  
  // Calculate mode manually since simple-statistics doesn't have it
  const mode = calculateMode(data);

  return {
    max,
    min,
    sum,
    mean,
    mode,
    variance,
    standardDeviation
  };
}

function calculateMode(data: number[]): number | number[] {
  const frequency: { [key: number]: number } = {};
  
  data.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
  });
  
  const maxFreq = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency)
    .filter(key => frequency[Number(key)] === maxFreq)
    .map(Number);
  
  return modes.length === 1 ? modes[0] : modes;
}

export function filterDataByCountry(data: CountryData[], country: string): CountryData[] {
  return data.filter(item => item.country.toLowerCase().includes(country.toLowerCase()));
}

export function filterDataByYear(data: CountryData[], year: number): CountryData[] {
  return data.filter(item => item.year === year);
}

export function getUniqueCountries(data: CountryData[]): string[] {
  const countries = new Set(data.map(item => item.country));
  return Array.from(countries).sort();
}

export function getUniqueYears(data: CountryData[]): number[] {
  const years = new Set(data.map(item => item.year));
  return Array.from(years).sort();
}

export function getCountryYearData(data: CountryData[], country: string, year?: number): number[] {
  let filtered = data.filter(item => item.country === country);
  if (year) {
    filtered = filtered.filter(item => item.year === year);
  }
  return filtered.map(item => item.credit);
}