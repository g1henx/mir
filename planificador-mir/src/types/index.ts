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
  videos?: Video[];
}

export interface Sesion {
  numero_sesion_global: number;
  numero_sesion_vuelta: number;
  total_paginas: number;
  capitulos: Capitulo[];
}

export interface Vuelta {
  descripcion: string;
  paginas_por_sesion_media: number;
  rango_paginas?: { min: number; max: number };
  sesiones: Sesion[];
}

export interface PlanEstudio {
  resumen: {
    total_sesiones: number;
    sesiones_vuelta1: number;
    sesiones_vuelta2: number;
    paginas_totales_por_vuelta: number;
  };
  vuelta1: Vuelta;
  vuelta2: Vuelta;
}

export interface SessionProgress {
  id: number;
  sessionNumber: number;
  vuelta: number;
  completed: boolean;
  completedAt: Date | null;
}
