# Plan de Implementación FSRS en Planificador MIR

## Resumen Ejecutivo

Este documento propone la integración de métricas FSRS (Free Spaced Repetition Scheduler) en la aplicación Planificador MIR existente, conectándola con Anki para obtener estadísticas de retención en tiempo real.

---

## 1. Estado Actual

### Arquitectura Existente
- **Framework**: Next.js 14 (App Router)
- **Base de Datos**: SQLite con Prisma ORM
- **Estado**: Zustand (`useProgressStore`)
- **UI**: Tailwind CSS + shadcn/ui

### Modelos Actuales
```prisma
model SessionProgress {
  id              Int
  sessionNumber   Int @unique
  vuelta          Int
  completed       Boolean
  completedAt     DateTime?
}
```

---

## 2. Arquitectura Propuesta

### 2.1 Diagrama de Flujo

```
┌──────────────────────┐
│   Planificador MIR   │
│   (Next.js App)      │
└──────────┬───────────┘
           │ API Route
           ▼
┌──────────────────────┐     HTTP      ┌──────────────────┐
│  /api/anki/stats     │◄─────────────►│   AnkiConnect    │
│  /api/anki/sync      │               │   (localhost:    │
└──────────────────────┘               │    8765)         │
           │                           └────────┬─────────┘
           ▼                                    │
┌──────────────────────┐               ┌────────▼─────────┐
│   SQLite Database    │               │      ANKI        │
│   (estadísticas      │               │   (FSRS Data)    │
│    cacheadas)        │               └──────────────────┘
└──────────────────────┘
```

### 2.2 Nuevos Modelos Prisma

```prisma
// Agregar a prisma/schema.prisma

model AnkiDeck {
  id          Int      @id @default(autoincrement())
  deckId      BigInt   @unique  // ID del mazo en Anki
  name        String
  lastSync    DateTime @default(now())
  stats       AnkiStats[]
}

model AnkiStats {
  id              Int      @id @default(autoincrement())
  deckId          Int
  deck            AnkiDeck @relation(fields: [deckId], references: [id])
  date            DateTime @default(now())

  // Métricas FSRS
  totalCards      Int
  matureCards     Int      // Intervalo > 21 días
  youngCards      Int      // Intervalo 1-21 días
  newCards        Int
  suspendedCards  Int

  // Retención
  trueRetention   Float?   // Retención real calculada
  reviewsToday    Int
  averageInterval Float?   // Intervalo promedio en días

  createdAt       DateTime @default(now())

  @@unique([deckId, date])
}

model DailyReview {
  id          Int      @id @default(autoincrement())
  date        DateTime @unique
  reviewed    Int      // Tarjetas repasadas
  newLearned  Int      // Tarjetas nuevas aprendidas
  time        Int      // Tiempo en segundos
  retention   Float?   // % de aciertos del día
  createdAt   DateTime @default(now())
}
```

---

## 3. Fases de Implementación

### Fase 1: Conexión AnkiConnect (2-3 horas)

**Objetivo**: Establecer comunicación con Anki

#### 3.1.1 Crear Cliente AnkiConnect

```typescript
// src/lib/ankiConnect.ts

const ANKI_CONNECT_URL = 'http://localhost:8765';

interface AnkiRequest {
  action: string;
  version: number;
  params?: Record<string, unknown>;
}

interface AnkiResponse<T> {
  result: T;
  error: string | null;
}

export async function ankiRequest<T>(action: string, params?: Record<string, unknown>): Promise<T> {
  const response = await fetch(ANKI_CONNECT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action,
      version: 6,
      params,
    } as AnkiRequest),
  });

  const data: AnkiResponse<T> = await response.json();

  if (data.error) {
    throw new Error(`AnkiConnect error: ${data.error}`);
  }

  return data.result;
}

// Funciones específicas
export async function getDeckNames(): Promise<string[]> {
  return ankiRequest<string[]>('deckNames');
}

export async function getDeckStats(deck: string): Promise<DeckStats> {
  return ankiRequest<DeckStats>('getDeckStats', { decks: [deck] });
}

export async function getNumCardsReviewedToday(): Promise<number> {
  return ankiRequest<number>('getNumCardsReviewedToday');
}
```

