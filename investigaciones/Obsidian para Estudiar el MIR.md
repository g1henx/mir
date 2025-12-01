

# **Arquitectura de Sistemas de Gestión del Conocimiento (PKM) en Obsidian para la Excelencia en la Preparación del Examen MIR**

## **1\. Introducción: El Cambio de Paradigma en la Educación Médica de Alto Rendimiento**

La preparación para el examen de Médico Interno Residente (MIR) en España representa uno de los desafíos intelectuales y mnemotécnicos más rigurosos del panorama académico global. El aspirante se enfrenta a la tarea hercúlea de asimilar, retener y, crucialmente, interrelacionar un corpus de conocimiento que abarca prácticamente la totalidad de la medicina clínica y básica moderna. Históricamente, las metodologías de estudio han estado dominadas por enfoques lineales y analógicos: el subrayado repetitivo de manuales estáticos, la elaboración de resúmenes manuscritos y la memorización bruta de listas descontextualizadas. Sin embargo, el análisis de las tendencias recientes en la evaluación del MIR 1 revela una evolución hacia preguntas de mayor complejidad clínica, donde el diagnóstico y el tratamiento no dependen de un dato aislado, sino de la integración de fisiopatología, farmacología y semiología en un escenario clínico dinámico.

En este contexto, las herramientas de Gestión del Conocimiento Personal (PKM, por sus siglas en inglés) basadas en grafos y enlaces bidireccionales, como Obsidian, emergen no solo como una alternativa tecnológica, sino como una necesidad cognitiva. A diferencia de los procesadores de texto tradicionales (Microsoft Word, Google Docs) o las aplicaciones de notas jerárquicas (Evernote, OneNote), Obsidian opera bajo principios de "pensamiento en red" que mimetizan la arquitectura neuronal del cerebro humano y, por extensión, la estructura intrínseca del conocimiento médico. Una enfermedad como el Lupus Eritematoso Sistémico no "vive" exclusivamente en la carpeta de Reumatología; tiene ramificaciones críticas en Nefrología (nefritis lúpica), Hematología (anemia hemolítica), Dermatología y Cardiología. Los sistemas de carpetas rígidos fracasan al intentar capturar esta transversalidad, mientras que un sistema basado en enlaces y *backlinks* la potencia.

Este informe técnico despliega una arquitectura exhaustiva, fundamentada en principios de neuroeducación y gestión de bases de datos, para implementar Obsidian como el entorno central de operaciones para el opositor MIR. El objetivo no es la digitalización de los apuntes, sino la creación de un "Segundo Cerebro" clínico que permita al estudiante recuperar información de alta rentabilidad instantáneamente, visualizar conexiones ocultas entre asignaturas y, lo más importante, gestionar el error y el olvido mediante sistemas automatizados de repaso espaciado y *Active Recall*.3 A lo largo de este documento, se detallarán las estructuras taxonómicas óptimas, la ingeniería de plantillas para estandarizar el aprendizaje y los flujos de trabajo que transforman el estudio pasivo en una interrogación activa constante de la materia.

### **1.1. La Carga Cognitiva y la Teoría de la Codificación Dual**

El opositor MIR se enfrenta a un problema fundamental de gestión de recursos cognitivos. La Teoría de la Carga Cognitiva sugiere que la memoria de trabajo tiene una capacidad limitada. Cuando un estudiante intenta memorizar una tabla de fármacos antihipertensivos sin comprender los mecanismos subyacentes o las conexiones con la fisiología renal, satura su memoria de trabajo con datos inconexos, lo que lleva a una retención frágil y a corto plazo.

Obsidian permite descargar parte de esta carga cognitiva mediante la "cognición extendida". Al exteriorizar las conexiones en un sistema confiable, el estudiante puede liberar recursos mentales para el procesamiento de alto nivel: el juicio clínico. Además, la capacidad de Obsidian para integrar texto, diagramas (vía Excalidraw) y esquemas conceptuales facilita la codificación dual (verbal y visual), que ha demostrado aumentar significativamente la tasa de retención en comparación con el estudio puramente textual.6 El sistema que propondremos prioriza la creación de notas atómicas —conceptos individuales e indivisibles— que actúan como ladrillos de conocimiento, permitiendo construir estructuras complejas sin colapsar la capacidad de atención del estudiante.

---

## **2\. Arquitectura de la Información: Taxonomía y Ontología para el MIR**

