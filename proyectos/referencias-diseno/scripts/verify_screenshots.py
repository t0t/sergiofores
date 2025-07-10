#!/usr/bin/env python3
"""
Script para verificar que todas las imágenes de screenshots están disponibles y funcionando.
"""

import os
from bs4 import BeautifulSoup

def verify_screenshots():
    """Verifica que todas las imágenes esperadas estén disponibles."""
    
    base_dir = "/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores/proyectos/referencias-diseno"
    screenshots_dir = os.path.join(base_dir, "screenshots")
    html_file = os.path.join(base_dir, "index.html")
    
    # Leer HTML
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extraer imágenes esperadas
    imgs = soup.find_all('img', class_='reference-image')
    
    print("=== VERIFICACIÓN DE SCREENSHOTS ===")
    print(f"Total de imágenes en HTML: {len(imgs)}")
    
    missing_files = []
    existing_files = []
    
    for img in imgs:
        src = img.get('src')
        if src and src.startswith('screenshots/'):
            filename = os.path.basename(src)
            filepath = os.path.join(screenshots_dir, filename)
            
            # Obtener información del sitio
            card = img.find_parent('div', class_='reference-card')
            title = "Sin título"
            if card:
                title_elem = card.find('h3', class_='reference-title')
                if title_elem:
                    title = title_elem.text.strip()
            
            if os.path.exists(filepath):
                # Obtener tamaño del archivo
                size = os.path.getsize(filepath)
                size_mb = size / (1024 * 1024)
                existing_files.append((filename, title, size_mb))
                print(f"✓ {filename} ({title}) - {size_mb:.2f} MB")
            else:
                missing_files.append((filename, title))
                print(f"✗ {filename} ({title}) - FALTANTE")
    
    print(f"\n=== RESUMEN ===")
    print(f"✓ Archivos existentes: {len(existing_files)}")
    print(f"✗ Archivos faltantes: {len(missing_files)}")
    
    if missing_files:
        print(f"\nArchivos faltantes:")
        for filename, title in missing_files:
            print(f"  - {filename} ({title})")
    
    # Verificar archivos huérfanos (screenshots que no se usan en HTML)
    all_screenshots = []
    for filename in os.listdir(screenshots_dir):
        if filename.endswith(('.jpg', '.png')):
            all_screenshots.append(filename)
    
    used_screenshots = [os.path.basename(img.get('src')) for img in imgs if img.get('src')]
    orphaned_screenshots = [f for f in all_screenshots if f not in used_screenshots]
    
    if orphaned_screenshots:
        print(f"\nArchivos huérfanos (no usados en HTML):")
        for filename in orphaned_screenshots:
            print(f"  - {filename}")
    
    # Estadísticas generales
    total_size = sum(os.path.getsize(os.path.join(screenshots_dir, f)) 
                    for f in all_screenshots)
    total_size_mb = total_size / (1024 * 1024)
    
    print(f"\n=== ESTADÍSTICAS ===")
    print(f"Total de archivos de screenshot: {len(all_screenshots)}")
    print(f"Tamaño total: {total_size_mb:.2f} MB")
    print(f"Tamaño promedio: {total_size_mb/len(all_screenshots):.2f} MB")
    
    return len(missing_files) == 0

if __name__ == "__main__":
    success = verify_screenshots()
    if success:
        print("\n🎉 VERIFICACIÓN EXITOSA: Todos los screenshots están disponibles!")
    else:
        print("\n❌ VERIFICACIÓN FALLIDA: Algunos screenshots faltan.")