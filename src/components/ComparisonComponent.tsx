'use client';

import { useState } from 'react';
import { CountryData, Statistics } from '@/types';
import { calculateStatistics, getCountryYearData, getUniqueCountries, getUniqueYears } from '@/utils/statistics';
import StatisticsDisplay from './StatisticsDisplay';
import ChartComponent from './ChartComponent';

interface ComparisonComponentProps {
  data: CountryData[];
}

export default function ComparisonComponent({ data }: ComparisonComponentProps) {
  const [comparisonType, setComparisonType] = useState<'country' | 'year'>('country');
  const [selectedItem1, setSelectedItem1] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');

  const countries = getUniqueCountries(data);
  const years = getUniqueYears(data);

  const getComparisonData = (item: string | number, type: 'country' | 'year') => {
    if (type === 'country') {
      return getCountryYearData(data, item as string);
    } else {
      return data.filter(d => d.year === parseInt(item as string)).map(d => d.credit);
    }
  };

  const getYearsForCountry = (country: string) => {
    return data.filter(d => d.country === country).map(d => d.year);
  };

  const getCountriesForYear = (year: string | number) => {
    return data.filter(d => d.year === parseInt(year as string)).map(d => d.country);
  };

  const renderComparison = () => {
    if (!selectedItem1 || !selectedItem2) {
      return (
        <div className="text-center text-gray-500 py-8">
          Selecciona dos {comparisonType === 'country' ? 'países' : 'años'} para comparar
        </div>
      );
    }

    const data1 = getComparisonData(selectedItem1, comparisonType);
    const data2 = getComparisonData(selectedItem2, comparisonType);

    if (data1.length === 0 || data2.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No hay datos disponibles para la comparación seleccionada
        </div>
      );
    }

    const stats1 = calculateStatistics(data1);
    const stats2 = calculateStatistics(data2);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatisticsDisplay 
            statistics={stats1} 
            title={`Estadísticas - ${selectedItem1}`}
            showExport={true}
          />
          <StatisticsDisplay 
            statistics={stats2} 
            title={`Estadísticas - ${selectedItem2}`}
            showExport={true}
          />
        </div>

        {/* Comparison Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-bold mb-4 text-gray-800">Resumen de Comparación</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-3 rounded-lg ${stats1.max > stats2.max ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
              <div className="text-sm text-gray-600">Máximo Mayor</div>
              <div className="font-semibold">{stats1.max > stats2.max ? selectedItem1 : selectedItem2}</div>
              <div className="text-sm">{Math.max(stats1.max, stats2.max).toLocaleString('es-ES')}</div>
            </div>
            <div className={`p-3 rounded-lg ${stats1.min < stats2.min ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
              <div className="text-sm text-gray-600">Mínimo Menor</div>
              <div className="font-semibold">{stats1.min < stats2.min ? selectedItem1 : selectedItem2}</div>
              <div className="text-sm">{Math.min(stats1.min, stats2.min).toLocaleString('es-ES')}</div>
            </div>
            <div className={`p-3 rounded-lg ${stats1.mean > stats2.mean ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
              <div className="text-sm text-gray-600">Promedio Mayor</div>
              <div className="font-semibold">{stats1.mean > stats2.mean ? selectedItem1 : selectedItem2}</div>
              <div className="text-sm">{Math.max(stats1.mean, stats2.mean).toLocaleString('es-ES')}</div>
            </div>
            <div className={`p-3 rounded-lg ${stats1.standardDeviation < stats2.standardDeviation ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
              <div className="text-sm text-gray-600">Menor Variabilidad</div>
              <div className="font-semibold">{stats1.standardDeviation < stats2.standardDeviation ? selectedItem1 : selectedItem2}</div>
              <div className="text-sm">σ = {Math.min(stats1.standardDeviation, stats2.standardDeviation).toLocaleString('es-ES', { maximumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>

        {/* Solo gráficos de dispersión para comparación */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartComponent
            data={data1}
            years={comparisonType === 'country' ? getYearsForCountry(selectedItem1 as string) : getCountriesForYear(selectedItem1).map((_, index) => index + 1)}
            title={`Evolución - ${selectedItem1}`}
            type="scatter"
          />
          <ChartComponent
            data={data2}
            years={comparisonType === 'country' ? getYearsForCountry(selectedItem2 as string) : getCountriesForYear(selectedItem2).map((_, index) => index + 1)}
            title={`Evolución - ${selectedItem2}`}
            type="scatter"
          />
        </div>
      </div>
    );
  };

  const options = comparisonType === 'country' ? countries : years;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Comparación</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Comparación
          </label>
          <select
            value={comparisonType}
            onChange={(e) => {
              setComparisonType(e.target.value as 'country' | 'year');
              setSelectedItem1('');
              setSelectedItem2('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="country">Por País</option>
            <option value="year">Por Año</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primer {comparisonType === 'country' ? 'País' : 'Año'}
          </label>
          <select
            value={selectedItem1}
            onChange={(e) => setSelectedItem1(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar...</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Segundo {comparisonType === 'country' ? 'País' : 'Año'}
          </label>
          <select
            value={selectedItem2}
            onChange={(e) => setSelectedItem2(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar...</option>
            {options.filter(option => option !== selectedItem1).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {renderComparison()}
    </div>
  );
}