#### 3.1.2 API Route para Stats

```typescript
// src/app/api/anki/stats/route.ts

import { ankiRequest, getDeckStats } from '@/lib/ankiConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const decks = await ankiRequest<string[]>('deckNames');
    const stats = await getDeckStats('MIR'); // Tu mazo principal

    return NextResponse.json({
      connected: true,
      decks,
      stats,
    });
  } catch (error) {
    return NextResponse.json({
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
```

---

### Fase 2: Componentes UI (3-4 horas)

#### 3.2.1 Componente AnkiStats

```typescript
// src/components/AnkiStats.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Clock, Zap } from 'lucide-react';

interface AnkiStatsProps {
  stats: {
    totalCards: number;
    matureCards: number;
    youngCards: number;
    newCards: number;
    reviewsToday: number;
    trueRetention: number;
    averageInterval: number;
  };
}

export function AnkiStats({ stats }: AnkiStatsProps) {
  const maturePercent = (stats.matureCards / stats.totalCards) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Estadísticas FSRS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Retención */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Retención Real</span>
          <Badge variant={stats.trueRetention >= 0.9 ? 'default' : 'secondary'}>
            {(stats.trueRetention * 100).toFixed(1)}%
          </Badge>
        </div>

        {/* Progreso Maduras */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Tarjetas Maduras</span>
            <span className="text-sm text-muted-foreground">
              {stats.matureCards} / {stats.totalCards}
            </span>
          </div>
          <Progress value={maturePercent} className="h-2" />
        </div>

        {/* Métricas del día */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-lg font-semibold">{stats.reviewsToday}</p>
              <p className="text-xs text-muted-foreground">Repasos hoy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-lg font-semibold">{stats.averageInterval.toFixed(0)}d</p>
              <p className="text-xs text-muted-foreground">Intervalo medio</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### 3.2.2 Widget de Conexión Anki

```typescript
// src/components/AnkiConnectionStatus.tsx

'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

export function AnkiConnectionStatus() {
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('/api/anki/stats');
        const data = await res.json();
        setConnected(data.connected);
      } catch {
        setConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check cada 30s
    return () => clearInterval(interval);
  }, []);

  if (connected === null) return null;

  return (
    <Badge variant={connected ? 'default' : 'destructive'} className="gap-1">
      {connected ? (
        <>
          <Wifi className="h-3 w-3" /> Anki conectado
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" /> Anki desconectado
        </>
      )}
    </Badge>
  );
}
```

---

### Fase 3: Dashboard Integrado (2-3 horas)

#### 3.3.1 Nueva Pestaña en Home

Modificar `src/app/page.tsx` para agregar una tercera pestaña:

```tsx
<Tabs defaultValue="vuelta1" className="w-full">
  <TabsList className="grid w-full grid-cols-3 mb-4">
    <TabsTrigger value="vuelta1">1ª Vuelta</TabsTrigger>
    <TabsTrigger value="vuelta2">2ª Vuelta</TabsTrigger>
    <TabsTrigger value="anki">FSRS</TabsTrigger>
  </TabsList>

  {/* ... tabs existentes ... */}

  <TabsContent value="anki">
    <AnkiDashboard />
  </TabsContent>
</Tabs>
```

#### 3.3.2 Componente Dashboard FSRS

```typescript
// src/components/AnkiDashboard.tsx

'use client';

import { useEffect, useState } from 'react';
import { AnkiStats } from './AnkiStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

