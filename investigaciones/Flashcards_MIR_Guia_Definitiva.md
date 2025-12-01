# Guía Definitiva: Creación de Flashcards para el MIR en Obsidian

## Introducción

Esta guía consolida las mejores prácticas mundiales de creación de flashcards adaptadas específicamente al contexto del examen MIR. Combina los principios de las "20 Reglas para Formular Conocimiento" de SuperMemo, las técnicas de Med School Insiders, y la metodología híbrida Obsidian-Anki para maximizar la retención con el mínimo esfuerzo.

---

## Parte 1: Principios Fundamentales

### 1.1 La Regla de Oro: Primero Entender, Luego Memorizar

> **NUNCA crees una flashcard de algo que no entiendes.**

El error más común del opositor MIR es intentar memorizar definiciones o listas sin comprenderlas. Esto produce:
- Retención frágil y de corto plazo
- Incapacidad de aplicar el conocimiento en casos clínicos
- Frustración y fatiga innecesaria

**Flujo correcto:**
```
1. Leer el tema completo en el manual
2. Construir la nota en Obsidian con la plantilla Disease Script
3. SOLO ENTONCES crear flashcards de los datos discriminantes
```

### 1.2 El Principio de Información Mínima

La regla más violada por estudiantes novatos. Cada flashcard debe contener **UN SOLO dato atómico**.

| MAL FORMULADO | BIEN FORMULADO |
|---------------|----------------|
| ¿Qué es la estenosis aórtica? Definición, etiología, clínica, diagnóstico, tratamiento... | ¿Cuál es la causa más frecuente de estenosis aórtica en >70 años? → Degenerativa/calcificada |
| ¿Cuáles son los efectos adversos de los IECA? Lista de 8 efectos... | ¿Qué efecto adverso de IECA es dosis-independiente y obliga a cambiar a ARA-II? → Tos seca |

### 1.3 Regla 80/20 (Pareto) para el MIR

El 80% de las preguntas MIR vienen del 20% del temario. Prioriza flashcards para:

1. **Tratamiento de primera línea** (el más preguntado)
2. **Prueba diagnóstica de elección** (Gold Standard)
3. **Signos patognomónicos** (dato que confirma diagnóstico)
4. **Indicaciones quirúrgicas** (muy preguntado en Digestivo, Cardio)
5. **Efectos adversos característicos** (los "raros pero típicos")
6. **Asociaciones genéticas** (HLA, mutaciones)

---

## Parte 2: Tipos de Flashcards y Cuándo Usar Cada Una

### 2.1 Cloze Deletion (Oclusión de Texto)

**El formato más eficiente para el MIR.** Ideal para el 80% de tus tarjetas.

```markdown
El tratamiento de primera línea de la {{c1::neumonía comunitaria}} típica es {{c2::amoxicilina}} durante {{c3::7 días}}.
```

**Reglas para Cloze:**
- **UNA sola oclusión por tarjeta** (máximo 2 si están muy relacionadas)
- La oclusión debe ser el **dato discriminante**, no la palabra obvia
- Incluir contexto suficiente para evitar ambigüedad

**Ejemplos MIR:**

```markdown
# CORRECTO
En la {{c1::pericarditis constrictiva}}, el signo de Kussmaul es característico.

# INCORRECTO (oclusión demasiado grande)
En la pericarditis constrictiva, {{c1::el signo de Kussmaul es característico}}.
```

### 2.2 Basic (Pregunta-Respuesta)

Útil para preguntas directas tipo MIR.

```markdown
¿Cuál es el antídoto de la intoxicación por paracetamol?
#flashcard
N-acetilcisteína (NAC)
```

**Cuándo usar Basic:**
- Preguntas de "¿Cuál es el X de Y?"
- Datos numéricos (dosis, valores de referencia)
- Asociaciones directas (enfermedad → gen, fármaco → mecanismo)

### 2.3 Basic + Reversed

Para conceptos que debes conocer en ambas direcciones.

