'use client';

import { useState, useEffect } from 'react';
import { CountryData } from '@/types';
import { loadCSVData } from '@/utils/csvLoader';
import { calculateStatistics, getCountryYearData, getUniqueCountries } from '@/utils/statistics';
import Navbar from '@/components/Navbar';
import CountrySearch from '@/components/CountrySearch';
import StatisticsDisplay from '@/components/StatisticsDisplay';
import ChartComponent from '@/components/ChartComponent';
import ComparisonComponent from '@/components/ComparisonComponent';
import StatisticsSection from '@/components/StatisticsSection';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  const [data, setData] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('search');

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700">Cargando datos...</div>
          <div className="text-sm text-gray-500 mt-2">Procesando información de países y años</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-xl text-red-600 mb-2">{error}</div>
          <div className="text-sm text-red-500">
            Verifique que el archivo CSV esté disponible en la ruta correcta.
          </div>
        </div>
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'search':
        return (
          <div className="space-y-8">
            {/* Buscador de País */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="mr-3">🔍</span>
                Búsqueda y Análisis por País
              </h2>
              <div className="flex justify-center mb-6">
                <CountrySearch
                  countries={countries}
                  onCountrySelect={setSelectedCountry}
                  selectedCountry={selectedCountry}
                />
              </div>
            </div>

            {/* Estadísticas y Gráficos del País Seleccionado */}
            {selectedCountry && statistics && (
              <div className="space-y-6">
                <StatisticsDisplay
                  statistics={statistics}
                  title={`Estadísticas de ${selectedCountry}`}
                  showExport={true}
                />

                {/* Solo mostramos el gráfico de dispersión */}
                <div className="w-full">
                  <ChartComponent
                    data={selectedCountryData}
                    years={selectedCountryYears}
                    title={`Evolución Temporal - ${selectedCountry}`}
                    type="scatter"
                  />
                </div>
              </div>
            )}

            {/* Message when no country selected */}
            {!selectedCountry && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Seleccione un país para comenzar
                  </h3>
                  <p className="text-blue-600">
                    Use el buscador de arriba para encontrar un país y ver sus estadísticas detalladas.
                  </p>
                </div>
              </div>
            )}

            {/* Información sobre los datos */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-800">📊 Información de los Datos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-blue-600 mb-1">Total de Registros</div>
                  <div className="text-2xl font-bold text-blue-800">{data.length.toLocaleString()}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-green-600 mb-1">Países Disponibles</div>
                  <div className="text-2xl font-bold text-green-800">{countries.length}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-purple-600 mb-1">Años de Datos</div>
                  <div className="text-2xl font-bold text-purple-800">
                    {data.length > 0 ? `${Math.min(...data.map(d => d.year))} - ${Math.max(...data.map(d => d.year))}` : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'comparison':
        return <ComparisonComponent data={data} />;
      case 'statistics':
        return <StatisticsSection data={data} />;
      case 'about':
        return <AboutSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="container mx-auto px-4 py-8">
        {renderActiveSection()}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-semibold mb-2">📊 Dashboard de Análisis</h4>
              <p className="text-gray-300 text-sm">
                Herramienta para análisis estadístico de datos por país y año
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🛠️ Tecnologías</h4>
              <p className="text-gray-300 text-sm">
                Next.js • React • TypeScript • Chart.js • Tailwind CSS
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📈 Funcionalidades</h4>
              <p className="text-gray-300 text-sm">
                Búsqueda • Estadísticas • Visualización • Comparación
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p>&copy; 2024 Dashboard de Análisis de Créditos por País - Evaluación Académica</p>
          </div>
        </div>
      </footer>
    </div>
  );
}