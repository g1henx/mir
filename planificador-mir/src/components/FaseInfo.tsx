'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fase } from '@/types';
import { Calendar, Clock, Brain, Target } from 'lucide-react';

interface FaseInfoProps {
  fases: {
    fase1_base: Fase;
    fase2_intensiva: Fase;
  };
}

export function FaseInfo({ fases }: FaseInfoProps) {
  const { fase1_base, fase2_intensiva } = fases;

  // Determinar fase actual basada en la fecha
  const today = new Date();
  const fase1End = new Date(fase1_base.fin);
  const fase2End = new Date(fase2_intensiva.fin);

  const currentFase = today < fase1End ? 'fase1' : today < fase2End ? 'fase2' : 'finalizado';

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Fase 1 */}
      <Card className={currentFase === 'fase1' ? 'ring-2 ring-blue-500' : ''}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              {fase1_base.nombre}
            </CardTitle>
            {currentFase === 'fase1' && (
              <Badge className="bg-blue-500">Actual</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{fase1_base.objetivo}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>{fase1_base.horas_semanales}h/semana</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-muted-foreground" />
              <span>Anki: {fase1_base.tiempo_anki_diario_min}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3 text-muted-foreground" />
              <span>Retención: {(fase1_base.desired_retention * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span>{fase1_base.semanas} semanas</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            {fase1_base.inicio} → {fase1_base.fin}
          </p>
        </CardContent>
      </Card>

      {/* Fase 2 */}
      <Card className={currentFase === 'fase2' ? 'ring-2 ring-purple-500' : ''}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              {fase2_intensiva.nombre}
            </CardTitle>
            {currentFase === 'fase2' && (
              <Badge className="bg-purple-500">Actual</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{fase2_intensiva.objetivo}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>{fase2_intensiva.horas_semanales}h/semana</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-muted-foreground" />
              <span>Anki: {fase2_intensiva.tiempo_anki_diario_min}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3 text-muted-foreground" />
              <span>Retención: {(fase2_intensiva.desired_retention * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span>{fase2_intensiva.simulacros_semanales} simulacros/sem</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            {fase2_intensiva.inicio} → {fase2_intensiva.fin}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