```markdown
Enfermedad de Addison
?
Hiperpigmentación, hipotensión, hiponatremia, hiperpotasemia

---

Hiperpigmentación + hipotensión + hiponatremia + hiperpotasemia
?
Enfermedad de Addison
```

**Cuándo usar Reversed:**
- Patología ↔ Clínica característica
- Fármaco ↔ Mecanismo de acción
- Signo/síntoma ↔ Diagnóstico que sugiere

### 2.4 Image Occlusion

**Esencial para:** Anatomía, Dermatología, Radiología, Oftalmología.

**Configuración:**
1. Instalar addon "Image Occlusion Enhanced" en Anki (código: 1374772155)
2. Usar imágenes del manual o atlas
3. Ocultar UNA estructura por tarjeta

**Aplicaciones MIR:**
- Ciclo cardíaco y ECG
- Dermatomas y pares craneales
- Lesiones dermatológicas características
- Imágenes radiológicas típicas

---

## Parte 3: Sintaxis en Obsidian

### 3.1 Método #flashcard (Recomendado)

```markdown
¿Cuál es el tratamiento de elección de la pericarditis aguda idiopática?
#flashcard
AINEs (ibuprofeno o AAS) + Colchicina durante 3 meses.

**Extra:** La colchicina reduce recurrencias del 50% al 15%.
```

### 3.2 Método Question::Answer

```markdown
Triada clásica de estenosis aórtica::Síncope, angina, disnea de esfuerzo
Primera línea HTA::Tiazidas, IECA/ARA-II o Calcioantagonistas
```

### 3.3 Método Cloze en Obsidian

```markdown
El {{c1::hipotiroidismo}} causa {{c2::bradicardia}}, mientras que el {{c1::hipertiroidismo}} causa {{c2::taquicardia}}.
```

### 3.4 Método Header (para notas largas)

```markdown
## ¿Cuáles son las indicaciones quirúrgicas de la colecistitis aguda? #flashcard

1. Perforación vesicular
2. Colecistitis gangrenosa
3. Colecistitis enfisematosa
4. Peritonitis biliar
```

---

## Parte 4: Anatomía de una Flashcard Perfecta

### 4.1 Estructura Recomendada

```
┌─────────────────────────────────────────────────┐
│ PREGUNTA (Frente)                               │
│ • Concisa (máximo 15 palabras)                  │
│ • Sin ambigüedad                                │
│ • Contexto clínico si es necesario              │
├─────────────────────────────────────────────────┤
│ RESPUESTA (Reverso)                             │
│ • Lo más corta posible (ideal: 1-3 palabras)   │
│ • Negrita en el dato clave                      │
│ • Extra: el "por qué" fisiopatológico          │
│ • Fuente: Manual CTO p. 45                      │
└─────────────────────────────────────────────────┘
```

### 4.2 Ejemplo Completo

```markdown
¿Cuál es el tratamiento de primera elección en la endocarditis sobre válvula nativa por S. aureus meticilin-sensible?
#flashcard

**Cloxacilina** (o Cefazolina) 4-6 semanas

---
**Extra:** Se añade Gentamicina los primeros 3-5 días para efecto sinérgico.
**Fuente:** CTO Infecciosas p. 82
**MIR:** Preguntado en 2019, 2021
```

---

## Parte 5: Errores Comunes y Cómo Evitarlos

### 5.1 Los 7 Pecados Capitales de las Flashcards

| Error | Ejemplo | Solución |
|-------|---------|----------|
| **Tarjeta demasiado compleja** | Listar 8 causas de hiperpotasemia en una tarjeta | Crear 8 tarjetas, una por causa, con contexto |
| **Memorizar sin entender** | "¿Qué es la relación V/Q?" sin saber qué significa | Primero estudiar el concepto, luego crear tarjeta |
| **Respuesta demasiado larga** | Respuesta de 3 párrafos | Respuesta de 1-5 palabras + Extra opcional |
| **Falta de contexto** | "¿Qué causa tos?" (miles de respuestas posibles) | "¿Qué antihipertensivo causa tos seca como RAM?" |
| **Sets no ordenados** | "Lista los 6 criterios de Jones" | Usar mnemotecnia o Cloze solapado |
| **Sin fuente** | No saber de dónde salió el dato | Añadir "Fuente: CTO p. X" |
| **Tarjeta huérfana** | Flashcard sin nota de respaldo en Obsidian | Primero crear nota, luego flashcard |

