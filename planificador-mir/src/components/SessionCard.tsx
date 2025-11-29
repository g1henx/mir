'use client';

import { Check, BookOpen, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sesion } from '@/types';
import { useProgressStore } from '@/store/useProgressStore';
import { cn } from '@/lib/utils';

interface SessionCardProps {
  sesion: Sesion;
  vuelta: number;
}

export function SessionCard({ sesion, vuelta }: SessionCardProps) {
  const { isSessionCompleted, toggleSession } = useProgressStore();
  const completed = isSessionCompleted(sesion.numero_sesion_global);

  // Group chapters by manual
  const chaptersByManual = sesion.capitulos.reduce((acc, cap) => {
    if (!acc[cap.manual]) {
      acc[cap.manual] = [];
    }
    acc[cap.manual].push(cap);
    return acc;
  }, {} as Record<string, typeof sesion.capitulos>);

  const handleToggle = () => {
    toggleSession(sesion.numero_sesion_global, vuelta);
  };

  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:shadow-lg',
        completed
          ? 'bg-green-50 border-green-300 dark:bg-green-950 dark:border-green-700'
          : 'bg-white dark:bg-gray-900'
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">
              Sesión {sesion.numero_sesion_global}
            </CardTitle>
            <Badge variant={vuelta === 1 ? 'default' : 'secondary'}>
              {vuelta === 1 ? '1ª Vuelta' : '2ª Vuelta'}
            </Badge>
          </div>
          <Button
            variant={completed ? 'default' : 'outline'}
            size="sm"
            onClick={handleToggle}
            className={cn(
              'transition-all',
              completed && 'bg-green-600 hover:bg-green-700'
            )}
          >
            <Check className={cn('h-4 w-4', completed ? 'opacity-100' : 'opacity-50')} />
            {completed ? 'Completada' : 'Marcar'}
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <FileText className="h-4 w-4" />
          <span className="font-medium">{sesion.total_paginas} páginas</span>
          <span className="mx-2">•</span>
          <BookOpen className="h-4 w-4" />
          <span>{sesion.capitulos.length} capítulo{sesion.capitulos.length !== 1 ? 's' : ''}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {Object.entries(chaptersByManual).map(([manual, chapters]) => (
            <div key={manual} className="space-y-1">
              <h4 className="font-semibold text-sm text-primary">{manual}</h4>
              <ul className="space-y-1 ml-4">
                {chapters.map((cap, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex justify-between">
                    <span>
                      Cap. {cap.capitulo_numero}: {cap.capitulo_nombre}
                    </span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">
                      {cap.paginas} págs
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
