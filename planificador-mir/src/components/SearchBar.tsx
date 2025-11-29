'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sesion } from '@/types';

interface SearchBarProps {
  sesiones: Sesion[];
  onFilter: (filtered: Sesion[] | null) => void;
}

export function SearchBar({ sesiones, onFilter }: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Create searchable items with manual names extracted
  const searchableItems = useMemo(() => {
    return sesiones.map(sesion => ({
      ...sesion,
      manuales: sesion.capitulos.map(c => c.manual).join(' '),
    }));
  }, [sesiones]);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(searchableItems, {
      keys: ['manuales'],
      threshold: 0.4, // Lower = stricter, higher = more fuzzy
      ignoreLocation: true,
      includeScore: true,
    });
  }, [searchableItems]);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      onFilter(null); // Show all
      return;
    }

    const results = fuse.search(value);
    const filtered = results.map(r => r.item as Sesion);
    onFilter(filtered);
  };

  const clearSearch = () => {
    setQuery('');
    onFilter(null);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar por manual (ej: cardiología, neurología...)"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
