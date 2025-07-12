#!/bin/bash
# 🚀 SERVIDOR LOCAL RÁPIDO PARA PORTFOLIO SERGIOFORES
# Solución CORS para desarrollo local

echo "🚀 Iniciando servidor local para Portfolio Sergio Forés..."
echo "Directorio: $(pwd)"

# Verificar si Python está disponible
if command -v python3 &> /dev/null; then
    echo "✅ Usando Python 3 HTTP Server"
    echo "📍 URL: http://localhost:8000"
    echo "🔄 Presiona Ctrl+C para detener"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Usando Python 2 HTTP Server"
    echo "📍 URL: http://localhost:8000"
    echo "🔄 Presiona Ctrl+C para detener"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v npx &> /dev/null; then
    echo "✅ Usando HTTP-Server (Node.js)"
    echo "📍 URL: http://localhost:8080"
    echo "🔄 Presiona Ctrl+C para detener"
    echo ""
    npx http-server -p 8080 -c-1
else
    echo "❌ ERROR: No se encontró Python ni Node.js"
    echo "💡 SOLUCIONES:"
    echo "   1. Instalar Python: https://python.org"
    echo "   2. Instalar Node.js: https://nodejs.org"
    echo "   3. Usar Live Server en VSCode"
    exit 1
fi