#!/usr/bin/env python3
"""
Generador de Plan de Estudio MIR CTO
=====================================
200 sesiones totales:
- 1ª vuelta: más lenta (más páginas por sesión pero menor velocidad de lectura)
- 2ª vuelta: más rápida (revisión)
Sin cortar capítulos entre sesiones.
"""

import json
import os
from pathlib import Path

def load_all_chapters():
    """Carga todos los capítulos de todos los manuales"""
    chapters = []
    base_path = Path("/Users/gn1ra/Desktop/manuales_mir_cto")

    for json_file in sorted(base_path.glob("*.json")):
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            manual_name = data['nombre']
            for cap in data['capitulos']:
                chapters.append({
                    'manual': manual_name,
                    'manual_file': json_file.stem,
                    'capitulo_num': cap['numero'],
                    'capitulo_nombre': cap['nombre'],
                    'total_paginas': cap['total_paginas']
                })

    return chapters

def distribute_chapters_to_sessions(chapters, num_sessions, target_pages_per_session):
    """
    Distribuye capítulos en sesiones sin cortarlos.
    Intenta acercarse al target de páginas por sesión.
    """
    sessions = []
    current_session = {'chapters': [], 'pages': 0}

    for chapter in chapters:
        pages = chapter['total_paginas']

        # Si añadir este capítulo supera mucho el target y ya tenemos algo en la sesión
        if current_session['pages'] > 0 and current_session['pages'] + pages > target_pages_per_session * 1.5:
            # Guardar sesión actual y empezar nueva
            sessions.append(current_session)
            current_session = {'chapters': [], 'pages': 0}

        # Añadir capítulo a la sesión actual
        current_session['chapters'].append(chapter)
        current_session['pages'] += pages

        # Si alcanzamos o superamos el target, cerrar sesión
        if current_session['pages'] >= target_pages_per_session:
            sessions.append(current_session)
            current_session = {'chapters': [], 'pages': 0}

    # Añadir última sesión si tiene contenido
    if current_session['chapters']:
        sessions.append(current_session)

    return sessions

def optimize_distribution(chapters, num_sessions):
    """
    Optimiza la distribución de capítulos en sesiones.
    Usa bin-packing para distribuir equitativamente.
    """
    total_pages = sum(c['total_paginas'] for c in chapters)
    target = total_pages / num_sessions

    sessions = []
    current_session = {'chapters': [], 'pages': 0}

    for chapter in chapters:
        pages = chapter['total_paginas']

        # Decidir si añadir a sesión actual o empezar nueva
        current_diff = abs(current_session['pages'] - target)
        new_diff = abs(current_session['pages'] + pages - target)

        if current_session['pages'] > 0 and new_diff > current_diff and current_session['pages'] >= target * 0.6:
            # Mejor cerrar la sesión actual
            sessions.append(current_session)
            current_session = {'chapters': [chapter], 'pages': pages}
        else:
            # Añadir a sesión actual
            current_session['chapters'].append(chapter)
            current_session['pages'] += pages

        # Si llegamos al límite de sesiones, ajustar
        remaining_chapters = len(chapters) - (sum(len(s['chapters']) for s in sessions) + len(current_session['chapters']))
        remaining_sessions = num_sessions - len(sessions) - 1

        if remaining_sessions > 0 and remaining_chapters > 0:
            # Recalcular target para sesiones restantes
            remaining_pages = sum(c['total_paginas'] for c in chapters[-(remaining_chapters):])
            target = remaining_pages / remaining_sessions if remaining_sessions > 0 else target

    if current_session['chapters']:
        sessions.append(current_session)

    return sessions

