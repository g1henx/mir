export interface Video {
  titulo: string;
  url: string;
  idioma: 'es' | 'en' | string;
  duracion?: string;
  aportacion: string;
}

export interface Capitulo {
  manual: string;
  capitulo_numero: number;
  capitulo_nombre: string;
  paginas: number;
  apartados?: number;
  videos?: Video[];
}

export interface Sesion {
  numero_sesion: number;
  total_paginas: number;
  capitulos: Capitulo[];
}

export interface Fase {
  nombre: string;
  inicio: string;
  fin: string;
  semanas: number;
  objetivo: string;
  horas_semanales: number;
  tiempo_anki_diario_min: string;
  desired_retention: number;
  simulacros_semanales?: number;
}

export interface PlanMetadata {
  version: string;
  metodologia: string;
  fecha_creacion: string;
  descripcion: string;
}

export interface PlanResumen {
  total_sesiones_contenido: number;
  paginas_totales: number;
  capitulos_totales: number;
  flashcards_estimadas: number;
  manuales: number;
}

export interface PlanEstudio {
  metadata: PlanMetadata;
  resumen: PlanResumen;
  fases: {
    fase1_base: Fase;
    fase2_intensiva: Fase;
  };
  sesiones: Sesion[];
}

export interface SessionProgress {
  id: number;
  sessionNumber: number;
  completed: boolean;
  completedAt: Date | null;
}
