'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  data: number[];
  years?: number[];
  title: string;
  type: 'histogram' | 'scatter';
}

export default function ChartComponent({ data, years = [], title, type }: ChartComponentProps) {
  const getHistogramData = () => {
    // Create bins for histogram
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binCount = Math.max(5, Math.min(15, Math.ceil(Math.sqrt(data.length))));
    const binWidth = (max - min) / binCount;
    
    const bins = Array(binCount).fill(0);
    const binLabels = [];
    const backgroundColors: string[] = [];
    
    for (let i = 0; i < binCount; i++) {
      const binStart = min + i * binWidth;
      const binEnd = min + (i + 1) * binWidth;
      binLabels.push(`${binStart.toLocaleString('es-ES', { maximumFractionDigits: 0 })}-${binEnd.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`);
      
      data.forEach(value => {
        if (value >= binStart && (value < binEnd || (i === binCount - 1 && value <= binEnd))) {
          bins[i]++;
        }
      });
    }
    
    // Color bars - highlight the ones with max and min frequencies
    const maxFreq = Math.max(...bins);
    const minFreq = Math.min(...bins.filter(b => b > 0));
    
    bins.forEach(freq => {
      if (freq === maxFreq) {
        backgroundColors.push('rgba(255, 99, 132, 0.8)'); // Red for max
      } else if (freq === minFreq && freq > 0) {
        backgroundColors.push('rgba(75, 192, 192, 0.8)'); // Green for min
      } else {
        backgroundColors.push('rgba(54, 162, 235, 0.6)'); // Blue for others
      }
    });
    
    return {
      labels: binLabels,
      datasets: [
        {
          label: 'Frecuencia',
          data: bins,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getScatterData = () => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    
    const scatterPoints = data.map((value, index) => {
      let backgroundColor;
      let borderColor;
      let radius = 6;
      
      if (value === maxValue) {
        backgroundColor = 'rgba(255, 99, 132, 0.8)'; // Red for max
        borderColor = 'rgba(255, 99, 132, 1)';
        radius = 10;
      } else if (value === minValue) {
        backgroundColor = 'rgba(75, 192, 192, 0.8)'; // Green for min
        borderColor = 'rgba(75, 192, 192, 1)';
        radius = 10;
      } else {
        backgroundColor = 'rgba(54, 162, 235, 0.7)'; // Blue for others
        borderColor = 'rgba(54, 162, 235, 1)';
      }
      
      return {
        x: years[index] || (1960 + index), // Fallback to sequential years starting from 1960
        y: value,
        backgroundColor,
        borderColor,
        radius
      };
    });

    return {
      datasets: [
        {
          label: 'Población por Año',
          data: scatterPoints,
          backgroundColor: scatterPoints.map(p => p.backgroundColor),
          borderColor: scatterPoints.map(p => p.borderColor),
          pointRadius: scatterPoints.map(p => p.radius),
          pointHoverRadius: scatterPoints.map(p => p.radius + 2),
          showLine: true, // Conecta los puntos con líneas
          tension: 0.1, // Suaviza las líneas
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            // Solo para scatter plots - sin histograma
            const year = context.parsed.x;
            const value = context.parsed.y;
            return [`Año: ${year}`, `Población: ${value.toLocaleString('es-ES')}`];
          },
          title: function(context: any) {
            return 'Evolución Temporal'; // Solo scatter plots
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false, // Solo para scatter plots
        title: {
          display: true,
          text: 'Valor de Población' // Solo scatter plots
        },
        ticks: {
          callback: function(value: any) {
            // Formato compacto para números grandes
            return typeof value === 'number' ? value.toLocaleString('es-ES', { notation: 'compact' }) : value;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Años' // Solo scatter plots
        },
        ticks: {
          callback: function(value: any, index: number) {
            if (years && years.length > 0) {
              return years[index] ? years[index].toString() : '';
            }
            return value;
          }
        }
      }
    },
  };

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <div className="text-gray-500 text-center py-8">
          No hay datos disponibles para mostrar
        </div>
      </div>
    );
  }

  // Solo mostrar gráfico de dispersión por ahora
  // El histograma está comentado para estudiar más adelante
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4 text-sm text-gray-600">
        📊 Gráfico de Dispersión - Histograma temporalmente deshabilitado
      </div>
      <div className="h-96">
        <Scatter data={getScatterData()} options={chartOptions} />
      </div>
    </div>
  );
}