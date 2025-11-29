'use client';

import { useEffect, useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SessionCard } from '@/components/SessionCard';
import { ProgressStats } from '@/components/ProgressStats';
import { SearchBar } from '@/components/SearchBar';
import { useProgressStore } from '@/store/useProgressStore';
import { PlanEstudio, Sesion } from '@/types';
import { GraduationCap, Loader2 } from 'lucide-react';

export default function Home() {
  const [plan, setPlan] = useState<PlanEstudio | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredVuelta1, setFilteredVuelta1] = useState<Sesion[] | null>(null);
  const [filteredVuelta2, setFilteredVuelta2] = useState<Sesion[] | null>(null);
  const { loadProgress, isLoading: progressLoading } = useProgressStore();

  // Combine all sessions for unified search
  const allSesiones = useMemo(() => {
    if (!plan) return [];
    return [...plan.vuelta1.sesiones, ...plan.vuelta2.sesiones];
  }, [plan]);

  // Handle search results
  const handleFilter = (filtered: Sesion[] | null) => {
    if (!filtered || !plan) {
      setFilteredVuelta1(null);
      setFilteredVuelta2(null);
      return;
    }

    const vuelta1Sessions = new Set(plan.vuelta1.sesiones.map(s => s.numero_sesion_global));
    setFilteredVuelta1(filtered.filter(s => vuelta1Sessions.has(s.numero_sesion_global)));
    setFilteredVuelta2(filtered.filter(s => !vuelta1Sessions.has(s.numero_sesion_global)));
  };

  // Sessions to display
  const displayVuelta1 = filteredVuelta1 ?? plan?.vuelta1.sesiones ?? [];
  const displayVuelta2 = filteredVuelta2 ?? plan?.vuelta2.sesiones ?? [];

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/plan_estudio_180_sesiones.json');
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
              <h1 className="text-2xl font-bold">Planificador MIR CTO</h1>
              <p className="text-sm text-muted-foreground">
                {plan.resumen.paginas_totales_por_vuelta} páginas • {plan.resumen.total_sesiones} sesiones
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Stats */}
        <ProgressStats plan={plan} />

        {/* Search Bar */}
        <SearchBar sesiones={allSesiones} onFilter={handleFilter} />

        {/* Sessions Tabs */}
        <Tabs defaultValue="vuelta1" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="vuelta1" className="text-sm">
              1ª Vuelta ({filteredVuelta1 ? `${displayVuelta1.length}/` : ''}{plan.resumen.sesiones_vuelta1} sesiones)
            </TabsTrigger>
            <TabsTrigger value="vuelta2" className="text-sm">
              2ª Vuelta ({filteredVuelta2 ? `${displayVuelta2.length}/` : ''}{plan.resumen.sesiones_vuelta2} sesiones)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vuelta1">
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                {plan.vuelta1.descripcion}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Media: {plan.vuelta1.paginas_por_sesion_media.toFixed(1)} páginas/sesión
              </p>
            </div>
            <ScrollArea className="h-[calc(100vh-400px)]">
              {displayVuelta1.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No se encontraron sesiones en la 1ª vuelta
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-4">
                  {displayVuelta1.map((sesion) => (
                    <SessionCard
                      key={sesion.numero_sesion_global}
                      sesion={sesion}
                      vuelta={1}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="vuelta2">
            <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">
                {plan.vuelta2.descripcion}
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Media: {plan.vuelta2.paginas_por_sesion_media.toFixed(1)} páginas/sesión
              </p>
            </div>
            <ScrollArea className="h-[calc(100vh-400px)]">
              {displayVuelta2.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No se encontraron sesiones en la 2ª vuelta
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-4">
                  {displayVuelta2.map((sesion) => (
                    <SessionCard
                      key={sesion.numero_sesion_global}
                      sesion={sesion}
                      vuelta={2}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>Planificador MIR CTO - 180 sesiones para dominar el temario</p>
      </footer>
    </div>
  );
}
