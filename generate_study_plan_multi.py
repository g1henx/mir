#!/usr/bin/env python3
"""
Generador de Plan de Estudio MIR CTO - Múltiples configuraciones
"""

import json
from pathlib import Path

def load_all_chapters():
    """Carga todos los capítulos de todos los manuales"""
    chapters = []
    base_path = Path("/Users/gn1ra/Desktop/manuales_mir_cto")

    for json_file in sorted(base_path.glob("[0-9]*.json")):
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

def first_fit_decreasing(chapters, num_sessions):
    """
    Distribuye capítulos en sesiones sin cortarlos.
    """
    total_pages = sum(c['total_paginas'] for c in chapters)

    sessions = []
    current_session = {'chapters': [], 'pages': 0}

    chapters_remaining = len(chapters)

    for i, chapter in enumerate(chapters):
        pages = chapter['total_paginas']
        chapters_remaining = len(chapters) - i - 1
        remaining_pages = sum(c['total_paginas'] for c in chapters[i+1:])

        current_session['chapters'].append(chapter)
        current_session['pages'] += pages

        sessions_after_this = num_sessions - len(sessions) - 1

        if sessions_after_this > 0 and chapters_remaining > 0:
            avg_remaining = remaining_pages / sessions_after_this
            if current_session['pages'] >= avg_remaining * 0.7:
                sessions.append(current_session)
                current_session = {'chapters': [], 'pages': 0}

    if current_session['chapters']:
        sessions.append(current_session)

    return sessions

def generate_plan(total_sessions, ratio_v1=0.6):
    """Genera plan para un número específico de sesiones"""
    chapters = load_all_chapters()
    total_pages = sum(c['total_paginas'] for c in chapters)

    sessions_vuelta1 = int(total_sessions * ratio_v1)
    sessions_vuelta2 = total_sessions - sessions_vuelta1

    vuelta1 = first_fit_decreasing(chapters.copy(), sessions_vuelta1)
    vuelta2 = first_fit_decreasing(chapters.copy(), sessions_vuelta2)

    return {
        'total_sessions': total_sessions,
        'total_pages': total_pages,
        'vuelta1': {
            'sessions': vuelta1,
            'target_sessions': sessions_vuelta1,
            'actual_sessions': len(vuelta1),
            'pages_per_session': total_pages / len(vuelta1) if vuelta1 else 0,
            'min_pages': min(s['pages'] for s in vuelta1) if vuelta1 else 0,
            'max_pages': max(s['pages'] for s in vuelta1) if vuelta1 else 0
        },
        'vuelta2': {
            'sessions': vuelta2,
            'target_sessions': sessions_vuelta2,
            'actual_sessions': len(vuelta2),
            'pages_per_session': total_pages / len(vuelta2) if vuelta2 else 0,
            'min_pages': min(s['pages'] for s in vuelta2) if vuelta2 else 0,
            'max_pages': max(s['pages'] for s in vuelta2) if vuelta2 else 0
        }
    }

def print_plan(plan, show_details=True):
    """Imprime el plan"""
    total = plan['total_sessions']
    v1 = plan['vuelta1']
    v2 = plan['vuelta2']

    print(f"\n{'='*80}")
    print(f"PLAN DE {total} SESIONES")
    print(f"{'='*80}")
    print(f"\nTotal páginas: {plan['total_pages']}")
    print(f"\n--- PRIMERA VUELTA (Estudio detallado) ---")
    print(f"Sesiones: {v1['actual_sessions']} (objetivo: {v1['target_sessions']})")
    print(f"Páginas/sesión: {v1['pages_per_session']:.1f} (rango: {v1['min_pages']}-{v1['max_pages']})")

    print(f"\n--- SEGUNDA VUELTA (Repaso rápido) ---")
    print(f"Sesiones: {v2['actual_sessions']} (objetivo: {v2['target_sessions']})")
    print(f"Páginas/sesión: {v2['pages_per_session']:.1f} (rango: {v2['min_pages']}-{v2['max_pages']})")

    if show_details:
        print(f"\n{'='*80}")
        print("PRIMERA VUELTA - DETALLE")
        print(f"{'='*80}")

        session_num = 1
        for session in v1['sessions']:
            chapters_str = ", ".join([f"{c['manual']} Cap.{c['capitulo_num']}" for c in session['chapters']])
            print(f"\nSesión {session_num:3d} | {session['pages']:3d} págs | {chapters_str}")
            session_num += 1

        print(f"\n{'='*80}")
        print("SEGUNDA VUELTA - DETALLE")
        print(f"{'='*80}")

        for session in v2['sessions']:
            chapters_str = ", ".join([f"{c['manual']} Cap.{c['capitulo_num']}" for c in session['chapters']])
            print(f"\nSesión {session_num:3d} | {session['pages']:3d} págs | {chapters_str}")
            session_num += 1

def export_plan(plan, filename):
    """Exporta el plan a JSON"""
    v1 = plan['vuelta1']
    v2 = plan['vuelta2']

    output = {
        'resumen': {
            'total_sesiones': v1['actual_sessions'] + v2['actual_sessions'],
            'sesiones_vuelta1': v1['actual_sessions'],
            'sesiones_vuelta2': v2['actual_sessions'],
            'paginas_totales_por_vuelta': plan['total_pages']
        },
        'vuelta1': {
            'descripcion': 'Estudio detallado - ritmo lento',
            'paginas_por_sesion_media': v1['pages_per_session'],
            'rango_paginas': {'min': v1['min_pages'], 'max': v1['max_pages']},
            'sesiones': []
        },
        'vuelta2': {
            'descripcion': 'Repaso rápido - ritmo acelerado',
            'paginas_por_sesion_media': v2['pages_per_session'],
            'rango_paginas': {'min': v2['min_pages'], 'max': v2['max_pages']},
            'sesiones': []
        }
    }

    session_global = 1
    for i, session in enumerate(v1['sessions'], 1):
        output['vuelta1']['sesiones'].append({
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

    for i, session in enumerate(v2['sessions'], 1):
        output['vuelta2']['sesiones'].append({
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

    output_path = Path(f"/Users/gn1ra/Desktop/manuales_mir_cto/{filename}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Plan exportado a: {output_path}")

if __name__ == "__main__":
    # Generar planes para 180 y 150 sesiones
    for total_sessions in [180, 150]:
        plan = generate_plan(total_sessions)
        print_plan(plan, show_details=True)
        export_plan(plan, f"plan_estudio_{total_sessions}_sesiones.json")