### 5.2 Cómo Manejar Listas y Enumeraciones

Las listas son el enemigo del repaso espaciado. Estrategias:

**Opción 1: Mnemotecnia**
```markdown
¿Cuáles son las ramas de la carótida externa? (SALFOTSM)
#flashcard
**S**uperior tiroidea, **A**scendente faríngea, **L**ingual, **F**acial, **O**ccipital, **T**emporal superficial, **M**axilar
```

**Opción 2: Cloze Solapado**
```markdown
Ramas carótida externa (proximal→distal): {{c1::Tiroidea superior}}, {{c2::Faríngea ascendente}}, {{c3::Lingual}}...

Ramas carótida externa: Tiroidea superior, {{c1::Faríngea ascendente}}, {{c2::Lingual}}, {{c3::Facial}}...
```

**Opción 3: Agrupar por Significado**
```markdown
¿Qué ramas de la carótida externa irrigan la cara?
#flashcard
Facial, Temporal superficial, Maxilar
```

### 5.3 Combatir la Interferencia

Cuando dos conceptos similares se confunden constantemente:

**Problema:** Confundir Addison con Cushing
**Solución:** Crear tarjeta de comparación directa

```markdown
{{c1::Addison}} = ↓cortisol = hiper{{c2::potasemia}} + hipo{{c3::tensión}} + hiper{{c4::pigmentación}}

{{c1::Cushing}} = ↑cortisol = hipo{{c2::potasemia}} + hiper{{c3::tensión}} + obesidad {{c4::central}}
```

---

## Parte 6: Flujo de Trabajo Diario

### 6.1 Creación de Flashcards (Durante Estudio)

```
1. Leer epígrafe del manual CTO/AMIR
2. Crear/actualizar nota en Obsidian con plantilla
3. Identificar 3-5 datos High-Yield del epígrafe
4. Crear flashcard para cada dato usando #flashcard
5. Al terminar sesión: Obsidian to Anki → Scan vault
```

### 6.2 Repaso Diario (FSRS)

```
MAÑANA (30-45 min)
└─ Completar TODOS los repasos pendientes de Anki
└─ Esto "prima" el cerebro antes de material nuevo

TARDE (Post-estudio)
└─ Sincronizar nuevas tarjetas creadas
└─ Hacer 10-20 tarjetas nuevas

NOCHE (Opcional, 15 min)
└─ Repaso ligero de tarjetas difíciles
```

### 6.3 Gestión de Carga

| Situación | Acción |
|-----------|--------|
| Repasos > 250/día | PARAR tarjetas nuevas, solo repasos |
| Repasos 150-250/día | Reducir tarjetas nuevas a 10-15/día |
| Repasos < 100/día | Aumentar tarjetas nuevas a 25-50/día |
| Atrasado +500 tarjetas | Usar "Set Due Date" para distribuir en 7 días |

---

## Parte 7: Tags Transversales para Flashcards

Usar tags en el frontmatter de Obsidian para filtrar después:

### 7.1 Por Tipo de Pregunta MIR

```yaml
tags:
  - MIR/PreguntaDirecta    # Dato literal
  - MIR/CasoClinico        # Presentación típica
  - MIR/Imagen             # Requiere imagen
  - MIR/Calculo            # Fórmulas, scores
```

### 7.2 Por Tipo de Conocimiento

```yaml
tags:
  - Tipo/Tratamiento       # Primera línea, algoritmo
  - Tipo/Diagnostico       # Gold standard, criterios
  - Tipo/EfectoAdverso     # RAMs características
  - Tipo/Fisiopatologia    # Mecanismos clave
  - Tipo/Epidemiologia     # Perfil paciente típico
```

### 7.3 Por Dificultad Subjetiva

```yaml
tags:
  - Dificultad/Facil       # Datos directos
  - Dificultad/Media       # Requiere razonamiento
  - Dificultad/Dificil     # Interferencia frecuente
```

