# FSRS: Guía Completa para el MIR

## Introducción

**FSRS (Free Spaced Repetition Scheduler)** es el algoritmo de repetición espaciada de nueva generación integrado nativamente en Anki desde la versión 23.10. Desarrollado por el investigador Jarrett Ye, FSRS supera al clásico SM-2 proporcionando **20-30% menos repasos** para mantener la misma retención.

---

## 1. ¿Cómo Funciona FSRS?

### 1.1 Fundamentos del Algoritmo

FSRS utiliza un modelo matemático basado en tres conceptos clave:

| Concepto | Definición |
|----------|------------|
| **Retrievability (R)** | Probabilidad de recordar una tarjeta en un momento dado |
| **Stability (S)** | Tiempo (en días) hasta que R decae al 90% |
| **Difficulty (D)** | Dificultad inherente de la tarjeta (1-10) |

### 1.2 La Curva del Olvido

FSRS modela el olvido con esta fórmula:

```
R(t) = (1 + t / (9 * S))^(-1)
```

Donde:
- `t` = tiempo desde último repaso
- `S` = estabilidad de la memoria
- `R` = probabilidad de recordar

### 1.3 Diferencias con SM-2

| Aspecto | SM-2 (Antiguo) | FSRS (Nuevo) |
|---------|----------------|--------------|
| Modelo | Factor de facilidad fijo | Estabilidad + Dificultad dinámica |
| Adaptación | No aprende de ti | Se optimiza con tus datos |
| Eficiencia | Baseline | 20-30% menos repasos |
| Predicción | Imprecisa | Predice olvido con precisión |

---

## 2. Configuración de FSRS en Anki

### 2.1 Requisitos

- **Anki 23.10+** (FSRS integrado nativamente)
- **Mínimo 1000 repasos** en el mazo para optimizar parámetros
- **AnkiConnect** addon si usas Obsidian (código: 2055492159)

### 2.2 Activar FSRS

1. Ir a **Deck Options** (opciones del mazo)
2. Sección **FSRS**
3. Activar **"Enable FSRS"**
4. Click en **"Optimize"** para calcular tus parámetros personalizados

### 2.3 Configuración Óptima para MIR

```
Desired Retention: 0.90 (ajustar según fase - ver abajo)
Maximum interval: 36500 (no limitar)
Learning steps: 1m 10m
Relearning steps: 10m
```

#### Retención por Fase de Estudio

| Fase | Desired Retention | Justificación |
|------|-------------------|---------------|
| **Base (meses 1-6)** | 0.87-0.90 | Mayor volumen, menor intensidad |
| **Intensificación (meses 7-12)** | 0.90-0.92 | Consolidación |
| **Recta Final (2 semanas)** | 0.92-0.94 | Máxima retención pre-examen |

> [!warning] Retención > 0.95
> Aumentar la retención por encima de 0.95 incrementa EXPONENCIALMENTE la carga de repasos. No recomendado.

### 2.4 Learning Steps

**CRÍTICO:** Los learning steps deben ser menores a 1 día.

```
✅ Correcto: 1m 10m
✅ Correcto: 10m 30m
❌ Incorrecto: 1d 3d
```

FSRS solo programa tarjetas después de que salen del aprendizaje. Si tus learning steps son muy largos, FSRS no actúa.

---

## 3. Uso Diario de FSRS

### 3.1 Los Botones de Respuesta

| Botón | Significado | Cuándo usar |
|-------|-------------|-------------|
| **Again** | No lo recuerdo | Cualquier fallo, aunque sea parcial |
| **Hard** | Lo recuerdo con dificultad | Recordé pero costó mucho |
| **Good** | Lo recuerdo bien | Respuesta correcta normal |
| **Easy** | Demasiado fácil | Respuesta instantánea, sin esfuerzo |

> [!danger] Error Común
> **NUNCA** pulses "Hard" cuando olvidas la respuesta. Esto confunde al algoritmo.
> - Olvidaste → **Again**
> - Recordaste con esfuerzo → **Hard**

### 3.2 Re-optimización

**Cuándo re-optimizar parámetros:**
- Cada mes
- Cuando tus repasos se hayan duplicado desde última optimización
- Después de un cambio significativo en hábitos de estudio

**Cómo:**
1. Deck Options → FSRS → Optimize
2. Verificar que los nuevos parámetros tengan sentido
3. Aplicar

### 3.3 Reschedule Cards on Change

Cuando actives FSRS o cambies parámetros:
- **Activar** "Reschedule cards on change" si quieres que FSRS recalcule todos los intervalos
- **Desactivar** si prefieres que solo afecte a nuevas revisiones

---

## 4. Integración Obsidian ↔ Anki

