## GUÍA RÁPIDA - PRIMEROS PASOS

### Tiempo estimado: 15-20 minutos

---

## PASO 1: CREAR CUENTA SUPABASE

### 1.1 Registrarse en Supabase

1. Accede a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"**
3. Elige **Sign up with GitHub** o email
4. Verifica tu correo

### 1.2 Crear Nuevo Proyecto

1. Click en **"New Project"**
2. Nombre: `jardines-memberships`
3. Password (database master): guarda en un lugar seguro
4. Region: elige la más cercana (ej: Sudamérica)
5. Click en **"Create new project"**
6. Espera 2-3 minutos a que se cree

### 1.3 Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** → **API**
2. Copia y guarda:
   - **Project URL** (ej: `https://xyzabc.supabase.co`)
   - **anon public** (SUPABASE_ANON_KEY)
   - **service_role secret** (SUPABASE_SERVICE_ROLE_KEY)

👉 **Guarda estas credenciales en un archivo temporal**

---

## PASO 2: EJECUTAR MIGRACIONES SQL

### 2.1 Abrir SQL Editor en Supabase

1. En tu proyecto Supabase, ve a **SQL Editor**
2. Click en **+ New Query**

### 2.2 Copiar y Ejecutar SQL

1. Abre [database/migrations.sql](database/migrations.sql)
2. Copia TODO el contenido
3. Pégalo en el SQL Editor de Supabase
4. Click en **▶️ RUN** (botón verde)
5. Espera a que termine ✅

### 2.3 Verificar Tablas

1. Ve a **Table Editor**
2. Deberías ver:
   - ✅ `admins`
   - ✅ `contratantes`
   - ✅ `logs_acceso`

---

## PASO 3: CONFIGURAR EMAIL

### 3.1 Configurar Gmail (App Password)

1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Selecciona tu cuenta corporativa
3. Ve a **Security** (izquierda)
4. Busca **App passwords** (abajo)
   - Si no ves, activa **2-Step Verification** primero
5. Selecciona:
   - App: **Mail**
   - Device: **Windows/Mac/Linux**
6. Click en **Generate**
7. Copia la contraseña de 16 caracteres

👉 **Esta contraseña irá en EMAIL_PASS**

---

## PASO 4: CONFIGURAR PROYECTO LOCAL

### 4.1 Clonar/Descargar Proyecto

```bash
# Opción A: Si ya lo descargaste
cd C_menbresia2026

# Opción B: Si lo clonas desde GitHub
git clone https://github.com/tu-usuario/jardines-memberships.git
cd jardines-memberships
```

### 4.2 Instalar Dependencias

```bash
npm install
```

### 4.3 Crear .env.local

```bash
# En Windows
copy .env.local.example .env.local

# En Mac/Linux
cp .env.local.example .env.local
```

### 4.4 Editar .env.local

Abre el archivo `.env.local` y rellena:

```env
# Supabase (de Paso 1)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# JWT Secret (generar con comando)
JWT_SECRET=tu_clave_super_segura_aqui_32_caracteres

# Email (de Paso 3)
EMAIL_USER=tu-correo@jardinesdelrenacer.co
EMAIL_PASS=xxxx xxxx xxxx xxxx

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

**Para generar JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## PASO 5: PROBAR LOCALMENTE

### 5.1 Iniciar Servidor

```bash
npm run dev
```

Deberías ver:
```
✓ Ready on http://localhost:3000
```

### 5.2 Acceder a las URLs

Abre tu navegador en:

- **Búsqueda Pública**: http://localhost:3000/public/index.html
- **Login Admin**: http://localhost:3000/admin/login.html
- **API Health**: http://localhost:3000/api/health

### 5.3 Probar Login

1. En Login Admin, registra un nuevo admin:
   - Email: `tu-correo@jardinesdelrenacer.co`
   - Contraseña: mínimo 8 caracteres
   - Nombre: "Administrador"

2. Verifica recibir el código 2FA por email
3. Ingresa el código
4. Deberías acceder al dashboard ✅

---

## PASO 6: DESPLEGAR EN VERCEL

### 6.1 Preparar GitHub

```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Hacer commit
git commit -m "Initial commit: Jardines memberships"

# Cambiar rama a main
git branch -M main

