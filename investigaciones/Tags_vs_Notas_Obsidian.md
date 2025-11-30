# Tags vs Notas en Obsidian para MIR

## Pregunta Clave
Para relacionar conceptos como "esto sube el Potasio" o "causa hipertensión" y ver todos los fármacos/enfermedades que causan algo juntos: ¿Tags o Notas?

---

## Análisis Comparativo

| Método | Pros | Contras |
|--------|------|---------|
| **Tags** `#Efecto/HiperK` | Búsqueda instantánea, Dataview compatible, jerárquicos, transitivos | Sin contexto, no explica el "por qué" |
| **Notas Hub/MOC** `[[Causas de Hiperpotasemia]]` | Añade contexto, visualiza en grafo como hub, es documento completo | Requiere mantenimiento manual |

---

## Recomendación: Sistema Híbrido

### 1. Tags para Filtrado Rápido

Usar tags jerárquicos para efectos/causas comunes:

```
#Efecto/HiperK
#Efecto/HipoK
#Efecto/HTA
#Efecto/HipoTA
#Efecto/Bradicardia
#Efecto/Taquicardia
#Efecto/Nefrotoxicidad
#Efecto/Hepatotoxicidad
#Efecto/Ototoxicidad
#Efecto/QTlargo
#Efecto/Fotosensibilidad
#Efecto/Ginecomastia
#Causa/Acidosis
#Causa/Alcalosis
```

### 2. Implementación en Notas de Fármacos

En tu nota de `[[Espironolactona]]`:

```yaml
---
tipo: farmaco
grupo_terapeutico: Diurético ahorrador de K
yield: High
status: 🔴
tags:
  - Efecto/HiperK
  - Efecto/Ginecomastia
  - Efecto/Acidosis
---
```

### 3. Notas Hub para Contexto (Opcional pero Útil)

Crear `[[MOC - Causas de Hiperpotasemia]]`:

```markdown
# Causas de Hiperpotasemia

## Fármacos
- [[Espironolactona]] - Antagonista aldosterona → ↓ excreción K
- [[IECA]] - ↓ Aldosterona
- [[ARA-II]] - ↓ Aldosterona
- [[Trimetoprim]] - Bloquea canales Na en túbulo colector
- [[Heparina]] - Inhibe síntesis aldosterona
- [[AINE]] - ↓ Renina → ↓ Aldosterona

## Enfermedades
- [[Insuficiencia Renal]] - ↓ Filtración de K
- [[Enfermedad de Addison]] - ↓ Aldosterona
- [[Acidosis Tubular Renal tipo IV]]

## Query Automático
\```dataview
LIST FROM #Efecto/HiperK
SORT file.name ASC
\```
```

---

## Queries Dataview Útiles

### Ver todos los fármacos que causan un efecto:
```dataview
TABLE grupo_terapeutico as "Grupo", mecanismo as "Mecanismo"
FROM "99_Farmacología_General"
WHERE contains(tags, "Efecto/HiperK")
SORT file.name ASC
```

### Ver todos los efectos de un grupo terapéutico:
```dataview
TABLE tags as "Efectos"
FROM "99_Farmacología_General"
WHERE grupo_terapeutico = "Diurético"
```

### Contar fármacos por efecto adverso:
```dataview
TABLE length(rows) as "Cantidad"
FROM "99_Farmacología_General"
FLATTEN tags as tag
WHERE startswith(tag, "Efecto/")
GROUP BY tag
SORT length(rows) DESC
```

---

## ¿Por Qué Híbrido?

La guía de Obsidian para MIR recomienda:

> "No usar tags para lo que ya hacen las carpetas. Usar tags para **atributos transversales**."

Los efectos adversos y las causas de síndromes son exactamente eso: **atributos que cruzan múltiples asignaturas**.

### Ventajas del Sistema Híbrido:

1. **Filtrado instantáneo**: Click en tag → ver todos los fármacos con ese efecto
2. **Contexto cuando lo necesitas**: La nota Hub explica el "por qué"
3. **Grafo visual**: Los hubs aparecen como nodos grandes conectando múltiples notas
4. **Dataview potente**: Queries automáticas que se actualizan solas
5. **Transitivo**: Buscar `#Efecto` muestra TODOS los efectos; buscar `#Efecto/HiperK` solo hiperpotasemia

---

## Lista de Tags Transversales Recomendados para MIR

### Efectos Adversos Comunes
```
#Efecto/HiperK
#Efecto/HipoK
#Efecto/HiperNa
#Efecto/HipoNa
#Efecto/HiperCa
#Efecto/HipoCa
#Efecto/HTA
#Efecto/HipoTA
#Efecto/Bradicardia
#Efecto/Taquicardia
#Efecto/QTlargo
#Efecto/Nefrotoxicidad
#Efecto/Hepatotoxicidad
#Efecto/Ototoxicidad
#Efecto/Mielosupresion
#Efecto/Fotosensibilidad
#Efecto/Ginecomastia
#Efecto/Lupus-like
#Efecto/StevenJohnson
#Efecto/Teratogeno
```

### Causas de Síndromes
```
#Causa/FRA
#Causa/Acidosis
#Causa/Alcalosis
#Causa/SIADH
#Causa/DiabetesInsipida
#Causa/Pancreatitis
#Causa/Rabdomiolisis
#Causa/Neumonia
#Causa/Meningitis
```

### Interacciones
```
#Interaccion/CYP3A4
#Interaccion/CYP2D6
#Interaccion/Warfarina
#Interaccion/Litio
```

---

## Fuentes

- Obsidian Forum: "A Guide On Links vs. Tags In Obsidian"
- Guía "Obsidian para Estudiar el MIR"
- Reddit r/ObsidianMD: Discusiones sobre tags en contexto académico

---

*Última actualización: 2025-11-30*
