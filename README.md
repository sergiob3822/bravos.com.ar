# Mi Portafolio

Sitio web personal para mostrar proyectos y recibir contactos a través de un formulario con base de datos.

## 🚀 Características

- **Portafolio responsive**: Grid de proyectos con imágenes, descripción y tecnologías utilizadas
- **Formulario de contacto**: Guarda datos de clientes (nombre, apellido, correo, teléfono opcional, mensaje)
- **Base de datos integrada**: Usa Supabase (PostgreSQL) para persistencia
- **Diseño moderno**: UI limpia con CSS puro, sin dependencias pesadas
- **Totalmente gratuito**: Se despliega en Vercel + Supabase (planes gratuitos)

## 📦 Estructura del Proyecto

```
.
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos CSS (responsive)
├── script.js       # Lógica JavaScript
├── .env.example    # Variables de entorno de ejemplo
└── README.md       # Este archivo
```

## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript (ES6+)
- Supabase (PostgreSQL + API REST)
- Vercel (hosting estático + serverless)

## 📋 Configuración Paso a Paso

### 1. Crear cuenta en Supabase (gratis)

1. Ve a [supabase.com](https://supabase.com) y créate una cuenta
2. Crea un nuevo proyecto
3. Espera a que se despliegue (unos minutos)
4. Ve a **Settings > API** para obtener:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Crear tabla de contactos

En la sección **Table Editor** de Supabase:

1. Crea una tabla llamada `contacts` con estas columnas:
   - `id` (bigint, primary key, auto-increment)
   - `first_name` (text, NOT NULL)
   - `last_name` (text, NOT NULL)
   - `email` (text, NOT NULL)
   - `phone` (text, NULLABLE)
   - `message` (text, NOT NULL)
   - `created_at` (timestamp with time zone, default `now()`)

2. O usa este comando SQL (en SQL Editor > New query):

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Desplegar en Vercel (gratis)

1. Crea cuenta en [vercel.com](https://vercel.com) (puedes usar GitHub)
2. Sube tu código a un repositorio de GitHub
3. En Vercel, importa el repositorio
4. En **Project Settings > Environment Variables**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` → URL de tu proyecto Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Clave anónima de Supabase
5. Deploy

### 4. ¡Listo!

Tu sitio estará en línea en segundos con URL tipo `tu-proyecto.vercel.app`.

## 🔒 Seguridad

- **No** subas el archivo `.env` a Git (ya está en `.gitignore`)
- Usa variables de entorno en Vercel
- Supabase incluye Row Level Security (RLS) por defecto. Para simplificar, puedes desactivarla temporalmente si solo vos accedés a la DB.

## 📝 Personalización

- **Proyectos**: Editá el array `projects` en `script.js` (líneas ~5-40)
- **Colores**: Cambia las variables CSS en `styles.css` (líneas ~2-10)
- **Textos**: Modifica directamente en `index.html`

## 💡 Notas

- El formulario no envía emails, solo guarda en la base de datos. Para notificaciones, pods integrar servicios como:
  - **Zapier/Make.com**: Conectar Supabase → Gmail
  - **Resend**: Envío de emails desde código
- Vercel y Supabase tienen planes gratuitos generosos. Si superás los límites, podés:
  - Limitar el número de proyectos mostrados
  - Agregar rate limiting (simple en Supabase)