export function AnkiDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/anki/stats');
      const data = await res.json();
      if (data.connected) {
        setStats(data.stats);
        setError(null);
      } else {
        setError('Anki no está abierto. Ábrelo y activa AnkiConnect.');
      }
    } catch {
      setError('Error conectando con Anki');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="flex flex-col items-center py-8 gap-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <p className="text-center">{error}</p>
          <Button onClick={fetchStats} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Estadísticas FSRS</h2>
        <Button onClick={fetchStats} size="sm" variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      {stats && <AnkiStats stats={stats} />}

      {/* Recomendaciones basadas en stats */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {stats?.reviewsToday < 50 && (
              <li className="flex items-center gap-2 text-amber-600">
                ⚠️ Pocos repasos hoy. Intenta completar al menos 100.
              </li>
            )}
            {stats?.trueRetention < 0.85 && (
              <li className="flex items-center gap-2 text-red-600">
                ⚠️ Retención baja. Considera subir Desired Retention en Anki.
              </li>
            )}
            {stats?.trueRetention >= 0.90 && (
              <li className="flex items-center gap-2 text-green-600">
                ✅ Excelente retención. Mantén el ritmo.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

### Fase 4: Sincronización Automática (2 horas)

#### 3.4.1 Cron Job para Cachear Stats

```typescript
// src/app/api/anki/sync/route.ts

import { prisma } from '@/lib/prisma';
import { getDeckStats, getNumCardsReviewedToday } from '@/lib/ankiConnect';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const stats = await getDeckStats('MIR');
    const reviewsToday = await getNumCardsReviewedToday();

    // Guardar en BD
    await prisma.dailyReview.upsert({
      where: { date: new Date().toISOString().split('T')[0] },
      update: { reviewed: reviewsToday },
      create: {
        date: new Date(),
        reviewed: reviewsToday,
        newLearned: stats.new,
        time: 0,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
```

---

## 4. Checklist de Implementación

### Fase 1: Conexión (Día 1)
- [ ] Instalar AnkiConnect en Anki (addon 2055492159)
- [ ] Crear `src/lib/ankiConnect.ts`
- [ ] Crear `/api/anki/stats/route.ts`
- [ ] Probar conexión con `curl localhost:8765`

### Fase 2: UI (Día 1-2)
- [ ] Crear `AnkiStats.tsx`
- [ ] Crear `AnkiConnectionStatus.tsx`
- [ ] Agregar badge de conexión al header

### Fase 3: Dashboard (Día 2)
- [ ] Crear `AnkiDashboard.tsx`
- [ ] Agregar pestaña FSRS en `page.tsx`
- [ ] Implementar recomendaciones dinámicas

### Fase 4: Persistencia (Día 3)
- [ ] Actualizar `schema.prisma` con nuevos modelos
- [ ] `npx prisma migrate dev`
- [ ] Crear `/api/anki/sync`
- [ ] Implementar histórico de stats

---

## 5. Dependencias Necesarias

```bash
# No requiere dependencias adicionales
# AnkiConnect expone una API HTTP simple
```

---

## 6. Configuración Requerida

### En Anki
1. Instalar addon AnkiConnect: `2055492159`
2. Reiniciar Anki
3. Permitir conexiones desde localhost (ya viene por defecto)

### En .env
```env
# Añadir si se quiere configurar URL personalizada
ANKI_CONNECT_URL=http://localhost:8765
```

---

## 7. Métricas Clave a Mostrar

| Métrica | Fuente AnkiConnect | Uso |
|---------|-------------------|-----|
| Total Cards | `getDeckStats` | Progreso global |
| Mature Cards | `getDeckStats` | Conocimiento consolidado |
| True Retention | `getCollectionStats` | Eficacia del estudio |
| Reviews Today | `getNumCardsReviewedToday` | Cumplimiento diario |
| Average Interval | Calculado | Estabilidad de memoria |

---

## 8. Roadmap Futuro

### v1.1 - Correlación con Sesiones
- Vincular capítulos de sesiones con tags de Anki
- Mostrar "Tarjetas pendientes" por capítulo

### v1.2 - Gráficos Históricos
- Gráfico de retención semanal
- Gráfico de repasos diarios
- Predicción de carga futura

### v1.3 - Alertas
- Notificación si repasos > 300
- Alerta si retención cae del 85%
- Recordatorio para re-optimizar FSRS

---

*Plan creado: 2025-11-30*
*Tiempo estimado total: 8-12 horas de desarrollo*