El diseño de la estructura de carpetas y notas es la decisión fundacional de la bóveda (vault) de Obsidian. Un error común es replicar la estructura del índice del manual de la academia (CTO, AMIR, MIR Asturias) carpeta por carpeta. Esto es contraproducente porque crea silos de información. Sin embargo, el caos total de una "caja de notas" (Zettelkasten puro) puede ser paralizante para un examen que tiene un temario cerrado y una fecha límite inamovible.

Por tanto, la arquitectura propuesta es un **Híbrido Jerárquico-Relacional**. Mantiene una estructura de carpetas de alto nivel para la organización administrativa y curricular, pero confía la organización del conocimiento médico a una red densa de enlaces (wikilinks) y metadatos (Frontmatter). Esta estructura se basa en una adaptación del método PARA (Projects, Areas, Resources, Archives) de Tiago Forte, modificado específicamente para las exigencias de la educación médica de posgrado.

### **2.1. Nivel 0: La Estructura de Directorios Raíz**

La bóveda debe mantener una raíz limpia para minimizar la fricción visual. Se recomienda la siguiente nomenclatura numerada para asegurar el ordenamiento deseado en el explorador de archivos.

| Carpeta | Propósito y Contenido | Justificación Pedagógica |
| :---- | :---- | :---- |
| 00\_Inbox | Bandeja de entrada para captura rápida durante clases o simulacros. | Evita la interrupción del flujo de estudio para decidir "dónde guardar" algo. Se procesa diariamente. |
| 10\_Planificación\_MIR | Gestión logística: calendarios, seguimiento de objetivos, estrategia. | Separa la gestión del estudio del contenido médico. Reduce la ansiedad al tener el plan visible.8 |
| 20\_Enciclopedia\_Médica | El núcleo del conocimiento (Notes). Contiene todo el saber médico. | Centraliza la información para búsquedas globales. Evita duplicados entre asignaturas superpuestas. |
| 30\_Banco\_de\_Fallos | Análisis metacognitivo de errores en simulacros y desgloses. | Convierte el error en activo de aprendizaje. Fundamental para subir percentiles.9 |
| 40\_Evaluación | Registros de simulacros, netas, percentiles y desgloses trabajados. | Monitorización del progreso cuantitativo. |
| 50\_Recursos | Material de referencia: Guías, Mnemotecnias, Atlas visuales. | Material de apoyo que no requiere memorización activa pero sí consulta rápida. |
| 99\_Sistema | Plantillas, scripts, adjuntos (imágenes, PDFs), CSS. | Mantiene la "fontanería" oculta para no distraer. |

A continuación, analizaremos en profundidad la composición interna de estas carpetas críticas.

### **2.2. Profundización en 20\_Enciclopedia\_Médica: La Disolución de los Silos**

La organización interna de esta carpeta es donde la mayoría de los estudiantes fallan. La tentación es crear una subcarpeta para cada tema: Cardiología \> Insuficiencia Cardiaca \> Tratamiento. Esto obliga a navegar cinco niveles para encontrar una nota, lo cual es ineficiente durante un repaso rápido.

La recomendación experta es **aplanar la jerarquía**. Dentro de 20\_Enciclopedia\_Médica, se deben tener carpetas solo por grandes especialidades o bloques, y dentro de ellas, las notas deben residir juntas, ordenadas alfabéticamente pero accesibles vía Búsqueda o MOCs (Mapas de Contenido).

**Estructura Sugerida:**

* 20\_Enciclopedia\_Médica/  
  * 00\_Ciencias\_Básicas (Fisiología, Inmunología, Genética, Bioquímica)  
  * 01\_Cardiología\_y\_Vascular  
  * 02\_Neumología  
  * 03\_Digestivo\_y\_Cirugía\_General  
  * 04\_Neurología  
  * 05\_Nefrología\_y\_Urología  
  * 06\_Infecciosas\_y\_Microbiología  
  * 07\_Endocrinología\_y\_Nutrición  
  * 08\_Hematología  
  * 09\_Reumatología  
  * 10\_Ginecología\_y\_Obstetricia  
  * 11\_Pediatría  
  * 12\_Psiquiatría  
  * 13\_Dermatología  
  * 14\_Otorrino\_y\_Oftalmo  
  * 15\_Otras\_Especialidades (Trauma, Preventiva, Legal)  
  * 99\_Farmacología\_General

¿Por qué Farmacología General aparte?  
Muchos fármacos (ej. corticoides, betabloqueantes, antibióticos) se usan en múltiples especialidades. Crear una nota atómica para "Gentamicina" en la carpeta 99\_Farmacología\_General permite enlazarla desde Infecciosas (tratamiento de endocarditis) y desde Nefrología (causa de fracaso renal agudo) sin duplicar la información. Esto es vital para responder preguntas de casos clínicos complejos donde el efecto adverso es la clave.1

