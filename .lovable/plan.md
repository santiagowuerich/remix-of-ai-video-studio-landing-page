

## Plan: Página "Cierre de Caja" en el Dashboard

Se creará una nueva sección dentro del Dashboard existente (`src/pages/Dashboard.tsx`) accesible desde el sidebar, manteniendo el mismo estilo dark theme (`bg-[#1a1a1a]`, `bg-[#2d2d2d]`, colores institucionales).

### Estructura

1. **Nuevo item en sidebar**: Icono `Banknote` + label "Cierre de Caja", sección `'cierreCaja'`
2. **Datos mock**: Array de ~15 tickets simulados con variedad de `payment_method` (cash, qr, mercadopago, transfer, invitation), status (paid/pending/cancelled), nombres, eventos, precios y timestamps del día actual

### Componentes dentro de la sección

**A. Header de sección**
- Título "Cierre de Caja"
- Input date (valor default: hoy) para filtrar
- Botones "Imprimir Reporte" (llama `window.print()`) y "Exportar CSV" (genera y descarga CSV)

**B. KPI Cards (3 tarjetas)**
- Total Vendido (solo status `paid`)
- Tickets Vendidos (cantidad)
- Ticket Promedio (total/cantidad)

**C. Desglose por Método de Pago**
- Grid de cards con: método, cantidad de operaciones, total recaudado
- Iconos diferenciados por método (Banknote, Smartphone, CreditCard, ArrowRightLeft, Gift)

**D. Arqueo de Caja**
- Panel con 3 columnas: Total Teórico Efectivo (calculado), Total Real (input editable), Diferencia (color condicional verde/rojo)

**E. Tabla de Operaciones**
- Columnas: Hora, Evento, Cliente, Cantidad, Método de Pago, Total
- Solo registros `paid` del día seleccionado
- Estado vacío si no hay datos

**F. Estilos de impresión**
- `@media print` en `index.css`: oculta sidebar, header del dashboard, selector de fecha y botones de acción

### Archivos a modificar
- `src/pages/Dashboard.tsx` — agregar sección `cierreCaja` al sidebar, mock data de tickets, toda la UI de cierre de caja
- `src/index.css` — agregar reglas `@media print`

### Detalles técnicos
- Formato moneda: `Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })`
- Filtro por fecha compara solo día/mes/año del `purchase_date`
- CSV se genera concatenando filas y se descarga via `Blob` + `URL.createObjectURL`
- El tipo de `activeSection` se expande a incluir `'cierreCaja'`

