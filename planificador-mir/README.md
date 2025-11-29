# Planificador MIR CTO

Aplicacion de seguimiento de estudio para el MIR con 180 sesiones organizadas en 2 vueltas.

## Caracteristicas

- Tarjetas por sesion con capitulos, apartados y paginas
- Boton para marcar sesiones como completadas (fondo verde)
- Base de datos SQLite para persistencia
- Barra de progreso y porcentaje de completado
- Pestanas para Vuelta 1 y Vuelta 2
- State management con Zustand
- UI con shadcn/ui

## Desarrollo local

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Docker

```bash
docker-compose up -d
```

La aplicacion estara disponible en http://localhost:3000

## Estructura del plan de estudio

- **Vuelta 1**: 108 sesiones (ritmo mas lento)
- **Vuelta 2**: 72 sesiones (ritmo mas rapido)
- Total: ~15,000 paginas distribuidas equitativamente
