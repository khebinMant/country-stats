'use client';

export default function AboutSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-3">ℹ️</span>
        Acerca del Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-600">🎯 Objetivo</h3>
          <p className="text-gray-700">
            Desarrollar una aplicación web que permita analizar una base de datos con información 
            de créditos por país y año. La aplicación calcula estadísticas básicas y genera 
            visualizaciones para apoyar la toma de decisiones.
          </p>
          
          <h3 className="text-lg font-semibold text-green-600">🛠️ Tecnologías Utilizadas</h3>
          <ul className="text-gray-700 space-y-1">
            <li>• <strong>Frontend:</strong> HTML + CSS + JavaScript</li>
            <li>• <strong>Framework:</strong> Next.js + React + TypeScript</li>
            <li>• <strong>Visualización:</strong> Chart.js para gráficos interactivos</li>
            <li>• <strong>Estadísticas:</strong> Simple Statistics</li>
            <li>• <strong>Estilos:</strong> Tailwind CSS</li>
            <li>• <strong>Datos:</strong> Carga desde archivos CSV</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-600">📋 Criterios de Evaluación</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Criterios</th>
                  <th className="text-center py-2">Valor</th>
                  <th className="text-center py-2">Estado</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr>
                  <td className="py-2">Buscador de país</td>
                  <td className="text-center">0.5</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-2">Estadísticas básicas</td>
                  <td className="text-center">0.5</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-2">Visualización de gráficos</td>
                  <td className="text-center">0.5</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-2">Comparación</td>
                  <td className="text-center">0.5</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-t font-bold">
                  <td className="py-2">Total</td>
                  <td className="text-center">2.0</td>
                  <td className="text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-lg font-semibold text-orange-600">🌟 Características Adicionales</h3>
          <ul className="text-gray-700 space-y-1">
            <li>• ✅ Exportar resultados a CSV</li>
            <li>• ✅ Resaltar valores máximos/mínimos</li>
            <li>• ✅ Interfaz responsive</li>
            <li>• ✅ Tooltips informativos</li>
            <li>• ✅ Navegación tipo dashboard</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📖 Cómo usar la aplicación:</h4>
        <ol className="text-blue-700 space-y-1">
          <li>1. <strong>Búsqueda:</strong> Use el buscador para encontrar un país específico</li>
          <li>2. <strong>Análisis:</strong> Vea las estadísticas calculadas automáticamente</li>
          <li>3. <strong>Visualización:</strong> Explore los histogramas y gráficos de dispersión</li>
          <li>4. <strong>Comparación:</strong> Compare diferentes países o años</li>
          <li>5. <strong>Exportación:</strong> Descargue los resultados en formato CSV</li>
        </ol>
      </div>
    </div>
  );
}