# Agregar repositorio remoto
git remote add origin https://github.com/tu-usuario/jardines-memberships.git

# Hacer push
git push -u origin main
```

### 6.2 Conectar a Vercel

1. Accede a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en **Add New** → **Project**
3. Selecciona tu repositorio de GitHub
4. En "Configure Project", deja todo por defecto
5. Click en **Next**

### 6.3 Agregar Variables de Entorno

En la pantalla "Environment Variables":

```
SUPABASE_URL = (copia de .env.local)
SUPABASE_ANON_KEY = (copia de .env.local)
SUPABASE_SERVICE_ROLE_KEY = (copia de .env.local)
JWT_SECRET = (copia de .env.local)
EMAIL_USER = (copia de .env.local)
EMAIL_PASS = (copia de .env.local)
NEXT_PUBLIC_API_URL = https://tu-proyecto.vercel.app
```

👉 **Agrega TODAS estas variables**

### 6.4 Desplegar

1. Click en **Deploy**
2. Espera 2-5 minutos
3. Cuando veas ✅ **Deployed**, ¡listo!

---

## PASO 7: VERIFICAR DESPLIEGUE

### 7.1 Acceder a tu Sistema

Una vez desplegado, accede a:

```
https://tu-proyecto.vercel.app/public/index.html
https://tu-proyecto.vercel.app/admin/login.html
https://tu-proyecto.vercel.app/api/health
```

### 7.2 Probar Búsqueda

1. Primero, agrega datos de prueba en Supabase:
   - Ve a **Table Editor**
   - Selecciona tabla `contratantes`
   - Click en **Insert row**
   - Rellena campos de prueba

2. Luego, en el frontend público, busca por cédula
3. Deberías ver los datos ✅

---

## CHECKLIST DE VALIDACIÓN

Marca cada paso completado:

- [ ] Proyecto Supabase creado
- [ ] Migraciones SQL ejecutadas
- [ ] Credenciales guardadas
- [ ] Email configurado (App Password)
- [ ] `.env.local` creado y completado
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funciona
- [ ] Login Admin funciona
- [ ] Búsqueda pública funciona
- [ ] GitHub conectado
- [ ] Vercel desplegado
- [ ] URLs en producción funcionan

---

## PROBLEMAS COMUNES

### "Cannot find module"
```bash
npm install
npm run dev
```

### "Email no llega"
- Verifica EMAIL_PASS es la App Password, no tu contraseña
- Verifica que el correo es el correcto
- Revisa carpeta spam

### "SUPABASE_URL undefined"
- Verifica que `.env.local` existe
- Reinicia `npm run dev`
- Verifica variables en Vercel Settings

### "Error 404 en Vercel"
- Espera 5 minutos a que se complete el deploy
- Refresca el navegador
- Verifica que las variables de entorno están ahí

---

## CREAR DATOS DE PRUEBA

### Agregar contratante en Supabase

1. Ve a **Table Editor** → `contratantes`
2. Click en **+ Insert row**
3. Rellena:
   ```
   nombre_contratante: Ana María Torres
   cedula: 1234567890
   id_contrato: CTR-001
   id_persona: PER-001
   celular: 3001234567
   edad_actual: 45
   estado: activo
   zona: Zona A
   ciudad: Cartagena
   departamento: Bolívar
   ```
4. Click **Save**

Luego, en la búsqueda pública, busca por `1234567890` ✅

---

## SIGUIENTES PASOS

Una vez en producción:

1. **Crear admins corporativos** (uno por persona)
2. **Cargar datos de contratantes** (archivo Excel)
3. **Comunicar a usuarios** las URLs de búsqueda
4. **Monitorear logs** en Vercel
5. **Realizar backups** regulares en Supabase

---

## 📞 SOPORTE

Si algo no funciona:

1. Revisa los **Logs de Vercel**: Settings → Functions → Logs
2. Abre DevTools (F12) → Console para ver errores
3. Verifica que TODAS las variables de entorno están configuradas
4. Lea **DEPLOYMENT_GUIDE.md** para más detalles

---

**¡Felicidades! Tu sistema está listo 🎉**

Preguntas frecuentes → Ver **README.md**
Arquitectura completa → Ver **ARQUITECTURA.md**
Checklist final → Ver **CHECKLIST.md**