### **2.3. El Sistema de Etiquetas (Tags) y Metadatos**

Mientras que las carpetas definen *dónde está* el archivo, las etiquetas y los metadatos definen *qué es* y *en qué estado está*. Para el MIR, necesitamos una taxonomía que nos permita filtrar por rentabilidad (Yield) y dominio.

En el encabezado YAML (Frontmatter) de cada nota, se debe incluir obligatoriamente:

YAML

\---  
aliases:  
tags:  
yield: High | Medium | Low  
status: 🔴 | 🟡 | 🟢  
last\_reviewed: YYYY-MM-DD  
\---

Taxonomía de Etiquetas (\#):  
No se debe usar etiquetas para lo que ya hacen las carpetas (no usar \#Cardiología si ya está en la carpeta Cardiología). Usar etiquetas para atributos transversales:

* \#Concepto/Fisiopatología: Notas que explican mecanismos.  
* \#Concepto/Tratamiento: Notas sobre manejo terapéutico.  
* \#Concepto/Diagnóstico: Criterios, pruebas, scores.  
* \#Entidad/Urgencia: Patologías que requieren acción inmediata (muy preguntado en MIR).  
* \#MIR/PreguntaDirecta: Datos que se preguntan literalmente (ej. "HLA B27").  
* \#MIR/CasoClínico: Notas que describen presentaciones típicas.

### **2.4. 30\_Banco\_de\_Fallos: El Motor de Mejora**

Esta carpeta no debe organizarse por asignaturas, sino cronológicamente o por simulacro. La razón es que el análisis del fallo suele hacerse en bloque tras corregir el examen.

* 30\_Banco\_de\_Fallos/  
  * Simulacro\_01/  
  * Simulacro\_02/  
  * Desgloses\_2010-2020/

Dentro de estas carpetas vivirán notas individuales para cada pregunta fallada o dudada, que actuarán como "puentes" hacia la Enciclopedia Médica, señalando las lagunas de conocimiento.

---

## **3\. Ingeniería de Plantillas (Templates) para la Estandarización del Conocimiento**

La consistencia es la clave de la velocidad en el repaso. Cuando el estudiante abre una nota sobre una enfermedad a dos semanas del examen, debe saber exactamente dónde buscar el "Tratamiento de elección" o el "Gold Standard diagnóstico". Si cada nota tiene una estructura diferente, la carga cognitiva aumenta innecesariamente.

Utilizando el plugin *Templater* 12, podemos automatizar la creación de notas con estructuras predefinidas que fuerzan al estudiante a pensar de manera clínica. A continuación, se presentan las plantillas maestras diseñadas específicamente para el examen MIR.

### **3.1. Plantilla Maestra: Disease Script (Patología)**

Esta plantilla está diseñada para modelar la enfermedad completa. Integra secciones para epidemiología, fisiopatología (breve), clínica, diagnóstico y tratamiento.

**Código de la Plantilla:**

---

## **tipo: enfermedad asignatura: yield: High status: 🔴 aliases: creado: \<% tp.file.creation\_date() %\> modificado: \<% tp.file.last\_modified\_date() %\>**

# **\<% tp.file.title %\>**

## **💡 Concepto y Definición (Flashcard)**

\[\!abstract\] Definición de Alto Rendimiento  
Resumen en una frase de la patología. Identificar palabras clave que aparecen en los casos clínicos (Buzzwords).  
Ejemplo: Vasculitis necrotizante sistémica que afecta vasos de pequeño y mediano calibre, asociada a asma y eosinofilia (Churg-Strauss).

## **📊 Epidemiología y Factores de Riesgo**

* **Perfil de Paciente:** (Edad, Sexo, Antecedentes). *Dato clave para orientar el caso clínico.*  
* **Genética/HLA:** (Si aplica). \#MIR/Genética  
* **Etiología más frecuente:**

## **⚙️ Fisiopatología Esencial**

*(Solo lo necesario para entender la clínica o el tratamiento. No extenderse).*

## **🩺 Clínica y Presentación**

| Síntoma/Signo | Frecuencia | Especificidad | Notas MIR |
| :---- | :---- | :---- | :---- |
| Síntoma Guía | Alta | Baja | Lo que motiva la consulta. |
| Signo Patognomónico | Baja | Alta | Si aparece, es diagnóstico. |

\[\!warning\] Triada/Tétrada Clásica  
Si existe, descríbela aquí. (Ej. Triada de Charcot).

## **🔬 Diagnóstico**

**Algoritmo Diagnóstico:**

1. **Prueba de Screening:** (La primera a pedir).  
2. **Prueba de Confirmación (Gold Standard):** (La definitiva).  
3. **Hallazgos de Laboratorio/Imagen:**  
   * *Analítica:*  
   * *Radiología:*

\[\!danger\] Criterios Diagnósticos  
Listar criterios mayores y menores si aplica (ej. Endocarditis, Lupus, AR).

## **💊 Tratamiento**

**Estrategia Terapéutica:**

### **1\. Medidas Generales y Soporte**

* Dieta, oxígeno, posición...

### **2\. Tratamiento Farmacológico (Escalones)**

* **Primera Línea:** \[\[Fármaco A\]\] \+\].  
* **Segunda Línea:** (Si alergia o fracaso).  
* **Mantenimiento:**

### **3\. Tratamiento Intervencionista/Quirúrgico**

\[\!check\] Indicaciones Quirúrgicas (Muy Preguntado)  
1\.  
2\.

3\.

## **🔗 Diagnóstico Diferencial**

* \]: Se diferencia por...  
* \]: Se diferencia por...

