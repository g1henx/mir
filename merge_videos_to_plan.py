#!/usr/bin/env python3
"""
Merge videos from manual JSONs into the study plan JSON.
"""

import json
import os
from pathlib import Path

BASE_DIR = Path(__file__).parent

# Mapping of manual names to JSON files
MANUAL_FILES = {
    "Neurología": "01_neurologia.json",
    "Oftalmología": "02_oftalmologia.json",
    "Otorrinolaringología": "03_otorrinolaringologia.json",
    "Pediatría": "04_pediatria.json",
    "Psiquiatría": "05_psiquiatria.json",
    "Reumatología": "06_reumatologia.json",
    "Traumatología": "07_traumatologia.json",
    "Urgencias y Geriatría": "08_urgencias_y_geriatria.json",
    "Urología": "09_urologia.json",
    "Neumología": "10_neumologia.json",
    "Inmunología": "11_inmunologia.json",
    "Nefrología": "12_nefrologia.json",
    "Hematología": "13_hematologia.json",
    "Enfermedades Infecciosas": "14_enfermedades_infecciosas.json",
    "Bioética": "15_bioetica.json",
    "Cardiología": "16_cardiologia.json",
    "Dermatología": "17_dermatologia.json",
    "Digestivo y Cirugía General": "18_digestivo_y_cirugia_general.json",
    "Endocrinología": "19_endocrinologia.json",
    "Epidemiología y Estadística": "20_epidemiologia_estadistica.json",
    "Ginecología y Obstetricia": "21_ginecologia_obstetricia.json",
    "Radiología": "22_radiologia.json",
}

def load_manual_videos():
    """Load all videos from manual JSONs indexed by manual name and chapter number."""
    videos_index = {}

    for manual_name, filename in MANUAL_FILES.items():
        filepath = BASE_DIR / filename
        if not filepath.exists():
            print(f"Warning: {filename} not found")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Get the actual manual name from the JSON
        actual_name = data.get('nombre', manual_name)
        videos_index[actual_name] = {}

        for cap in data.get('capitulos', []):
            cap_num = cap.get('numero')
            videos = cap.get('videos', [])
            if cap_num and videos:
                videos_index[actual_name][cap_num] = videos

    return videos_index

def merge_videos_to_plan(plan_path, output_path):
    """Add videos to each chapter in the study plan."""

    # Load videos index
    videos_index = load_manual_videos()

    # Load the plan
    with open(plan_path, 'r', encoding='utf-8') as f:
        plan = json.load(f)

    # Process both vueltas
    for vuelta_key in ['vuelta1', 'vuelta2']:
        vuelta = plan.get(vuelta_key, {})
        for sesion in vuelta.get('sesiones', []):
            for capitulo in sesion.get('capitulos', []):
                manual = capitulo.get('manual')
                cap_num = capitulo.get('capitulo_numero')

                # Try to find videos
                if manual in videos_index and cap_num in videos_index[manual]:
                    capitulo['videos'] = videos_index[manual][cap_num]
                else:
                    # Try partial match for manual name
                    for indexed_manual in videos_index:
                        if manual.lower() in indexed_manual.lower() or indexed_manual.lower() in manual.lower():
                            if cap_num in videos_index[indexed_manual]:
                                capitulo['videos'] = videos_index[indexed_manual][cap_num]
                                break

    # Save the updated plan
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(plan, f, ensure_ascii=False, indent=2)

    print(f"Updated plan saved to {output_path}")

    # Count total videos added
    total_videos = 0
    for vuelta_key in ['vuelta1', 'vuelta2']:
        for sesion in plan.get(vuelta_key, {}).get('sesiones', []):
            for cap in sesion.get('capitulos', []):
                total_videos += len(cap.get('videos', []))

    print(f"Total videos added: {total_videos}")

if __name__ == '__main__':
    plan_path = BASE_DIR / 'plan_estudio_180_sesiones.json'
    output_path = BASE_DIR / 'planificador-mir' / 'public' / 'plan_estudio_180_sesiones.json'

    merge_videos_to_plan(plan_path, output_path)
