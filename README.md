# Dashboard de Análisis de Créditos por País

Una aplicación web moderna desarrollada con Next.js y React para analizar datos de créditos por país y año, proporcionando estadísticas detalladas y visualizaciones interactivas.

## 🚀 Características

- **Buscador de países**: Interfaz intuitiva para filtrar datos por país
- **Estadísticas completas**: Cálculo automático de máximo, mínimo, suma, promedio, moda, varianza y desviación estándar
- **Visualizaciones interactivas**: Histogramas y gráficos de dispersión con Chart.js
- **Comparaciones**: Herramientas para comparar datos entre países o años
- **Interfaz responsive**: Diseño adaptativo con Tailwind CSS
- **Exportación de datos**: Funcionalidad para exportar estadísticas a CSV
- **Resaltado de valores**: Destacado automático de valores máximos y mínimos en gráficos

## 🛠️ Tecnologías Utilizadas

- **Next.js 14+** - Framework de React para aplicaciones web
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Chart.js** - Librería para gráficos interactivos
- **React Chart.js 2** - Wrapper de React para Chart.js
- **PapaParse** - Parser de archivos CSV
- **Simple Statistics** - Librería para cálculos estadísticos

## 📊 Funcionalidades Implementadas

### ✅ Buscador de País (0.5 puntos)
- Búsqueda en tiempo real por nombre de país
- Dropdown con sugerencias filtradas
- Selección fácil desde la lista

### ✅ Cálculo de Estadísticas Básicas (0.5 puntos)
- **Máximo**: Valor más alto en el conjunto de datos
- **Mínimo**: Valor más bajo en el conjunto de datos
- **Suma**: Suma total de todos los valores
- **Promedio**: Media aritmética de los valores
- **Moda**: Valor(es) más frecuente(s)
- **Varianza**: Medida de dispersión de los datos
- **Desviación Estándar**: Raíz cuadrada de la varianza

### ✅ Visualización de Gráficos (0.5 puntos)
- **Histograma**: Distribución de frecuencias de los datos
- **Gráfico de Dispersión**: Relación entre años y valores de crédito

### ✅ Comparación entre Años o Países (0.5 puntos)
- Comparación lado a lado de estadísticas
- Visualizaciones comparativas
- Selección flexible de elementos a comparar

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd dashboard-paises
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   Visita [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── CountrySearch.tsx  # Buscador de países
│   ├── StatisticsDisplay.tsx # Visualización de estadísticas
│   ├── ChartComponent.tsx # Componente de gráficos
│   └── ComparisonComponent.tsx # Comparaciones
├── types/                 # Definiciones de tipos TypeScript
│   └── index.ts          # Tipos principales
└── utils/                 # Utilidades y funciones auxiliares
    ├── statistics.ts      # Cálculos estadísticos
    └── csvLoader.ts       # Carga de datos CSV
```

## 📈 Uso de Datos

### Datos Reales
La aplicación carga datos reales de población por país desde 1960 hasta 2024:
- Más de 200 países y territorios
- Datos históricos de 65 años
- Información actualizada del Banco Mundial

### Carga de Datos CSV
Para usar tus propios datos:

1. Coloca tu archivo CSV en la carpeta `public/data/` con el nombre `data_base.csv`
2. El CSV debe tener las siguientes columnas:
   - `country` o `Country` o `pais` o `Pais`: Nombre del país
   - `year` o `Year` o `año` o `Año`: Año de los datos
   - `credit` o `Credit` o `credito` o `Credito`: Valor del crédito

Ejemplo de formato CSV:
```csv
country,year,credit
Argentina,2020,1500000
Argentina,2021,1600000
Brasil,2020,2500000
```

## 🎯 Criterios de Evaluación Cumplidos

| Criterio | Valor | Estado |
|----------|-------|--------|
| Buscador de país | 0.5 | ✅ Completo |
| Cálculo de estadísticas básicas | 0.5 | ✅ Completo |
| Visualización de gráficos | 0.5 | ✅ Completo |
| Comparación entre años o países | 0.5 | ✅ Completo |
| **Total** | **2.0** | **✅ Completo** |

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar versión de producción
- `npm run lint` - Ejecutar linter

## 🌟 Características Adicionales

- **Interfaz responsive**: Funciona en dispositivos móviles y desktop
- **Manejo de errores**: Gestión robusta de errores y estados de carga
- **Datos flexibles**: Soporte para archivos CSV con formato de matriz (países como filas, años como columnas)
- **Visualización moderna**: Interfaz limpia y profesional con iconos y colores
- **Performance optimizada**: Componentes optimizados para rendimiento
- **Exportación CSV**: Posibilidad de descargar estadísticas en formato Excel/CSV
- **Resaltado inteligente**: Los valores máximos y mínimos se destacan automáticamente en los gráficos
- **Comparación avanzada**: Resumen visual de las diferencias entre países o años

## 📝 Notas de Desarrollo

- La aplicación está optimizada para funcionar tanto con datos reales como con datos de ejemplo
- Todos los cálculos estadísticos se realizan en tiempo real
- Los gráficos son interactivos y responsive
- El código está completamente tipado con TypeScript

## 🤝 Contribución

Este proyecto fue desarrollado como parte de una actividad académica para el análisis de datos económicos y demostración de competencias en desarrollo web moderno.