---

## Parte 8: Plantilla de Nota con Flashcards Integradas

```markdown
---
tipo: enfermedad
asignatura: Cardiología
yield: High
status: 🔴
tags:
  - MIR/CasoClinico
  - Tipo/Tratamiento
---

# Pericarditis Aguda

## Flashcards de Alto Rendimiento

¿Cuál es la causa más frecuente de pericarditis aguda en jóvenes?
#flashcard
**Viral** (Coxsackie, Echovirus, Adenovirus)

---

¿Qué hallazgo ECG es patognomónico de pericarditis?
#flashcard
**Elevación difusa del ST** (cóncava hacia arriba) + **Descenso del PR**

---

¿Cuál es el tratamiento de elección de la pericarditis aguda idiopática?
#flashcard
**AINEs** (Ibuprofeno 600mg/8h o AAS 750mg/8h) **+ Colchicina** 0.5mg/12h × 3 meses

**Extra:** La colchicina reduce recurrencias del 50% al 15%.

---

¿Cuándo está indicada la pericardiocentesis?
#flashcard
- Taponamiento cardíaco
- Sospecha de pericarditis purulenta
- Derrame pericárdico > 20mm que no mejora

---

## Contenido Completo

[Resto de la nota con información detallada...]
```

---

## Parte 9: Configuración Óptima

### 9.1 Anki - Deck Options (FSRS)

```
FSRS: Enabled
Desired Retention: 0.90 (ajustar según fase)
Learning Steps: 1m 10m
Relearning Steps: 10m
Maximum Interval: 36500 (sin límite)
New Cards/Day: 20-50 (según carga)
```

### 9.2 Obsidian to Anki Plugin

```yaml
# Settings
Deck: MIR
Folder: 20_Enciclopedia_Médica
Flashcard tag: #flashcard
Context-Aware Mode: true
Add file link: true  # Para volver a la nota original
```

### 9.3 AnkiConnect

- Addon code: `2055492159`
- Puerto: 8765 (default)
- Anki debe estar abierto para sincronizar

---

## Parte 10: Checklist de Calidad

Antes de crear una flashcard, verifica:

- [ ] ¿Entiendo completamente el concepto? (Si no → estudiar primero)
- [ ] ¿La pregunta tiene UNA SOLA respuesta correcta posible?
- [ ] ¿La respuesta es lo más corta posible? (ideal < 5 palabras)
- [ ] ¿Es información High-Yield para el MIR?
- [ ] ¿He incluido la fuente? (Manual, página)
- [ ] ¿Existe una nota de respaldo en Obsidian?
- [ ] ¿He evitado listas de más de 3 elementos sin mnemotecnia?
- [ ] ¿El contexto es suficiente para evitar ambigüedad?

---

## Resumen: Las 10 Reglas de Oro

1. **Primero entender, luego memorizar** - Sin comprensión no hay retención
2. **Una tarjeta = un dato** - Principio de información mínima
3. **Cloze deletions son tu mejor amigo** - 80% de tus tarjetas
4. **Respuestas cortas** - Ideal < 5 palabras
5. **Imágenes cuando sea posible** - El cerebro es visual
6. **Evitar listas** - Usar mnemotecnias o cloze solapado
7. **Añadir contexto clínico** - El MIR pregunta casos, no definiciones
8. **Incluir el "por qué"** - En campo Extra, no en respuesta
9. **Editar sin miedo** - Las tarjetas evolucionan con tu conocimiento
10. **Consistencia > Perfección** - 20 tarjetas/día × 365 días = 7,300 tarjetas

---

## Fuentes

- Wozniak, P. (1999). "Effective Learning: Twenty Rules of Formulating Knowledge" - SuperMemo
- Jubbal, K. (2019). "Anki Flashcard Best Practices" - Med School Insiders
- Guía "Obsidian para Estudiar el MIR"
- Anki Manual - Deck Options & FSRS
- Comunidades r/medicalschoolanki y r/ObsidianMD

---

*Última actualización: 2025-11-30*
