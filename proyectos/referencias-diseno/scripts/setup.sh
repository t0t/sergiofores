#!/bin/bash

# Setup script para Referencias de Diseño
# Configura el entorno de desarrollo y dependencias

echo "🎯 === SETUP REFERENCIAS DE DISEÑO ==="
echo ""

# Verificar Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js encontrado: $(node --version)"
else
    echo "❌ Node.js no encontrado. Instálalo desde: https://nodejs.org/"
    exit 1
fi

# Verificar Python
if command -v python3 &> /dev/null; then
    echo "✅ Python3 encontrado: $(python3 --version)"
else
    echo "❌ Python3 no encontrado. Instálalo desde: https://python.org/"
    exit 1
fi

# Instalar dependencias Node.js
echo ""
echo "📦 Instalando dependencias Node.js..."
npm install

# Verificar dependencias Python
echo ""
echo "🐍 Verificando dependencias Python..."
python3 -c "import selenium, beautifulsoup4" 2>/dev/null || {
    echo "❌ Faltan dependencias Python. Instalando..."
    pip3 install selenium beautifulsoup4 requests
}

# Verificar ChromeDriver
echo ""
echo "🌐 Verificando ChromeDriver..."
if command -v chromedriver &> /dev/null; then
    echo "✅ ChromeDriver encontrado"
else
    echo "⚠️  ChromeDriver no encontrado en PATH"
    echo "   Los scripts de Python lo instalarán automáticamente"
fi

# Crear directorios si no existen
echo ""
echo "📁 Verificando estructura de directorios..."
mkdir -p screenshots assets/css assets/js scripts docs

# Verificar permisos de scripts
echo ""
echo "🔧 Configurando permisos de scripts..."
chmod +x scripts/*.py scripts/*.js scripts/*.sh 2>/dev/null || true

# Test rápido
echo ""
echo "🧪 Ejecutando test rápido..."
python3 -c "
import os
print('✅ Python OK')
print(f'📍 Directorio actual: {os.getcwd()}')
print(f'📊 Screenshots existentes: {len([f for f in os.listdir(\"screenshots\") if f.endswith((\".jpg\", \".png\"))])}')
"

echo ""
echo "🎉 === SETUP COMPLETADO ==="
echo ""
echo "Comandos disponibles:"
echo "  📝 Desarrollo:     python3 -m http.server 8000"
echo "  📸 Screenshots:    python3 scripts/screenshot_generator.py"
echo "  ✅ Verificar:      python3 scripts/verify_screenshots.py"
echo "  🔧 NPM Scripts:    npm run dev | npm run screenshots"
echo ""