### 4.1 Arquitectura del Sistema

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│    OBSIDIAN     │────▶│  AnkiConnect     │────▶│    ANKI     │
│  (Notas .md)    │     │  (Puerto 8765)   │     │   (FSRS)    │
└─────────────────┘     └──────────────────┘     └─────────────┘
```

### 4.2 Instalación

#### Paso 1: AnkiConnect en Anki
1. Abrir Anki
2. Tools → Add-ons → Get Add-ons
3. Código: `2055492159`
4. Reiniciar Anki

#### Paso 2: Plugin en Obsidian
1. Settings → Community Plugins → Browse
2. Buscar "Obsidian to Anki"
3. Instalar y activar

#### Paso 3: Configurar Plugin
```yaml
# En Obsidian Settings → Obsidian to Anki
Deck: MIR  # Tu mazo principal
Folder: 20_Enciclopedia_Médica  # Carpeta a sincronizar
```

### 4.3 Sintaxis de Flashcards

#### Opción 1: Hashtag #flashcard

```markdown
¿Cuál es el tratamiento de primera línea de la FA con respuesta ventricular rápida?
#flashcard
Control de frecuencia con betabloqueantes o calcioantagonistas.
```

#### Opción 2: Question::Answer

```markdown
Tratamiento IC sistólica::IECA + BB + Espironolactona

Primera línea HTA::IECA/ARA-II o Tiazidas o CA
```

#### Opción 3: Cloze Deletions

```markdown
El tratamiento de elección del {{c1::Helicobacter pylori}} es
{{c2::IBP + Claritromicina + Amoxicilina}} durante {{c3::14 días}}.
```

#### Opción 4: Estilo Header

```markdown
## ¿Tríada de la estenosis aórtica? #flashcard
Síncope, angina y disnea de esfuerzo.
```

### 4.4 Sincronización

1. Asegurarse de que Anki está abierto
2. En Obsidian: `Ctrl+P` → "Obsidian to Anki: Scan vault"
3. Las tarjetas se crean/actualizan automáticamente

---

## 5. Flujo de Trabajo Recomendado para MIR

### 5.1 Workflow Diario

```
1. MAÑANA: Anki Priming (30-45 min)
   └─ Completar todos los repasos pendientes del día

2. ESTUDIO: Crear notas en Obsidian
   └─ Usar plantillas con campos para flashcards
   └─ Marcar conceptos High-Yield con #flashcard

3. FIN DE SESIÓN: Sincronizar
   └─ Obsidian to Anki: Scan vault
   └─ Revisar tarjetas nuevas creadas

4. NOCHE: Segundo repaso (opcional)
   └─ 15-20 min de tarjetas adicionales
```

### 5.2 Gestión de Carga

| Situación | Acción |
|-----------|--------|
| Repasos > 200/día | Reducir tarjetas nuevas a 0 temporalmente |
| Repasos < 100/día | Aumentar tarjetas nuevas |
| Atrasado +500 tarjetas | Usar "Set Due Date" para distribuir |

### 5.3 Ejemplo de Nota con Flashcards

```markdown
---
tipo: enfermedad
asignatura: Cardiología
yield: High
status: 🔴
---

# Insuficiencia Cardíaca

## Diagnóstico

¿Criterios diagnósticos de IC?
#flashcard
**Criterios de Framingham**: 2 mayores o 1 mayor + 2 menores.
Mayores: DPN, ingurgitación yugular, estertores, cardiomegalia.

## Tratamiento

Tratamiento que mejora supervivencia en IC-FEr::IECA + BB + ARM (espironolactona/eplerenona)

El {{c1::sacubitrilo/valsartán}} sustituye a los IECA en IC-FEr que permanece sintomática.
```

---

## 6. Métricas y Monitorización

### 6.1 Stats a Revisar

En Anki → Stats:

| Métrica | Objetivo |
|---------|----------|
| **True Retention** | Cerca de tu Desired Retention |
| **Review Count** | Manejable (<250/día) |
| **Mature Cards** | Creciendo mensualmente |

### 6.2 FSRS Stats (addon recomendado)

Instalar addon "FSRS Stats" para ver:
- Precisión de predicción de FSRS
- Distribución de estabilidad
- Curvas de retención reales vs predichas

---

## 7. Troubleshooting

### Problema: Demasiados repasos

**Solución:**
1. Bajar Desired Retention (0.85-0.87)
2. Pausar tarjetas nuevas
3. Re-optimizar parámetros

### Problema: Olvido todo aunque repaso

**Solución:**
1. Subir Desired Retention (0.92-0.94)
2. Verificar que usas "Again" correctamente
3. Revisar calidad de las tarjetas (¿son memorables?)

### Problema: Obsidian no sincroniza

**Solución:**
1. Verificar Anki abierto
2. Verificar AnkiConnect instalado
3. Probar URL: `http://localhost:8765` en navegador
4. Reiniciar Anki y Obsidian

---

## 8. Resumen de Configuración MIR

```yaml
# ANKI - Deck Options
FSRS: Enabled
Desired Retention: 0.90
Maximum Interval: 36500
Learning Steps: 1m 10m
Relearning Steps: 10m
Graduating Interval: 1
Easy Interval: 4

# ANKI - Addons
- AnkiConnect (2055492159)
- FSRS Stats (opcional)

# OBSIDIAN - Plugins
- Obsidian to Anki
- Dataview
- Templater
```

---

## Fuentes

- [FSRS Algorithm Official GitHub](https://github.com/open-spaced-repetition/fsrs4anki)
- [Anki FSRS Tutorial](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md)
- [Anki Manual - Deck Options](https://docs.ankiweb.net/deck-options.html)
- [Obsidian to Anki Plugin](https://github.com/Pseudonium/Obsidian_to_Anki)

---

*Última actualización: 2025-11-30*
