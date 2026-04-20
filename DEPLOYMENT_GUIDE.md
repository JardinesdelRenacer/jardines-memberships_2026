# Guía de Despliegue: Vercel + Supabase

## Requisitos Previos

1. Cuenta en **Vercel** (vercel.com)
2. Cuenta en **Supabase** (supabase.com)
3. Git configurado
4. Node.js 18+ instalado

---

 Configurar Supabase

### 1.1 Crear Proyecto en Supabase

1. Accede a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Guarda tus credenciales:
   - **Project URL** (SUPABASE_URL)
   - **Anon Key** (SUPABASE_ANON_KEY)
   - **Service Role Key** (SUPABASE_SERVICE_ROLE_KEY)

> **IMPORTANTE - SEGURIDAD DE CLAVES**
>
> - Nunca pegues ni compartas tu `service_role` ni otras claves en mensajes públicos o chats. El `service_role` permite operaciones administrativas y debe mantenerse secretas.
> - Si por accidente compartiste alguna clave (por ejemplo en un chat), gírala inmediatamente desde Supabase: Settings → API → Regenerate service_role key.
> - Guarda las claves en un archivo local `.env.local` (que ya está en `.gitignore`) y en las variables de entorno de Vercel (production/preview). No subas nunca `.env.local` al repositorio.
>
> Ejemplo rápido para crear `.env.local` (local):
>
> ```bash
> # Unix / macOS
> cp .env.local.example .env.local
>
> # Windows (PowerShell)
> copy .env.local.example .env.local
> ```
>
> Abre `.env.local` con tu editor y pega las claves que obtuviste en Supabase. No compartas ese archivo.
>
> Para añadir las variables en Vercel (opcional, con Vercel CLI):
>
> ```bash
> vercel env add SUPABASE_URL production
> vercel env add SUPABASE_ANON_KEY production
> vercel env add SUPABASE_SERVICE_ROLE_KEY production
> vercel env add JWT_SECRET production
> vercel env add EMAIL_PASS production
> ```


### 1.2 Ejecutar Migraciones SQL

1. En Supabase, ve a **SQL Editor**
2. Copia y ejecuta el contenido de `database/migrations.sql`
3. Verifica que las tablas se crearon correctamente

### 1.3 Configurar Row Level Security (RLS)

```sql
-- Habilitar RLS en tabla admins
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Política: Admin solo ve sus propios datos
CREATE POLICY "Admins can view their own data"
ON admins FOR SELECT
USING (auth.uid()::text = id::text);

-- Política: Admin puede actualizar sus propios datos
CREATE POLICY "Admins can update their own data"
ON admins FOR UPDATE
USING (auth.uid()::text = id::text);
```

---

## 🔐 Paso 2: Configurar Variables de Entorno

### 2.1 En el Proyecto Local

Copia `.env.local.example` a `.env.local` y completa:

```bash
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=tu_clave_super_segura_aqui_minimo_32_caracteres
EMAIL_USER=admin@jardinesdelrenacer.co
EMAIL_PASS=tu_contraseña_app_generada
```

### 2.2 Obtener Claves de Email (Gmail)

1. Activa **2FA** en tu cuenta Google
2. Ve a [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Crea una **App Password** para Gmail
4. Usa esa contraseña en `EMAIL_PASS`

---

## 📦 Paso 3: Desplegar en Vercel

### 3.1 Push a GitHub

```bash
git init
git add .
git commit -m "Initial commit: Jardines memberships system"
git branch -M main
git remote add origin https://github.com/tu-usuario/jardines-memberships.git
git push -u origin main
```

### 3.2 Importar Proyecto en Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en **Add New** → **Project**
3. Importa tu repositorio de GitHub
4. Configura las variables de entorno:
   - Pega todas las variables de `.env.local`
5. Click en **Deploy**

### 3.3 Configurar Dominio (Opcional)

1. En Vercel, ve a **Settings** → **Domains**
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones

---

## ✅ Paso 4: Pruebas Post-Despliegue

### 4.1 Verificar API

```bash
# Verificar que la API responde
curl https://tu-proyecto.vercel.app/api/health

# Respuesta esperada:
# {"status":"API funcionando correctamente"}
```

### 4.2 Probar Login Admin

1. Accede a `https://tu-proyecto.vercel.app/admin/login.html`
2. Registra un nuevo admin:
   ```bash
   curl -X POST https://tu-proyecto.vercel.app/api/auth \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@jardinesdelrenacer.co",
       "password": "TuContraseña123",
       "nombre": "Administrador",
       "accion": "registro"
     }'
   ```

### 4.3 Probar Búsqueda Pública

1. Sube datos de prueba en Supabase (tabla `contratantes`)
2. Accede a `https://tu-proyecto.vercel.app/public/index.html`
3. Busca por cédula

---

## 📊 Estructura Final

```
Tu dominio.vercel.app
├── /                           → Redirige a /public/index.html (Búsqueda pública)
├── /public/index.html          → Frontend: Consulta por cédula
├── /admin/login.html           → Login con 2FA
├── /admin/dashboard.html       → Panel de administración
└── /api/
    ├── auth                    → Autenticación
    ├── contratantes            → Consultas
    └── upload                  → Cargar Excel
```

---

## 🛡️ Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT para sesiones
- ✅ 2FA por correo corporativo
- ✅ RLS en Supabase
- ✅ CORS configurado
- ✅ Helmet para headers de seguridad
- ✅ Validación de dominio (@jardinesdelrenacer.co)

---

## 📞 Soporte

En caso de errores:

1. Revisa los **Logs de Vercel**: Settings → Functions → Logs
2. Revisa **Console** en DevTools (F12)
3. Verifica que las claves de Supabase son correctas
4. Comprueba que el email está configurado correctamente

---

## 🔄 Actualizaciones Futuras

Para hacer cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
# Vercel se despliega automáticamente
```

---

**¡Listo para usar! 🎉**
