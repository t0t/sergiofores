#!/usr/bin/env python3
"""
Script para generar screenshots automáticamente de todas las URLs en el HTML de referencias de diseño.
Extrae URLs de los enlaces href y las mapea con sus nombres de imagen correspondientes.
"""

import os
import time
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse

class ScreenshotGenerator:
    def __init__(self):
        self.base_dir = "/Users/a01234/CEREBRO-DIGITAL/PROYECTOS/sergiofores/proyectos/referencias-diseno"
        self.screenshots_dir = os.path.join(self.base_dir, "screenshots")
        self.html_file = os.path.join(self.base_dir, "index.html")
        self.driver = None
        self.url_mapping = {}
        
    def setup_driver(self):
        """Configura el driver de Chrome con opciones optimizadas."""
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Ejecutar en modo headless
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1400,900")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-plugins")
        chrome_options.add_argument("--disable-images")  # Acelerar carga
        chrome_options.add_argument("--disable-javascript")  # Acelerar carga
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.set_window_size(1400, 900)
        self.driver.set_page_load_timeout(30)
        
    def extract_urls_from_html(self):
        """Extrae todas las URLs y las mapea con sus nombres de imagen."""
        print("Extrayendo URLs del HTML...")
        
        with open(self.html_file, 'r', encoding='utf-8') as file:
            html_content = file.read()
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Encontrar todas las tarjetas de referencia
        cards = soup.find_all('div', class_='reference-card')
        
        for card in cards:
            # Extraer URL del enlace
            link = card.find('a', class_='reference-link')
            if link and link.get('href'):
                url = link.get('href')
                
                # Extraer nombre de imagen del src
                img = card.find('img', class_='reference-image')
                if img and img.get('src'):
                    img_path = img.get('src')
                    # Extraer solo el nombre del archivo
                    filename = os.path.basename(img_path)
                    
                    # Mapear URL con nombre de archivo
                    self.url_mapping[url] = filename
                    
                    # Extraer título para referencia
                    title = card.find('h3', class_='reference-title')
                    title_text = title.text.strip() if title else "Sin título"
                    
                    print(f"✓ {title_text}: {url} -> {filename}")
        
        print(f"\nTotal de URLs encontradas: {len(self.url_mapping)}")
        return self.url_mapping
        
    def capture_screenshot(self, url, filename):
        """Captura screenshot de una URL específica."""
        try:
            print(f"Capturando: {url}")
            
            # Navegar a la URL
            self.driver.get(url)
            
            # Esperar a que la página cargue
            time.sleep(3)
            
            # Intentar esperar a que el body esté presente
            try:
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.TAG_NAME, "body"))
                )
            except:
                pass
            
            # Scroll hacia abajo para activar lazy loading
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/3);")
            time.sleep(1)
            self.driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)
            
            # Capturar screenshot
            screenshot_path = os.path.join(self.screenshots_dir, filename)
            
            # Cambiar extensión a .jpg si es .png
            if filename.endswith('.png'):
                screenshot_path = screenshot_path.replace('.png', '.jpg')
            
            success = self.driver.save_screenshot(screenshot_path)
            
            if success:
                print(f"✓ Screenshot guardado: {filename}")
                return True
            else:
                print(f"✗ Error al guardar screenshot: {filename}")
                return False
                
        except Exception as e:
            print(f"✗ Error capturando {url}: {str(e)}")
            return False
            
    def generate_all_screenshots(self):
        """Genera screenshots de todas las URLs mapeadas."""
        print("Iniciando generación de screenshots...")
        
        successful = 0
        failed = 0
        
        for url, filename in self.url_mapping.items():
            try:
                if self.capture_screenshot(url, filename):
                    successful += 1
                else:
                    failed += 1
                    
                # Pequeña pausa entre capturas
                time.sleep(2)
                
            except Exception as e:
                print(f"✗ Error general con {url}: {str(e)}")
                failed += 1
                
        print(f"\n=== RESUMEN ===")
        print(f"✓ Exitosos: {successful}")
        print(f"✗ Fallidos: {failed}")
        print(f"Total: {successful + failed}")
        
    def run(self):
        """Ejecuta el proceso completo."""
        try:
            # Verificar que el directorio existe
            if not os.path.exists(self.screenshots_dir):
                os.makedirs(self.screenshots_dir)
                print(f"Directorio creado: {self.screenshots_dir}")
            
            # Extraer URLs del HTML
            self.extract_urls_from_html()
            
            if not self.url_mapping:
                print("No se encontraron URLs para procesar.")
                return
                
            # Configurar driver
            self.setup_driver()
            
            # Generar screenshots
            self.generate_all_screenshots()
            
        except Exception as e:
            print(f"Error general: {str(e)}")
            
        finally:
            # Cerrar driver
            if self.driver:
                self.driver.quit()
                print("Driver cerrado.")

def main():
    """Función principal."""
    print("=== GENERADOR DE SCREENSHOTS AUTOMÁTICO ===")
    print("Extrayendo URLs de referencias de diseño...")
    
    generator = ScreenshotGenerator()
    generator.run()

if __name__ == "__main__":
    main()