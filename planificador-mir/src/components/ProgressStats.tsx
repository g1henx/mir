'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { PlanEstudio } from '@/types';
import { Target, FileText, Brain } from 'lucide-react';

interface ProgressStatsProps {
  plan: PlanEstudio;
}

export function ProgressStats({ plan }: ProgressStatsProps) {
  const { getCompletedCount } = useProgressStore();

  const totalSessions = plan.resumen.total_sesiones_contenido;
  const completedTotal = getCompletedCount();
  const percentageTotal = Math.round((completedTotal / totalSessions) * 100);

  // Calcular páginas y flashcards completadas (aproximación)
  const pagesCompleted = Math.round((completedTotal / totalSessions) * plan.resumen.paginas_totales);
  const flashcardsEstimated = Math.round((completedTotal / totalSessions) * plan.resumen.flashcards_estimadas);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Progreso Sesiones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Progreso Sesiones</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{percentageTotal}%</div>
          <p className="text-xs text-muted-foreground">
            {completedTotal} de {totalSessions} sesiones
          </p>
          <Progress value={percentageTotal} className="mt-3" />
        </CardContent>
      </Card>

      {/* Páginas Estudiadas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Páginas Estudiadas</CardTitle>
          <FileText className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{pagesCompleted.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            de {plan.resumen.paginas_totales.toLocaleString()} páginas
          </p>
          <Progress
            value={Math.round((pagesCompleted / plan.resumen.paginas_totales) * 100)}
            className="mt-3 [&>div]:bg-blue-500"
          />
        </CardContent>
      </Card>

      {/* Flashcards Creadas (estimación) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flashcards (est.)</CardTitle>
          <Brain className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">~{flashcardsEstimated.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            de ~{plan.resumen.flashcards_estimadas.toLocaleString()} estimadas
          </p>
          <Progress
            value={Math.round((flashcardsEstimated / plan.resumen.flashcards_estimadas) * 100)}
            className="mt-3 [&>div]:bg-purple-500"
          />
        </CardContent>
      </Card>
    </div>
  );
}
