'use client';

import { useState, useEffect } from 'react';
import { CountryData } from '@/types';
import { loadCSVData } from '@/utils/csvLoader';
import { calculateStatistics, getCountryYearData, getUniqueCountries } from '@/utils/statistics';
import CountrySearch from '@/components/CountrySearch';
import StatisticsDisplay from '@/components/StatisticsDisplay';
import ChartComponent from '@/components/ChartComponent';
import ComparisonComponent from '@/components/ComparisonComponent';

export default function Home() {
  const [data, setData] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Intentar cargar datos desde el archivo CSV
        const csvData = await loadCSVData('/data/data_base.csv');
        if (csvData.length > 0) {
          setData(csvData);
          console.log(`Datos cargados: ${csvData.length} registros`);
        } else {
          // Si no hay datos CSV, mostrar mensaje
          setError('No se pudieron cargar los datos del archivo CSV');
          console.log('No se encontraron datos en el archivo CSV');
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const countries = getUniqueCountries(data);
  const selectedCountryData = selectedCountry ? getCountryYearData(data, selectedCountry) : [];
  const selectedCountryYears = selectedCountry 
    ? data.filter(d => d.country === selectedCountry).map(d => d.year)
    : [];
  const statistics = selectedCountryData.length > 0 ? calculateStatistics(selectedCountryData) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando datos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Dashboard de Análisis de Créditos por País
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Análisis estadístico y visualización de datos de créditos
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Buscador de País */}
        <div className="flex justify-center">
          <CountrySearch
            countries={countries}
            onCountrySelect={setSelectedCountry}
            selectedCountry={selectedCountry}
          />
        </div>

        {/* Estadísticas y Gráficos del País Seleccionado */}
        {selectedCountry && statistics && (
          <div className="space-y-6">
            <StatisticsDisplay
              statistics={statistics}
              title={`Estadísticas de ${selectedCountry}`}
              showExport={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartComponent
                data={selectedCountryData}
                years={selectedCountryYears}
                title={`Histograma - ${selectedCountry}`}
                type="histogram"
              />
              <ChartComponent
                data={selectedCountryData}
                years={selectedCountryYears}
                title={`Gráfico de Dispersión - ${selectedCountry}`}
                type="scatter"
              />
            </div>
          </div>
        )}

        {/* Componente de Comparación */}
        <ComparisonComponent data={data} />

        {/* Información sobre los datos */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Información de los Datos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">Total de Registros</div>
              <div className="text-2xl font-bold text-blue-800">{data.length}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 mb-1">Países Disponibles</div>
              <div className="text-2xl font-bold text-green-800">{countries.length}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600 mb-1">Años de Datos</div>
              <div className="text-2xl font-bold text-purple-800">
                {data.length > 0 ? `${Math.min(...data.map(d => d.year))} - ${Math.max(...data.map(d => d.year))}` : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Dashboard de Análisis de Créditos por País</p>
        </div>
      </footer>
    </div>
  );
}