## **📝 Historial de Preguntas (Desgloses)**

* **(MIR 2022):** Preguntaron la indicación de cirugía urgente.  
* **(MIR 2018):** Se centraron en el efecto adverso del tratamiento.

---

**Referencias:**

* Manual AMIR/CTO/Asturias.  
* Guía Clínica\[Año\].

**Justificación de los Elementos:**

* **Callouts (\[\!abstract\], \[\!danger\]):** Utilizan el renderizado visual de Obsidian para destacar información crítica. En una revisión rápida ("vuelta rápida"), el estudiante puede saltar de callout en callout ignorando el texto plano.14  
* **Tabla Clínica:** Estructura la semiología. Diferencia entre lo frecuente (sensible) y lo específico, una distinción vital para las preguntas de "Señale la falsa" o "Cuál es el signo más específico".  
* **Sección Indicaciones Quirúrgicas:** En asignaturas como Digestivo, Cardiología o Traumatología, el MIR pregunta obsesivamente *cuándo operar*. Tener esta sección explícita previene el olvido de estos criterios.2

### **3.2. Plantilla Maestra: Fármaco (Farmacología Clínica)**

La farmacología no debe estudiarse como una lista telefónica, sino como herramientas con mecanismos, usos y riesgos.

**Código de la Plantilla:**

---

## **tipo: farmaco grupo\_terapeutico: yield: Medium status: 🔴**

# **\<% tp.file.title %\>**

## **⚙️ Mecanismo de Acción**

* **Diana:** (Receptor, Enzima, Canal Iónico).  
* **Efecto:** (Agonista, Antagonista, Inhibidor).

## **🎯 Indicaciones Aprobadas (Usos MIR)**

1. **Elección en:** \[\[Patología A\]\].  
2. **Alternativa en:**\] (cuando hay alergia a...).

## **☠️ Efectos Adversos (RAMs) y Toxicidad**

| Frecuentes | Graves (Idiosincrásicos) | Específicos/Curiosos |
| :---- | :---- | :---- |
| (Ej. Tos en IECAs) | (Ej. Angioedema) | (Ej. Visión azul en Sildenafilo) |

\[\!bug\] Antídoto / Manejo de Intoxicación  
Si existe antídoto específico, ponerlo aquí.

## **⛔ Contraindicaciones e Interacciones**

* **Absolutas:** Embarazo (Categoría X), Insuficiencia Renal...  
* **Interacciones Clave:** (Ej. No mezclar con nitratos).

## **💡 Perlas Clínicas**

* *Dato:* Vida media, vía de eliminación (si es relevante para insuficiencia renal/hepática).

### **3.3. Plantilla Maestra: Registro de Fallo (Error Log)**

Esta plantilla transforma la frustración del error en un análisis racional.

**Código de la Plantilla:**

---

## **tipo: fallo fecha: \<% tp.file.creation\_date() %\> origen: asignatura: tema\_vinculado: \[\[Nota de la Enfermedad\]\] causa:**

# **Análisis de Fallo: \<% tp.file.title %\>**

## **❓ Contexto de la Pregunta**

*Resumen brevísimo del escenario clínico.*

Paciente joven con dolor torácico que mejora al inclinarse hacia delante...

