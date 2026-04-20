# Estructura del Proyecto - Jardines del Renacer

## 📁 Directorios

```
C_menbresia2026/
│
├── 📄 package.json                 # Dependencias del proyecto
├── 📄 tsconfig.json                # Configuración de TypeScript
├── 📄 vercel.json                  # Configuración de Vercel
├── 📄 .env.local.example           # Variables de entorno (ejemplo)
│
├── 📁 api/                         # Funciones Serverless (Vercel)
│   ├── auth.ts                     # Login, registro, 2FA
│   ├── contratantes.ts             # Búsqueda por cédula
│   └── upload.ts                   # Cargar Excel
│
├── 📁 src/                         # Código compartido
│   ├── lib/
│   │   └── supabaseClient.ts       # Cliente de Supabase
│   └── utils/
│       ├── emailService.ts         # Envío de emails y 2FA
│       ├── auth.ts                 # JWT y bcrypt
│       └── excelParser.ts          # Procesamiento de Excel
│
├── 📁 database/
│   └── migrations.sql              # Esquema SQL de Supabase
│
├── 📁 admin/                       # Panel de administración
│   ├── login.html                  # Login con 2FA
│   └── index.html                  # Dashboard admin
│
├── 📁 public/                      # Frontend de búsqueda pública
│   └── index.html                  # Búsqueda por cédula
│
└── 📄 DEPLOYMENT_GUIDE.md          # Guía de despliegue
```

---

## 🔄 Flujo de Datos

### Para Admins (Panel Administrativo)

```
1. Admin accede a /admin/login.html
2. Ingresa: email@jardinesdelrenacer.co + contraseña
3. API valida credenciales
4. API envía código 2FA al email
5. Admin ingresa código
6. API emite JWT
7. Admin accede a dashboard
8. Puede cargar Excel con contratantes
9. Puede gestionar contratantes
```

### Para Usuarios (Búsqueda Pública)

```
1. Usuario accede a /public/index.html
2. Ingresa número de cédula
3. API consulta en tabla contratantes
4. API retorna datos permitidos:
   - Nombre del contratante
   - ID Contrato
   - ID Persona
   - Celular
   - Edad actual
   - Estado (activo/inactivo)
   - Zona
   - Ciudad
   - Departamento
5. Se muestra en pantalla
```

---

## 🔐 Autenticación

**Login de Admin (Paso 1 - Credenciales)**
```
POST /api/auth
{
  "email": "admin@jardinesdelrenacer.co",
  "password": "ContraseñaSegura123",
  "accion": "login_paso1"
}

Respuesta:
{
  "success": true,
  "message": "Código enviado a tu correo",
  "tempToken": "jwt_token",
  "adminId": "uuid"
}
```

**Login de Admin (Paso 2 - 2FA)**
```
POST /api/auth
{
  "adminId": "uuid",
  "codigo": "123456",
  "accion": "login_paso2"
}

Respuesta:
{
  "success": true,
  "message": "¡Bienvenido!",
  "token": "jwt_token",
  "admin": { id, email, nombre, rol }
}
```

---

## 📤 Cargar Contratantes

**Archivo Excel Esperado**

| nombreContratante | cedula     | idContrato | idPersona | celular | email | edadActual | estado | zona | ciudad | departamento | direccion |
|------------------|-----------|-----------|-----------|---------|-------|-----------|--------|------|--------|-------------|-----------|
| Ana María Torres | 1234567890| CTR-001   | PER-001   | 3001234567| ana@  | 45        | activo | A    | Cartagena | Bolívar | Cra 1 |

**Endpoint de Carga**
```
POST /api/upload/contratantes
Content-Type: multipart/form-data

Parámetros:
- archivo: file (Excel)
- adminId: uuid (del token)

Respuesta:
{
  "success": true,
  "message": "100 registros cargados, 2 errores",
  "resultados": {
    "exitosos": 100,
    "errores": 2,
    "detalles": [...]
  }
}
```

---

## 🔍 Búsqueda de Contratantes

**Búsqueda Pública (Sin Autenticación)**
```
GET /api/contratantes?cedula=1234567890

Respuesta:
{
  "success": true,
  "data": {
    "nombre_contratante": "Ana María Torres",
    "id_contrato": "CTR-001",
    "id_persona": "PER-001",
    "celular": "3001234567",
    "edad_actual": 45,
    "estado": "activo",
    "zona": "A",
    "ciudad": "Cartagena",
    "departamento": "Bolívar"
  }
}
```

---

## 📧 Variables de Entorno Requeridas

```bash
# Supabase
SUPABASE_URL=https://proyecto.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# JWT
JWT_SECRET=tu_clave_secreta_minimo_32_caracteres

# Email (Gmail con App Password)
EMAIL_USER=admin@jardinesdelrenacer.co
EMAIL_PASS=xxx xxx xxx xxx

# Entorno
NODE_ENV=production
```

---

## 🧪 Testing Local

```bash
# Instalar dependencias
npm install

# Variables de entorno locales
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor local de Vercel
npm run dev

# Acceder a:
# - Admin: http://localhost:3000/admin/login.html
# - Público: http://localhost:3000/public/index.html
# - API: http://localhost:3000/api
```

---

## 📊 Tablas de Base de Datos

### Tabla: `admins`
```sql
- id (UUID) - PK
- email (VARCHAR) - Único, @jardinesdelrenacer.co
- password_hash (VARCHAR)
- nombre (VARCHAR)
- rol (VARCHAR) - admin | supervisor
- codigo_2fa (VARCHAR) - Temporal
- codigo_2fa_expiry (TIMESTAMP) - Temporal
- codigo_2fa_verificado (BOOLEAN)
- activo (BOOLEAN)
- ultimo_login (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabla: `contratantes`
```sql
- id (UUID) - PK
- nombre_contratante (VARCHAR)
- cedula (VARCHAR) - Único
- id_contrato (VARCHAR) - Único
- id_persona (VARCHAR)
- celular (VARCHAR)
- email (VARCHAR)
- edad_actual (INTEGER)
- fecha_nacimiento (DATE)
- estado (VARCHAR) - activo|inactivo|suspendido|cancelado
- zona (VARCHAR)
- ciudad (VARCHAR)
- departamento (VARCHAR)
- direccion (TEXT)
- tipo_plan (VARCHAR)
- fecha_afiliacion (TIMESTAMP)
- ultimo_pago (TIMESTAMP)
- deuda (DECIMAL)
- cargado_por (UUID) - FK a admins.id
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🎯 URLs del Proyecto

Una vez desplegado en Vercel:

```
Inicio/Búsqueda Pública:
https://tu-proyecto.vercel.app/public/index.html

Panel Admin (Login):
https://tu-proyecto.vercel.app/admin/login.html

Dashboard Admin:
https://tu-proyecto.vercel.app/admin/index.html

API Health Check:
https://tu-proyecto.vercel.app/api/health
```

---

**Proyecto: Validación de Credenciales - Jardines del Renacer 🌺**
**Versión: 1.0.0**
**Última actualización: Abril 2026**
# jardines-memberships_2026
