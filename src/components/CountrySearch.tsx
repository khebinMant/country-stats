'use client';

import { useState, useEffect } from 'react';
import { CountryData } from '@/types';

interface CountrySearchProps {
  countries: string[];
  onCountrySelect: (country: string) => void;
  selectedCountry: string;
}

export default function CountrySearch({ countries, onCountrySelect, selectedCountry }: CountrySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
      setIsOpen(true);
    } else {
      setFilteredCountries([]);
      setIsOpen(false);
    }
  }, [searchTerm, countries]);

  const handleCountrySelect = (country: string) => {
    setSearchTerm(country);
    onCountrySelect(country);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="country-search" className="block text-sm font-medium text-gray-700 mb-2">
        Buscar País
      </label>
      <input
        id="country-search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Escribe el nombre del país..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      {isOpen && filteredCountries.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCountries.map((country, index) => (
            <button
              key={index}
              onClick={() => handleCountrySelect(country)}
              className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
            >
              {country}
            </button>
          ))}
        </div>
      )}
      
      {selectedCountry && (
        <div className="mt-2 text-sm text-green-600">
          País seleccionado: <strong>{selectedCountry}</strong>
        </div>
      )}
    </div>
  );
}