## **❌ Mi Error**

* **Respondí:** Opción B (Pericarditis Urémica).  
* **Por qué:** Me centré en el antecedente renal y obvié la fiebre. (Sesgo de anclaje).

## **✅ La Verdad (Corrección)**

* **Correcta:** Opción C (Pericarditis Viral).  
* **Explicación:** En jóvenes la causa más frecuente es viral, la uremia requiere niveles más altos de urea...

## **🧠 Acción de Mejora (Gap Analysis)**

* \[ \] He actualizado la nota \[\[Pericarditis Aguda\]\] añadiendo el criterio diferencial.  
* \[ \] He creado una flashcard en Anki sobre "Pericarditis Urémica vs Viral".

\[\!quote\] Lección Aprendida  
"No asumir uremia solo por antecedente renal si la clínica infecciosa es florida."

---

## **4\. Flujo de Trabajo (Workflow) por Fases de Estudio**

La preparación del MIR es dinámica. El uso de Obsidian debe evolucionar conforme avanza el curso.

### **4.1. Fase 1: Construcción y Comprensión (Primera Vuelta)**

*Objetivo:* Entender la medicina, estructurar la bóveda y crear las notas base.

* **Durante la clase/estudio:**  
  * No transcribir el manual. Leer un epígrafe, cerrar el libro y crear la nota en Obsidian usando la plantilla *Disease Script*.  
  * Este esfuerzo de recuperación ("Generación") es mucho más potente que copiar.4  
  * **Enlazado Inmediato:** Al escribir sobre "Tratamiento de la Tuberculosis", crear enlaces a \[\[Isoniazida\]\],\], \[\[Etambutol\]\]. Aunque las notas de los fármacos estén vacías (placeholders), los enlaces ya crean la estructura.  
  * **Imágenes:** Usar la herramienta de recorte para pegar esquemas clave del manual directamente en la nota. No perder tiempo transcribiendo tablas complejas (TNM oncológicos), mejor pegarlas como imagen y añadir un resumen de lo preguntable.

### **4.2. Fase 2: Consolidación y Conexión (Segunda Vuelta)**

*Objetivo:* Memorización activa y resolución de desgloses.

* **Estudio con Desgloses:**  
  * Al hacer preguntas de años anteriores, cada vez que se falle una pregunta o se acierte por azar, se debe ir a la nota correspondiente en Obsidian.  
  * **Enriquecimiento:** Añadir un tag \#MIR/Preguntado a la sección que se preguntó. Ejemplo: Si preguntaron la dosis de Adrenalina en anafilaxia, ir a la nota \[\[Anafilaxia\]\] y en Tratamiento resaltar la dosis con negrita y el icono ⚠️.  
* **Uso de Grafos Locales:**  
  * Al estudiar un tema, abrir el "Gráfico Local" (Local Graph) con profundidad 1 o 2\. Esto permite ver visualmente qué fármacos o patologías están relacionadas con lo que se estudia, facilitando el repaso incidental.

### **4.3. Fase 3: Alto Rendimiento y Repaso Exprés (Tercera/Cuarta Vuelta)**

*Objetivo:* Velocidad y repaso de fallos.

* **Dashboard de Rentabilidad:**  
  * Usar *Dataview* para generar listas automáticas de estudio. El estudiante no decide qué estudiar; el sistema se lo dice.  
  * *Query:* "Muéstrame todas las notas con yield: High y status: 🔴 de la asignatura Cardiología".  
* **Sesiones de "Solo Fallos":**  
  * Revisar exclusivamente la carpeta 30\_Banco\_de\_Fallos. Leer la sección "Lección Aprendida" de cada nota de fallo. Esto previene repetir los mismos errores, que es lo que más penaliza en el examen.

---

## **5\. Estrategias Específicas por Asignatura y Rentabilidad**

El análisis bibliográfico de la rentabilidad MIR 2 dicta que no todas las asignaturas merecen el mismo nivel de detalle en Obsidian.

### **5.1. Asignaturas de "Oro" (Cardiología, Digestivo, Neumología, Infecciosas)**

Estas asignaturas acumulan el mayor número de preguntas y casos clínicos.

* **Estrategia Obsidian:**  
  * Nivel de detalle máximo en las notas.  
  * Uso intensivo de **Tablas Comparativas**. Obsidian soporta tablas Markdown que son ideales para el diagnóstico diferencial.  
  * *Ejemplo:* Una tabla comparando las Hepatitis Virales (A, B, C, D, E) con columnas para: Mecanismo de transmisión, Cronificación (%), Tratamiento y Profilaxis.  
  * **Excalidraw:** Dibujar los ciclos (ej. Ciclo Cardíaco, Ejes hormonales). La memoria visual espacial es clave aquí.

