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
      let radius = 4;
      
      if (value === maxValue) {
        backgroundColor = 'rgba(255, 99, 132, 0.8)'; // Red for max
        borderColor = 'rgba(255, 99, 132, 1)';
        radius = 8;
      } else if (value === minValue) {
        backgroundColor = 'rgba(75, 192, 192, 0.8)'; // Green for min
        borderColor = 'rgba(75, 192, 192, 1)';
        radius = 8;
      } else {
        backgroundColor = 'rgba(54, 162, 235, 0.6)'; // Blue for others
        borderColor = 'rgba(54, 162, 235, 1)';
      }
      
      return {
        x: years[index] || index + 1,
        y: value,
        backgroundColor,
        borderColor,
        radius
      };
    });

    return {
      datasets: [
        {
          label: 'Créditos',
          data: scatterPoints,
          backgroundColor: scatterPoints.map(p => p.backgroundColor),
          borderColor: scatterPoints.map(p => p.borderColor),
          pointRadius: scatterPoints.map(p => p.radius),
          pointHoverRadius: scatterPoints.map(p => p.radius + 2),
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
            const value = context.parsed.y || context.parsed;
            return `${context.dataset.label}: ${value.toLocaleString('es-ES')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: type === 'histogram',
        ticks: {
          callback: function(value: any) {
            return typeof value === 'number' ? value.toLocaleString('es-ES') : value;
          }
        }
      },
      x: {
        ticks: {
          callback: function(value: any, index: number) {
            if (type === 'scatter' && years && years.length > 0) {
              return years[index] || value;
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="h-96">
        {type === 'histogram' ? (
          <Bar data={getHistogramData()} options={chartOptions} />
        ) : (
          <Scatter data={getScatterData()} options={chartOptions} />
        )}
      </div>
    </div>
  );
}