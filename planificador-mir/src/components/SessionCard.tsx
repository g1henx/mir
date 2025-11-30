'use client';

import { useState } from 'react';
import { Check, BookOpen, FileText, Youtube, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sesion, Capitulo } from '@/types';
import { useProgressStore } from '@/store/useProgressStore';
import { cn } from '@/lib/utils';

interface SessionCardProps {
  sesion: Sesion;
  vuelta: number;
}

export function SessionCard({ sesion, vuelta }: SessionCardProps) {
  const { isSessionCompleted, toggleSession } = useProgressStore();
  const completed = isSessionCompleted(sesion.numero_sesion_global);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  // Group chapters by manual
  const chaptersByManual = sesion.capitulos.reduce((acc, cap) => {
    if (!acc[cap.manual]) {
      acc[cap.manual] = [];
    }
    acc[cap.manual].push(cap);
    return acc;
  }, {} as Record<string, typeof sesion.capitulos>);

  // Count total videos in session
  const totalVideos = sesion.capitulos.reduce((sum, cap) => sum + (cap.videos?.length || 0), 0);

  const handleToggle = () => {
    toggleSession(sesion.numero_sesion_global, vuelta);
  };

  const toggleChapter = (chapterKey: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterKey)) {
        newSet.delete(chapterKey);
      } else {
        newSet.add(chapterKey);
      }
      return newSet;
    });
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
          <FileText className="h-4 w-4" />
          <span className="font-medium">{sesion.total_paginas} páginas</span>
          <span className="mx-1">•</span>
          <BookOpen className="h-4 w-4" />
          <span>{sesion.capitulos.length} capítulo{sesion.capitulos.length !== 1 ? 's' : ''}</span>
          {totalVideos > 0 && (
            <>
              <span className="mx-1">•</span>
              <Youtube className="h-4 w-4 text-red-500" />
              <span className="text-red-600 dark:text-red-400">{totalVideos} video{totalVideos !== 1 ? 's' : ''}</span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {Object.entries(chaptersByManual).map(([manual, chapters]) => (
            <div key={manual} className="space-y-1">
              <h4 className="font-semibold text-sm text-primary">{manual}</h4>
              <ul className="space-y-2 ml-4">
                {chapters.map((cap, idx) => {
                  const chapterKey = `${manual}-${cap.capitulo_numero}`;
                  const isExpanded = expandedChapters.has(chapterKey);
                  const videoCount = cap.videos?.length || 0;

                  return (
                    <li key={idx} className="text-sm">
                      <div className="flex items-center justify-between text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {videoCount > 0 && (
                            <button
                              onClick={() => toggleChapter(chapterKey)}
                              className="p-0.5 hover:bg-muted rounded"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronRight className="h-3 w-3" />
                              )}
                            </button>
                          )}
                          <span>
                            Cap. {cap.capitulo_numero}: {cap.capitulo_nombre}
                          </span>
                          {videoCount > 0 && (
                            <Badge variant="outline" className="ml-1 text-xs py-0 px-1 h-4 text-red-600 border-red-300">
                              <Youtube className="h-2.5 w-2.5 mr-0.5" />
                              {videoCount}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded shrink-0 ml-2">
                          {cap.paginas} págs
                        </span>
                      </div>

                      {/* Video list - expandable */}
                      {isExpanded && cap.videos && cap.videos.length > 0 && (
                        <ul className="mt-2 ml-5 space-y-1.5 border-l-2 border-red-200 dark:border-red-800 pl-3">
                          {cap.videos.map((video, vidIdx) => (
                            <li key={vidIdx} className="text-xs">
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:underline group"
                              >
                                <ExternalLink className="h-3 w-3 mt-0.5 shrink-0 opacity-50 group-hover:opacity-100" />
                                <span className="flex-1">
                                  {video.titulo}
                                  {video.idioma && video.idioma !== 'es' && (
                                    <Badge variant="outline" className="ml-1 text-[10px] py-0 px-1 h-3">
                                      {video.idioma.toUpperCase()}
                                    </Badge>
                                  )}
                                </span>
                              </a>
                              {video.aportacion && (
                                <p className="text-muted-foreground ml-4 mt-0.5 italic">
                                  {video.aportacion}
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