### **5.2. Asignaturas Visuales (Dermatología, Oftalmología, Radiología)**

* **Estrategia Obsidian:**  
  * Prioridad a los **Adjuntos Visuales**.  
  * Uso del plugin *Image Gallery* o simplemente incrustar imágenes (\!\[\[imagen.png\]\]) en el callout de "Clínica".  
  * Crear una nota tipo "Atlas" para Dermatología que sea solo una galería de lesiones elementales enlazadas a sus enfermedades.

### **5.3. Asignaturas de Datos/Fórmulas (Estadística, Epidemiología, Preventiva)**

* **Estrategia Obsidian:**  
  * Estas asignaturas son de "reglas fijas".  
  * Usar bloques de código LaTeX para las fórmulas (Obsidian soporta MathJax nativamente).  
  * Ejemplo:

    $$Sensibilidad \= \\frac{VP}{VP \+ FN}$$  
  * Crear una nota maestra llamada\] que actúe como "chuleta" para repasar el día antes del simulacro.

---

## **6\. Implementación Técnica: Plugins y Automatización**

Para que este sistema funcione fluidamente, se recomienda un conjunto seleccionado de plugins comunitarios (Community Plugins). La regla es: "Instalar solo lo que ahorre tiempo o mejore la recuperación".

### **6.1. Dataview (El Cerebro Analítico)**

Esencial para interrogar a la base de datos. Transforma Obsidian de una libreta a un CRM de conocimiento.

Caso de Uso 1: El Tablero de Mando Diario (Dashboard)  
Crear una nota Dashboard\_MIR.md en la raíz con el siguiente código:

Fragmento de código

TABLE without id file.link as "Tema", status as "Estado", last\_reviewed as "Último Repaso"  
FROM "20\_Enciclopedia\_Médica"  
WHERE yield \= "High" AND (status \= "🔴" OR status \= "🟡")  
SORT last\_reviewed ASC  
LIMIT 20

*Interpretación:* Esto muestra una tabla dinámica con los 20 temas de Alta Rentabilidad que están marcados como "No dominados" o "A repasar", ordenados por la fecha más antigua de revisión. Es la "Lista de Tareas de Estudio" automática.

### **6.2. Templater (La Fábrica de Notas)**

Permite insertar las plantillas definidas en la sección 3 con lógica programática.

* Configuración: Asignar la carpeta 99\_Sistema/Plantillas como origen.  
* Activar "Trigger Templater on new file creation" para carpetas específicas (ej. si creo una nota en Banco\_de\_Fallos, que aplique automáticamente la plantilla de fallo).

### **6.3. Obsidian to Anki / Spaced Repetition (El Puente de Memoria)**

Aunque Obsidian es excelente para *entender*, Anki es superior para *memorizar datos puros* (cifras, nombres, dosis).

* **Plugin:** *Obsidian\_to\_Anki* o *Flashcards*.  
* **Flujo:** En la nota de Obsidian, se escriben las preguntas así:  
  * ¿Cuál es el tratamiento de elección de la Pericarditis? \#flashcard  
  * AINEs a dosis altas \+ Colchicina.  
* El plugin escanea la bóveda, extrae estas preguntas y las envía a los mazos de Anki correspondientes, manteniendo la sincronización. Si se edita en Obsidian, se actualiza en Anki.19

### **6.4. Excalidraw**

Permite dibujar esquemas a mano alzada (con tablet) o diagramas de flujo directamente dentro de Obsidian.

* Los archivos .excalidraw deben guardarse en 99\_Sistema/Adjuntos.  
* Son editables posteriormente, a diferencia de una imagen pegada.

---

## **7\. Análisis de Errores Comunes y Mitigación**

Al implementar este sistema, los opositores suelen caer en trampas conocidas. Identificarlas a tiempo es vital.