def greedy_balanced_distribution(chapters, num_sessions):
    """
    Distribución greedy balanceada: asigna capítulos intentando mantener
    las sesiones lo más equilibradas posible.
    """
    total_pages = sum(c['total_paginas'] for c in chapters)
    ideal_per_session = total_pages / num_sessions

    sessions = [{'chapters': [], 'pages': 0} for _ in range(num_sessions)]

    # Asignación secuencial respetando orden de estudio
    session_idx = 0
    for chapter in chapters:
        pages = chapter['total_paginas']

        sessions[session_idx]['chapters'].append(chapter)
        sessions[session_idx]['pages'] += pages

        # Decidir si pasar a siguiente sesión
        if session_idx < num_sessions - 1:
            current_pages = sessions[session_idx]['pages']
            # Pasar a siguiente si superamos el ideal y aún quedan capítulos
            if current_pages >= ideal_per_session * 0.8:
                session_idx += 1

    # Filtrar sesiones vacías
    sessions = [s for s in sessions if s['chapters']]

    return sessions

def first_fit_decreasing(chapters, num_sessions):
    """
    Variante de First Fit que mantiene el orden pero agrupa mejor.
    """
    total_pages = sum(c['total_paginas'] for c in chapters)
    max_per_session = (total_pages / num_sessions) * 1.3  # 30% margen

    sessions = []
    current_session = {'chapters': [], 'pages': 0}

    chapters_remaining = len(chapters)
    sessions_remaining = num_sessions

    for i, chapter in enumerate(chapters):
        pages = chapter['total_paginas']
        chapters_remaining = len(chapters) - i - 1

        # Páginas restantes después de este capítulo
        remaining_pages = sum(c['total_paginas'] for c in chapters[i+1:])

        current_session['chapters'].append(chapter)
        current_session['pages'] += pages

        # Calcular si debemos cerrar la sesión
        sessions_after_this = num_sessions - len(sessions) - 1

        if sessions_after_this > 0 and chapters_remaining > 0:
            avg_remaining = remaining_pages / sessions_after_this

            # Cerrar si ya tenemos suficiente y hay que dejar para otras sesiones
            if current_session['pages'] >= avg_remaining * 0.7:
                sessions.append(current_session)
                current_session = {'chapters': [], 'pages': 0}

    if current_session['chapters']:
        sessions.append(current_session)

    return sessions

def calculate_study_plan():
    """Calcula el plan de estudio completo"""
    chapters = load_all_chapters()
    total_pages = sum(c['total_paginas'] for c in chapters)
    total_chapters = len(chapters)

    print("=" * 80)
    print("ANÁLISIS DEL TEMARIO MIR CTO")
    print("=" * 80)
    print(f"\nTotal de manuales: 22")
    print(f"Total de capítulos: {total_chapters}")
    print(f"Total de páginas: {total_pages}")
    print(f"\nSesiones disponibles: 200")
    print(f"  - 2 vueltas al temario completo")
    print(f"  - 1ª vuelta: estudio detallado (más lento)")
    print(f"  - 2ª vuelta: repaso rápido (más rápido)")

    # Distribución de sesiones: 60% primera vuelta, 40% segunda vuelta
    # Primera vuelta más lenta = más sesiones para mismas páginas
    sessions_vuelta1 = 120  # 60% de 200
    sessions_vuelta2 = 80   # 40% de 200

    pages_per_session_v1 = total_pages / sessions_vuelta1
    pages_per_session_v2 = total_pages / sessions_vuelta2

    print(f"\n--- DISTRIBUCIÓN DE SESIONES ---")
    print(f"1ª Vuelta: {sessions_vuelta1} sesiones ({total_pages} págs / {sessions_vuelta1} = {pages_per_session_v1:.1f} págs/sesión)")
    print(f"2ª Vuelta: {sessions_vuelta2} sesiones ({total_pages} págs / {sessions_vuelta2} = {pages_per_session_v2:.1f} págs/sesión)")

    # Generar distribución para primera vuelta
    print("\n" + "=" * 80)
    print("PRIMERA VUELTA - ESTUDIO DETALLADO")
    print("=" * 80)

    vuelta1 = first_fit_decreasing(chapters.copy(), sessions_vuelta1)

    vuelta1_stats = {
        'min': min(s['pages'] for s in vuelta1),
        'max': max(s['pages'] for s in vuelta1),
        'avg': sum(s['pages'] for s in vuelta1) / len(vuelta1)
    }

    print(f"\nSesiones generadas: {len(vuelta1)}")
    print(f"Páginas por sesión: mín={vuelta1_stats['min']}, máx={vuelta1_stats['max']}, media={vuelta1_stats['avg']:.1f}")

    # Generar distribución para segunda vuelta
    print("\n" + "=" * 80)
    print("SEGUNDA VUELTA - REPASO RÁPIDO")
    print("=" * 80)

    vuelta2 = first_fit_decreasing(chapters.copy(), sessions_vuelta2)

    vuelta2_stats = {
        'min': min(s['pages'] for s in vuelta2),
        'max': max(s['pages'] for s in vuelta2),
        'avg': sum(s['pages'] for s in vuelta2) / len(vuelta2)
    }

    print(f"\nSesiones generadas: {len(vuelta2)}")
    print(f"Páginas por sesión: mín={vuelta2_stats['min']}, máx={vuelta2_stats['max']}, media={vuelta2_stats['avg']:.1f}")

    return vuelta1, vuelta2, chapters

