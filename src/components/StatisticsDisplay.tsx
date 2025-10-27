'use client';

import { Statistics } from '@/types';

interface StatisticsDisplayProps {
  statistics: Statistics;
  title: string;
  showExport?: boolean;
}

export default function StatisticsDisplay({ statistics, title, showExport = false }: StatisticsDisplayProps) {
  const formatNumber = (num: number | number[] | string): string => {
    if (typeof num === 'string') {
      return num; // Si es string (mensaje de "No hay moda"), lo devolvemos tal como está
    }
    if (Array.isArray(num)) {
      return num.map(n => n.toLocaleString('es-ES', { maximumFractionDigits: 2 })).join(', ');
    }
    return num.toLocaleString('es-ES', { maximumFractionDigits: 2 });
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Estadística', 'Valor'],
      ['Máximo', statistics.max],
      ['Mínimo', statistics.min],
      ['Suma', statistics.sum],
      ['Promedio', statistics.mean],
      ['Moda', typeof statistics.mode === 'string' 
        ? statistics.mode 
        : Array.isArray(statistics.mode) 
          ? statistics.mode.join(', ') 
          : statistics.mode],
      ['Varianza', statistics.variance],
      ['Desviación Estándar', statistics.standardDeviation]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_estadisticas.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statsItems = [
    { label: 'Máximo', value: statistics.max, color: 'text-red-600', bgColor: 'bg-red-50', icon: '↑' },
    { label: 'Mínimo', value: statistics.min, color: 'text-green-600', bgColor: 'bg-green-50', icon: '↓' },
    { label: 'Suma', value: statistics.sum, color: 'text-blue-600', bgColor: 'bg-blue-50', icon: '∑' },
    { label: 'Promedio', value: statistics.mean, color: 'text-purple-600', bgColor: 'bg-purple-50', icon: 'μ' },
    { label: 'Moda', value: statistics.mode, color: 'text-orange-600', bgColor: 'bg-orange-50', icon: '📊' },
    { label: 'Varianza', value: statistics.variance, color: 'text-indigo-600', bgColor: 'bg-indigo-50', icon: 'σ²' },
    { label: 'Desviación Estándar', value: statistics.standardDeviation, color: 'text-pink-600', bgColor: 'bg-pink-50', icon: 'σ' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {showExport && (
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            📥 Exportar CSV
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statsItems.map((item, index) => (
          <div key={index} className={`${item.bgColor} p-4 rounded-lg border-l-4 border-current`}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">{item.label}</div>
              <span className="text-xl">{item.icon}</span>
            </div>
            <div className={`text-lg font-semibold ${item.color}`}>
              {formatNumber(item.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}