| Error Común | Impacto Negativo | Solución Propuesta |
| :---- | :---- | :---- |
| **La Falacia del Coleccionista** | Pasar horas "embelleciendo" notas y configurando plugins en lugar de estudiar. | Regla del 80/20. Usar plantillas mínimas viables. Si una nota es fea pero contiene el dato clave, es válida. Estudiar primero, formatear después. |
| **Sobre-fragmentación** | Crear notas demasiado pequeñas (ej. una nota solo para "Dosis de Paracetamol"). | Mantener la **Atomicidad Funcional**. La unidad mínima debe ser la Patología o el Fármaco completo, no el dato aislado. |
| **Desconexión del Manual** | Usar Obsidian como única fuente y olvidar el manual de referencia de la academia. | Obsidian es para *procesar* y *conectar*. El manual sigue siendo la fuente de verdad canónica. Citar siempre la página del manual en la nota. |
| **Abandono del Error Log** | Rellenar el registro de fallos pero nunca releerlo. | Programar una sesión semanal de "Lectura de Fallos" (ej. Domingos por la tarde). Usar Dataview para reflotar fallos antiguos. |

### **7.1. El Dilema del Tiempo**

Muchos estudiantes temen que crear estas notas lleve demasiado tiempo.

* **Realidad:** Escribir y estructurar es estudiar. El tiempo invertido en crear la nota *es* tiempo de estudio activo de alta calidad. Sin embargo, en la recta final (último mes), se debe detener la creación de nuevas notas y pasar al modo "Solo Lectura/Repaso" de lo ya construido.

---

## **8\. Conclusión**

La implementación de Obsidian para la preparación del examen MIR no es simplemente una actualización tecnológica; es una reingeniería del proceso de aprendizaje. Al adoptar una **arquitectura híbrida de carpetas y enlaces**, el estudiante trasciende la linealidad de los manuales tradicionales para construir una base de conocimiento que refleja la interconectividad real de la medicina clínica.

Las **plantillas estructuradas** (Disease Script, Pharmacology Matrix) aseguran que el estudio sea sistemático y completo, evitando lagunas de información en temas de alta rentabilidad. La integración del **Banco de Fallos** transforma el error —inevitable en el proceso de entrenamiento— en la herramienta más potente de personalización del estudio, permitiendo atacar quirúrgicamente las debilidades individuales.

Finalmente, el uso de **metadatos y plugins como Dataview** permite una gestión objetiva del progreso, basando las decisiones de estudio diario no en la intuición o el miedo, sino en datos concretos sobre el estado de dominio de cada materia. En un examen donde una sola neta puede significar la diferencia entre obtener la plaza deseada o no, la eficiencia cognitiva que proporciona este sistema PKM representa una ventaja competitiva determinante. El éxito en el MIR no pertenece al que más horas estudia, sino al que mejor gestiona, recupera y aplica su conocimiento; y para ese fin, la arquitectura aquí presentada ofrece el andamiaje definitivo.

#### **Obras citadas**