def print_detailed_plan(vuelta1, vuelta2):
    """Imprime el plan detallado"""

    print("\n" + "=" * 80)
    print("PLAN DETALLADO - PRIMERA VUELTA")
    print("=" * 80)

    session_num = 1
    for session in vuelta1:
        chapters_str = ", ".join([f"{c['manual']} Cap.{c['capitulo_num']}" for c in session['chapters']])
        print(f"\nSesión {session_num:3d} | {session['pages']:3d} págs | {chapters_str}")
        session_num += 1

    print("\n" + "=" * 80)
    print("PLAN DETALLADO - SEGUNDA VUELTA")
    print("=" * 80)

    for session in vuelta2:
        chapters_str = ", ".join([f"{c['manual']} Cap.{c['capitulo_num']}" for c in session['chapters']])
        print(f"\nSesión {session_num:3d} | {session['pages']:3d} págs | {chapters_str}")
        session_num += 1

def export_to_json(vuelta1, vuelta2):
    """Exporta el plan a JSON"""
    plan = {
        'resumen': {
            'total_sesiones': len(vuelta1) + len(vuelta2),
            'sesiones_vuelta1': len(vuelta1),
            'sesiones_vuelta2': len(vuelta2),
            'paginas_totales_por_vuelta': sum(s['pages'] for s in vuelta1)
        },
        'vuelta1': {
            'descripcion': 'Estudio detallado - ritmo lento',
            'paginas_por_sesion_media': sum(s['pages'] for s in vuelta1) / len(vuelta1),
            'sesiones': []
        },
        'vuelta2': {
            'descripcion': 'Repaso rápido - ritmo acelerado',
            'paginas_por_sesion_media': sum(s['pages'] for s in vuelta2) / len(vuelta2),
            'sesiones': []
        }
    }

    session_global = 1
    for i, session in enumerate(vuelta1, 1):
        plan['vuelta1']['sesiones'].append({
            'numero_sesion_global': session_global,
            'numero_sesion_vuelta': i,
            'total_paginas': session['pages'],
            'capitulos': [{
                'manual': c['manual'],
                'capitulo_numero': c['capitulo_num'],
                'capitulo_nombre': c['capitulo_nombre'],
                'paginas': c['total_paginas']
            } for c in session['chapters']]
        })
        session_global += 1

    for i, session in enumerate(vuelta2, 1):
        plan['vuelta2']['sesiones'].append({
            'numero_sesion_global': session_global,
            'numero_sesion_vuelta': i,
            'total_paginas': session['pages'],
            'capitulos': [{
                'manual': c['manual'],
                'capitulo_numero': c['capitulo_num'],
                'capitulo_nombre': c['capitulo_nombre'],
                'paginas': c['total_paginas']
            } for c in session['chapters']]
        })
        session_global += 1

    output_path = Path("/Users/gn1ra/Desktop/manuales_mir_cto/plan_estudio_200_sesiones.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(plan, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Plan exportado a: {output_path}")
    return plan

if __name__ == "__main__":
    vuelta1, vuelta2, chapters = calculate_study_plan()
    print_detailed_plan(vuelta1, vuelta2)
    export_to_json(vuelta1, vuelta2)
