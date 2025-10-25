'use client';

import { useState, useEffect } from 'react';
import { CountryData } from '@/types';
import { calculateStatistics, getUniqueCountries } from '@/utils/statistics';
import StatisticsDisplay from './StatisticsDisplay';

interface StatisticsSectionProps {
  data: CountryData[];
}

export default function StatisticsSection({ data }: StatisticsSectionProps) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const countries = getUniqueCountries(data);
  const years = Array.from(new Set(data.map(d => d.year))).sort();
  
  // Get data for selected filters
  const filteredData = data.filter(d => {
    let matches = true;
    if (selectedCountry) matches = matches && d.country === selectedCountry;
    if (selectedYear) matches = matches && d.year === selectedYear;
    return matches;
  });
  
  const creditValues = filteredData.map(d => d.credit);
  const statistics = creditValues.length > 0 ? calculateStatistics(creditValues) : null;
  
  // Available years for selected country
  const availableYears = selectedCountry 
    ? Array.from(new Set(data.filter(d => d.country === selectedCountry).map(d => d.year))).sort()
    : years;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="mr-3">📊</span>
          Análisis Estadístico Detallado
        </h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              País (Opcional)
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedYear(null); // Reset year when country changes
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los países</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año (Opcional)
            </label>
            <select
              value={selectedYear || ''}
              onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los años</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Current Selection Info */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Selección Actual:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">País:</span> {selectedCountry || 'Todos'}
            </div>
            <div>
              <span className="font-medium">Año:</span> {selectedYear || 'Todos'}
            </div>
            <div>
              <span className="font-medium">Registros:</span> {filteredData.length}
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Display */}
      {statistics && (
        <StatisticsDisplay
          statistics={statistics}
          title={`Estadísticas ${selectedCountry ? `de ${selectedCountry}` : 'Globales'} ${selectedYear ? `en ${selectedYear}` : ''}`}
          showExport={true}
        />
      )}
      
      {/* No Data Message */}
      {!statistics && (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                No hay datos disponibles
              </h3>
              <p className="text-yellow-700">
                No se encontraron datos para los filtros seleccionados. 
                Intente con una combinación diferente de país y año.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Stats Summary */}
      {data.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-gray-800">📈 Resumen General de Datos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{countries.length}</div>
              <div className="text-sm text-blue-800">Países</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{years.length}</div>
              <div className="text-sm text-green-800">Años</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{data.length.toLocaleString()}</div>
              <div className="text-sm text-purple-800">Registros</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.max(...data.map(d => d.credit)).toLocaleString('es-ES', { notation: 'compact' })}
              </div>
              <div className="text-sm text-orange-800">Valor Máximo</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}