1. El examen MIR 2025, completo: todas las respuestas corregidas \- Redacción Médica, fecha de acceso: noviembre 29, 2025, [https://www.redaccionmedica.com/secciones/formacion/examen-mir-2025-al-completo-todas-las-preguntas-publicadas-por-sanidad-5904](https://www.redaccionmedica.com/secciones/formacion/examen-mir-2025-al-completo-todas-las-preguntas-publicadas-por-sanidad-5904)  
2. Cardiología, neurología y cirugía general: las asignaturas más preguntadas en el examen MIR 2025 \- iSanidad, fecha de acceso: noviembre 29, 2025, [https://isanidad.com/318163/cardiologia-neurologia-y-cirugia-general-las-asignaturas-mas-preguntadas-en-el-examen-mir-2025/](https://isanidad.com/318163/cardiologia-neurologia-y-cirugia-general-las-asignaturas-mas-preguntadas-en-el-examen-mir-2025/)  
3. The Absolute State of \[\[Spaced Repetition\]\] In Obsidian | Anki, Plugins,... : r/ObsidianMD \- Reddit, fecha de acceso: noviembre 29, 2025, [https://www.reddit.com/r/ObsidianMD/comments/lpsd2s/the\_absolute\_state\_of\_spaced\_repetition\_in/](https://www.reddit.com/r/ObsidianMD/comments/lpsd2s/the_absolute_state_of_spaced_repetition_in/)  
4. A Med Student's perspective on Obsidian : r/ObsidianMD \- Reddit, fecha de acceso: noviembre 29, 2025, [https://www.reddit.com/r/ObsidianMD/comments/1f9q6pv/a\_med\_students\_perspective\_on\_obsidian/](https://www.reddit.com/r/ObsidianMD/comments/1f9q6pv/a_med_students_perspective_on_obsidian/)  
5. How I Ace my Exams Using Logseq and Obsidian (Medical School) \- YouTube, fecha de acceso: noviembre 29, 2025, [https://www.youtube.com/watch?v=hykAwCWfVoI](https://www.youtube.com/watch?v=hykAwCWfVoI)  
6. Cómo hago mis apuntes de medicina | preparación MIR 2023 Y ENAM 2021 \- YouTube, fecha de acceso: noviembre 29, 2025, [https://www.youtube.com/watch?v=kUBTGh5q5jA](https://www.youtube.com/watch?v=kUBTGh5q5jA)  
7. Suggestion for obsidian template to use during the exam : r/oscp \- Reddit, fecha de acceso: noviembre 29, 2025, [https://www.reddit.com/r/oscp/comments/1oed6sm/suggestion\_for\_obsidian\_template\_to\_use\_during/](https://www.reddit.com/r/oscp/comments/1oed6sm/suggestion_for_obsidian_template_to_use_during/)  
8. Flujo de trabajo en Obsidian para gestionar proyectos \- YouTube, fecha de acceso: noviembre 29, 2025, [https://www.youtube.com/watch?v=pKP0h10deDM](https://www.youtube.com/watch?v=pKP0h10deDM)  
9. Cómo hacer un simulacro MIR completo en PROMIR paso a paso \- YouTube, fecha de acceso: noviembre 29, 2025, [https://www.youtube.com/watch?v=cYv1vvQy2hk](https://www.youtube.com/watch?v=cYv1vvQy2hk)  
10. MIR \- DESGLOSES parte 1 | Qué son, 1a vuelta, 2a vuelta \#MIR2021 \#OPOSICIÓN \#MEDICINA \- YouTube, fecha de acceso: noviembre 29, 2025, [https://www.youtube.com/watch?v=\_7Q3aVfOa1Q](https://www.youtube.com/watch?v=_7Q3aVfOa1Q)  
11. Desgloses MIR 2010-2021 \- Grupo CTO Colombia, fecha de acceso: noviembre 29, 2025, [https://www.grupocto.co/curso/desgloses-mir-2010-2021/](https://www.grupocto.co/curso/desgloses-mir-2010-2021/)  
12. blue-pho3nix/pentesting\_templates\_obsidian: Obsidian Templates for OSCP, CPTS, and Training labs \- GitHub, fecha de acceso: noviembre 29, 2025, [https://github.com/blue-pho3nix/pentesting\_templates\_obsidian](https://github.com/blue-pho3nix/pentesting_templates_obsidian)  
13. Templater Error Handling \- Help \- Obsidian Forum, fecha de acceso: noviembre 29, 2025, [https://forum.obsidian.md/t/templater-error-handling/53627](https://forum.obsidian.md/t/templater-error-handling/53627)  
14. Callouts \- Obsidian Help, fecha de acceso: noviembre 29, 2025, [https://help.obsidian.md/callouts](https://help.obsidian.md/callouts)  
15. Pro Tip: Use Call-outs : r/ObsidianMD \- Reddit, fecha de acceso: noviembre 29, 2025, [https://www.reddit.com/r/ObsidianMD/comments/1jdxcwq/pro\_tip\_use\_callouts/](https://www.reddit.com/r/ObsidianMD/comments/1jdxcwq/pro_tip_use_callouts/)  
16. ¿Sobre qué especialidad se preguntó más en el examen MIR? \- iSanidad, fecha de acceso: noviembre 29, 2025, [https://isanidad.com/270910/especialidad-mas-preguntada-mir/](https://isanidad.com/270910/especialidad-mas-preguntada-mir/)  
17. Análisis de la influencia del baremo en la prueba para médico interno residente (MIR) e impacto de su modificación \- Elsevier, fecha de acceso: noviembre 29, 2025, [https://www.elsevier.es/es-revista-educacion-medica-71-articulo-analisis-influencia-del-baremo-prueba-S157518132500110X](https://www.elsevier.es/es-revista-educacion-medica-71-articulo-analisis-influencia-del-baremo-prueba-S157518132500110X)  
18. Analizando el examen MIR 2022: ¿un examen difícil? \- Mirial, fecha de acceso: noviembre 29, 2025, [https://mirial.es/blog/apuntes-medicina/132-analizando-el-examen-mir-2022-un-examen-dificil](https://mirial.es/blog/apuntes-medicina/132-analizando-el-examen-mir-2022-un-examen-dificil)  
19. Best Plugins for Spaced Repetition and Active Recall in Obsidian, fecha de acceso: noviembre 29, 2025, [https://www.obsidianstats.com/posts/2025-05-01-spaced-repetition-plugins](https://www.obsidianstats.com/posts/2025-05-01-spaced-repetition-plugins)