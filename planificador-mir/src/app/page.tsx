'use client';

import { useEffect, useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SessionCard } from '@/components/SessionCard';
import { ProgressStats } from '@/components/ProgressStats';
import { SearchBar } from '@/components/SearchBar';
import { FaseInfo } from '@/components/FaseInfo';
import { useProgressStore } from '@/store/useProgressStore';
import { PlanEstudio, Sesion } from '@/types';
import { GraduationCap, Loader2, Brain, Calendar } from 'lucide-react';

export default function Home() {
  const [plan, setPlan] = useState<PlanEstudio | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredSesiones, setFilteredSesiones] = useState<Sesion[] | null>(null);
  const { loadProgress, isLoading: progressLoading } = useProgressStore();

  const displaySesiones = filteredSesiones ?? plan?.sesiones ?? [];

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/plan_mir_fsrs.json');
        const data = await response.json();
        setPlan(data);
        await loadProgress();
      } catch (error) {
        console.error('Error loading plan:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [loadProgress]);

  if (loading || progressLoading || !plan) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Planificador MIR - FSRS</h1>
              <p className="text-sm text-muted-foreground">
                {plan.resumen.paginas_totales} páginas • {plan.resumen.total_sesiones_contenido} sesiones • ~{plan.resumen.flashcards_estimadas.toLocaleString()} flashcards
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Metodología Banner */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border">
          <div className="flex items-start gap-3">
            <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                {plan.metadata.metodologia}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {plan.metadata.descripcion}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <ProgressStats plan={plan} />

        {/* Fases Info */}
        <FaseInfo fases={plan.fases} />

        {/* Search Bar */}
        <SearchBar sesiones={plan.sesiones} onFilter={setFilteredSesiones} />

        {/* Sessions List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Sesiones de Contenido
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredSesiones ? `${displaySesiones.length} de ` : ''}{plan.resumen.total_sesiones_contenido} sesiones
            </span>
          </div>

          <ScrollArea className="h-[calc(100vh-500px)]">
            {displaySesiones.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No se encontraron sesiones
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-4">
                {displaySesiones.map((sesion) => (
                  <SessionCard
                    key={sesion.numero_sesion}
                    sesion={sesion}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>Planificador MIR FSRS - Una pasada, Anki maneja los repasos</p>
      </footer>
    </div>
  );
}
