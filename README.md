# Crosspay Solutions - Frontend (Next.js)

Frontend en Next.js (App Router) con TailwindCSS, siguiendo el branding del mock adjunto.

## Scripts

- `npm install`
- `npm run dev` (http://localhost:3000)

## Configuración

Crea un archivo `.env.local` en `frontend/` con:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

El backend FastAPI ya permite CORS para `http://localhost:3000` según `backend/main.py`.

## Estructura

- `app/page.tsx`: Home con `Hero` y `Navbar`, fondo hexagonal.
- `app/admin/login/page.tsx`: Login Admin (POST /admin/login).
- `app/admin/dashboard/page.tsx`: Dashboard de transacciones (GET /admin/transactions`).
- `components/`: `Navbar`, `Badge`, `Hero`, `HexBackground`, `TransactionsTable`.
- `lib/api.ts`: Cliente Axios y funciones de API.
- `lib/auth.ts`: Manejo simple de token JWT en `localStorage`.

## Estilos clave

- Paleta: fondo `#0f0f0f`, texto principal `#d1d1d1`, secundario `#6c6c6c`.
- Gradiente badge: `#d03fb1 → #ac57da → #6340e7`.
- Palabra destacada en morado `#7b3aec`.
- Bordes redondeados `22px` (`rounded-xl2`) y sombras suaves.
- Tipografías Google: Poppins/Montserrat (400/600/700).
- Títulos con `line-height: 0.95` y `clamp()` para responsive.

## Flujo Admin

1. Ir a `/admin/login` y autenticar.
2. Se guarda el token en `localStorage`.
3. `/admin/dashboard` lista transacciones protegidas.

## Nota

Si cambias el puerto del backend, actualiza `NEXT_PUBLIC_API_BASE_URL`.
