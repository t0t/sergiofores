# TOT Boilerplate

Sistema CSS revolucionario donde **solo 5 variables controlan TODO** el diseño.

## Características Principales

### 🔥 TOT0 Matrix System
- **5 variables fundamentales**: `--u`, `--r`, `--hue`, `--sat`, `--flow`
- **8 tamaños tipográficos** con progresión áurea perfecta
- **4 line-heights** matemáticamente calculados
- **Reducción áurea intermedia** aplicada uniformemente

### 📐 Variables Núcleo
```css
:root {
    --u: 8px;           /* Unidad base */
    --r: 1.618;         /* Ratio áureo */
    --hue: 200;         /* Matiz color */
    --sat: 70%;         /* Saturación */
    --flow: column;     /* Dirección */
}
```

### 🎨 Escala Tipográfica
- **--t5**: 178px (Hero gigante)
- **--t4**: 110px (Hero grande)
- **--t3**: 68px (Hero mediano)
- **--t2**: 42px (Títulos principales)
- **--t1**: 26px (Subtítulos)
- **--t0**: 16px (Base)
- **--t-1**: 10px (Pequeño)
- **--t-2**: 6px (Mínimo)

### 📏 Line-Heights Áureos
- **--lh0**: 1.0 (Compacto)
- **--lh1**: 1.0 (Normal)
- **--lh2**: 1.35 (Cómodo)
- **--lh3**: 1.98 (Espacioso)

### 🎯 Clases Utility
- **.h1** a **.h8**: 8 tamaños con line-heights automáticos
- **.grid**, **.grid-flow**: Sistema de layouts
- **.ch**, **.cv**: Centrado horizontal/vertical
- **.pt0** a **.pt5**: Padding áureo

## Filosofía

**MENOS ES MÁS**: Un solo archivo, 5 variables, progresiones matemáticas perfectas. 

- ✅ **Zero duplicación**
- ✅ **Máxima eficiencia** 
- ✅ **Armonía matemática**
- ✅ **Escalabilidad infinita**

---

**TOT0 Matrix v2.0** - Evolución del Layout Maestro