#!/usr/bin/env python3
"""
OPTIMIZADOR DE MEDIA ASSETS - BOILERPLATE SERGIO FORÉS
Renombra y optimiza todas las imágenes y videos del directorio media
"""

import os
import re
import subprocess
from pathlib import Path
import shutil

class MediaOptimizer:
    def __init__(self, media_dir):
        self.media_dir = Path(media_dir)
        self.image_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
        self.video_extensions = {'.mp4', '.mov', '.avi', '.webm'}
        self.counter = 1
        
    def sanitize_filename(self, filename):
        """Convierte nombres de archivo a formato web optimizado"""
        # Remover extensión temporalmente
        name, ext = os.path.splitext(filename)
        
        # Convertir a minúsculas
        name = name.lower()
        
        # Reemplazar caracteres especiales y espacios
        name = re.sub(r'[^\w\-_]', '-', name)
        
        # Múltiples guiones a uno solo
        name = re.sub(r'-+', '-', name)
        
        # Remover guiones al inicio y final
        name = name.strip('-')
        
        # Truncar si es muy largo
        if len(name) > 30:
            name = name[:30].rstrip('-')
            
        return name + ext.lower()
    
    def generate_generic_name(self, file_path):
        """Genera nombres genéricos basados en el contenido de la imagen"""
        filename = file_path.name.lower()
        
        # Detectar tipo de contenido por palabras clave en el nombre
        if any(word in filename for word in ['hero', 'banner', 'main', 'principal']):
            return f"hero-{self.counter:02d}"
        elif any(word in filename for word in ['feature', 'caracteristica', 'funcionalidad']):
            return f"feature-{self.counter:02d}"
        elif any(word in filename for word in ['gallery', 'galeria', 'portfolio']):
            return f"gallery-{self.counter:02d}"
        elif any(word in filename for word in ['team', 'member', 'equipo', 'persona']):
            return f"team-{self.counter:02d}"
        elif any(word in filename for word in ['avatar', 'profile', 'perfil']):
            return f"avatar-{self.counter:02d}"
        elif any(word in filename for word in ['background', 'fondo', 'texture']):
            return f"background-{self.counter:02d}"
        elif any(word in filename for word in ['abstract', 'art', 'arte']):
            return f"abstract-{self.counter:02d}"
        elif any(word in filename for word in ['tech', 'technology', 'ia', 'ai', 'robot']):
            return f"tech-{self.counter:02d}"
        elif any(word in filename for word in ['demo', 'muestra', 'ejemplo']):
            return f"demo-{self.counter:02d}"
        elif any(word in filename for word in ['project', 'proyecto', 'work']):
            return f"project-{self.counter:02d}"
        else:
            # Nombre genérico
            return f"asset-{self.counter:02d}"
    
    def optimize_image(self, input_path, output_path):
        """Optimiza imagen usando ImageMagick"""
        try:
            # Comando básico de optimización
            cmd = [
                'magick', str(input_path),
                '-auto-orient',           # Corregir orientación
                '-strip',                 # Remover metadata
                '-quality', '85',         # Calidad 85% (balance tamaño/calidad)
                '-resize', '1920x1080>', # Redimensionar si es mayor
                '-colorspace', 'sRGB',    # Espacio de color estándar
                str(output_path)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0:
                print(f"✅ Imagen optimizada: {output_path.name}")
                return True
            else:
                print(f"❌ Error optimizando {input_path.name}: {result.stderr}")
                # Copiar original si falla la optimización
                shutil.copy2(input_path, output_path)
                return False
                
        except Exception as e:
            print(f"❌ Error procesando {input_path.name}: {e}")
            # Copiar original si falla
            shutil.copy2(input_path, output_path)
            return False
    
    def optimize_video(self, input_path, output_path):
        """Optimiza video usando FFmpeg"""
        try:
            cmd = [
                'ffmpeg', '-i', str(input_path),
                '-c:v', 'libx264',        # Codec H.264
                '-crf', '23',             # Calidad (18-28, menor = mejor calidad)
                '-preset', 'medium',      # Velocidad vs compresión
                '-c:a', 'aac',            # Audio AAC
                '-b:a', '128k',           # Bitrate audio
                '-movflags', '+faststart', # Optimización web
                '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease', # Escalar manteniendo aspecto
                '-y',                     # Sobrescribir
                str(output_path)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0:
                print(f"✅ Video optimizado: {output_path.name}")
                return True
            else:
                print(f"❌ Error optimizando video {input_path.name}: {result.stderr}")
                # Copiar original si falla
                shutil.copy2(input_path, output_path)
                return False
                
        except Exception as e:
            print(f"❌ Error procesando video {input_path.name}: {e}")
            # Copiar original si falla
            shutil.copy2(input_path, output_path)
            return False
    
    def check_dependencies(self):
        """Verificar que ImageMagick y FFmpeg estén disponibles"""
        try:
            subprocess.run(['magick', '-version'], capture_output=True, check=True)
            print("✅ ImageMagick disponible")
        except:
            print("❌ ImageMagick no encontrado. Instalación: brew install imagemagick")
            return False
            
        try:
            subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
            print("✅ FFmpeg disponible")
        except:
            print("❌ FFmpeg no encontrado. Instalación: brew install ffmpeg")
            return False
            
        return True
    
    def process_all_media(self):
        """Procesa todos los archivos media"""
        if not self.check_dependencies():
            print("❌ Dependencias faltantes. Instalando...")
            return False
            
        # Crear directorio temporal
        temp_dir = self.media_dir / 'temp_optimized'
        temp_dir.mkdir(exist_ok=True)
        
        print(f"🚀 Procesando archivos en: {self.media_dir}")
        
        processed_files = []
        
        # Procesar todos los archivos
        for file_path in self.media_dir.iterdir():
            if file_path.is_file() and file_path.name != 'README.md':
                ext = file_path.suffix.lower()
                
                # Generar nuevo nombre
                generic_name = self.generate_generic_name(file_path)
                new_filename = f"{generic_name}{ext}"
                
                # Evitar duplicados
                counter = 1
                while any(pf['new_name'] == new_filename for pf in processed_files):
                    new_filename = f"{generic_name}-{counter:02d}{ext}"
                    counter += 1
                
                temp_path = temp_dir / new_filename
                
                if ext in self.image_extensions:
                    success = self.optimize_image(file_path, temp_path)
                elif ext in self.video_extensions:
                    success = self.optimize_video(file_path, temp_path)
                else:
                    # Copiar otros archivos sin modificar
                    shutil.copy2(file_path, temp_path)
                    success = True
                
                processed_files.append({
                    'original': file_path.name,
                    'new_name': new_filename,
                    'type': 'image' if ext in self.image_extensions else 'video' if ext in self.video_extensions else 'other',
                    'success': success
                })
                
                self.counter += 1
        
        # Reemplazar archivos originales
        print("\n🔄 Reemplazando archivos originales...")
        
        # Hacer backup de archivos originales
        backup_dir = self.media_dir / 'backup_original'
        backup_dir.mkdir(exist_ok=True)
        
        for file_info in processed_files:
            original_path = self.media_dir / file_info['original']
            backup_path = backup_dir / file_info['original']
            new_path = self.media_dir / file_info['new_name']
            temp_path = temp_dir / file_info['new_name']
            
            # Backup original
            if original_path.exists():
                shutil.move(original_path, backup_path)
            
            # Mover archivo optimizado
            if temp_path.exists():
                shutil.move(temp_path, new_path)
        
        # Limpiar directorio temporal
        shutil.rmtree(temp_dir)
        
        # Mostrar resumen
        print(f"\n📊 RESUMEN:")
        print(f"Archivos procesados: {len(processed_files)}")
        print(f"Imágenes: {sum(1 for f in processed_files if f['type'] == 'image')}")
        print(f"Videos: {sum(1 for f in processed_files if f['type'] == 'video')}")
        print(f"Exitosos: {sum(1 for f in processed_files if f['success'])}")
        
        # Mostrar mapping
        print(f"\n📋 RENOMBRADO:")
        for file_info in processed_files:
            status = "✅" if file_info['success'] else "❌"
            print(f"{status} {file_info['original']} → {file_info['new_name']}")
        
        print(f"\n💾 Backup original en: {backup_dir}")
        
        return True

def main():
    media_dir = Path(__file__).parent.parent / 'assets' / 'media'
    optimizer = MediaOptimizer(media_dir)
    optimizer.process_all_media()

if __name__ == "__main__":
    main()