import Papa from 'papaparse';
import { CountryData } from '@/types';

export async function loadCSVData(filePath: string): Promise<CountryData[]> {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        delimiter: ';',
        complete: (results) => {
          try {
            const data: CountryData[] = [];
            
            results.data.forEach((row: any) => {
              const countryName = row['Country Name'] || '';
              if (!countryName) return;
              
              // Process each year column (from 1960 to 2024)
              Object.keys(row).forEach(key => {
                const year = parseInt(key);
                if (!isNaN(year) && year >= 1960 && year <= 2024) {
                  const creditValue = parseFloat(row[key] || '0');
                  if (!isNaN(creditValue) && creditValue > 0) {
                    data.push({
                      country: countryName,
                      year: year,
                      credit: creditValue
                    });
                  }
                }
              });
            });
            
            resolve(data);
          } catch (error) {
            reject(error);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return [];
  }
}