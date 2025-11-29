'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/useProgressStore';
import { PlanEstudio } from '@/types';
import { BookCheck, Target, TrendingUp } from 'lucide-react';

interface ProgressStatsProps {
  plan: PlanEstudio;
}

export function ProgressStats({ plan }: ProgressStatsProps) {
  const { getCompletedCount, getCompletedCountByVuelta } = useProgressStore();

  const totalSessions = plan.resumen.total_sesiones;
  const completedTotal = getCompletedCount();
  const percentageTotal = Math.round((completedTotal / totalSessions) * 100);

  const sessionsV1 = plan.resumen.sesiones_vuelta1;
  const sessionsV2 = plan.resumen.sesiones_vuelta2;

  const completedV1 = getCompletedCountByVuelta(1, sessionsV1, 1);
  const completedV2 = getCompletedCountByVuelta(2, sessionsV2, sessionsV1 + 1);

  const percentageV1 = Math.round((completedV1 / sessionsV1) * 100);
  const percentageV2 = Math.round((completedV2 / sessionsV2) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Progreso Total</CardTitle>
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

      {/* Primera Vuelta */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">1ª Vuelta</CardTitle>
          <BookCheck className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{percentageV1}%</div>
          <p className="text-xs text-muted-foreground">
            {completedV1} de {sessionsV1} sesiones
          </p>
          <Progress value={percentageV1} className="mt-3 [&>div]:bg-blue-500" />
        </CardContent>
      </Card>

      {/* Segunda Vuelta */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">2ª Vuelta</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{percentageV2}%</div>
          <p className="text-xs text-muted-foreground">
            {completedV2} de {sessionsV2} sesiones
          </p>
          <Progress value={percentageV2} className="mt-3 [&>div]:bg-purple-500" />
        </CardContent>
      </Card>
    </div>
  );
}
