#!/usr/bin/env python3
"""
Script para corregir nombres de archivos de screenshots para que coincidan exactamente con el HTML.
"""

import os
import shutil
from bs4 import BeautifulSoup

def fix_filenames():
    """Corrige nombres de archivos para que coincidan con el HTML."""
    
    base_dir = "/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores/proyectos/referencias-diseno"
    screenshots_dir = os.path.join(base_dir, "screenshots")
    html_file = os.path.join(base_dir, "index.html")
    
    # Leer HTML para obtener nombres esperados
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extraer nombres de archivos esperados
    expected_files = []
    imgs = soup.find_all('img', class_='reference-image')
    
    for img in imgs:
        src = img.get('src')
        if src and src.startswith('screenshots/'):
            filename = os.path.basename(src)
            expected_files.append(filename)
    
    print(f"Archivos esperados en HTML: {len(expected_files)}")
    
    # Listar archivos actuales
    current_files = []
    for filename in os.listdir(screenshots_dir):
        if filename.endswith(('.jpg', '.png')):
            current_files.append(filename)
    
    print(f"Archivos actuales: {len(current_files)}")
    
    # Crear mapeo de archivos que necesitan ser renombrados
    rename_map = {}
    
    for expected in expected_files:
        # Buscar archivo correspondiente con diferente extensión
        base_name = os.path.splitext(expected)[0]
        expected_ext = os.path.splitext(expected)[1]
        
        # Buscar archivo actual con cualquier extensión
        found_file = None
        for current in current_files:
            current_base = os.path.splitext(current)[0]
            if current_base == base_name:
                found_file = current
                break
        
        if found_file:
            current_path = os.path.join(screenshots_dir, found_file)
            expected_path = os.path.join(screenshots_dir, expected)
            
            if found_file != expected:
                rename_map[current_path] = expected_path
                print(f"Renombrar: {found_file} -> {expected}")
        else:
            print(f"⚠️  Archivo faltante: {expected}")
    
    # Ejecutar renombrados
    for old_path, new_path in rename_map.items():
        try:
            shutil.move(old_path, new_path)
            print(f"✓ Renombrado: {os.path.basename(old_path)} -> {os.path.basename(new_path)}")
        except Exception as e:
            print(f"✗ Error renombrando {old_path}: {e}")
    
    print(f"\nProceso completado. {len(rename_map)} archivos renombrados.")

if __name__ == "__main__":
    fix_filenames()