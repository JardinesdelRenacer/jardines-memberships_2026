## ÍNDICE DE DOCUMENTACIÓN

### EMPEZAR AQUÍ

1. **[QUICK_START.md](QUICK_START.md)** - COMIENZA AQUÍ
   - Pasos paso a paso (15-20 min)
   - Setup local completo
   - Despliegue a Vercel
   - Validación final

2. **[README.md](README.md)**
   - Descripción general del proyecto
   - Estructura de directorios
   - Flujos de datos
   - Endpoints API
   - Variables de entorno

---

### ANTES DE DESPLEGAR

3. **[CHECKLIST.md](CHECKLIST.md)**
   - Validaciones pre-despliegue
   - Validaciones post-despliegue
   - Testing local
   - Troubleshooting

4. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**
   - Configuración Supabase detallada
   - Setup de variables de entorno
   - Instrucciones Vercel paso a paso
   - Pruebas de funcionalidad
   - Seguridad y RLS

---

### ENTENDER LA ARQUITECTURA

5. **[ARQUITECTURA.md](ARQUITECTURA.md)**
   - Diagrama visual del sistema
   - Flujos completos (login, carga, búsqueda)
   - Tabla de endpoints API
   - Estructura de tablas SQL
   - Características de seguridad

---

### ESTRUCTURA DEL CÓDIGO

```
FRONTEND
├── /public/index.html
│   └─ Búsqueda pública por cédula
│   └─ No requiere autenticación
│   └─ Muestra: nombre, contrato, persona, edad, estado, zona
│
└── /admin/login.html
    └─ Login con 2FA
    └─ Email corporativo requerido
    └─ Código 6 dígitos via email
    └─ Acceso a dashboard
    
    └─ /admin/index.html
       └─ Dashboard administrativo
       └─ Cargar Excel con contratantes
       └─ Gestionar estados
       └─ Ver estadísticas
```

```
BACKEND (Serverless)
├── /api/auth.ts
│   ├─ POST - Registro (solo @jardinesdelrenacer.co)
│   ├─ POST - Login Paso 1 (creds)
│   ├─ POST - Login Paso 2 (2FA)
│   └─ POST - Logout
│
├── /api/contratantes.ts
│   └─ GET ?cedula=... (público, sin auth)
│
└── /api/upload.ts
    └─ POST (requiere JWT + rol admin)
```

```
CÓDIGO COMPARTIDO (/src)
├── lib/supabaseClient.ts
│   └─ Cliente de Supabase
│
└── utils/
    ├── emailService.ts (2FA, confirmaciones)
    ├── auth.ts (JWT, bcrypt)
    └── excelParser.ts (XLSX processing)
```

```
BASE DE DATOS (Supabase)
├── admins (con 2FA temporal)
├── contratantes (datos de clientes)
└── logs_acceso (auditoría)
```

---

### 📖 DOCUMENTACIÓN POR TEMA

#### 🔐 Seguridad
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Sección "Seguridad"
- [ARQUITECTURA.md](ARQUITECTURA.md) - Sección "SEGURIDAD IMPLEMENTADA"

#### 📊 Base de Datos
- [ARQUITECTURA.md](ARQUITECTURA.md) - Sección "TABLAS DE BASE DE DATOS"
- [database/migrations.sql](database/migrations.sql) - Schema SQL

#### 🌐 API
- [ARQUITECTURA.md](ARQUITECTURA.md) - Sección "ENDPOINTS API"
- [README.md](README.md) - Sección "Búsqueda de Contratantes"

#### 📧 Email & 2FA
- [QUICK_START.md](QUICK_START.md) - Paso 3 "Configurar Email"
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Paso 2.2 "Obtener Claves Email"

#### 🚀 Despliegue
- [QUICK_START.md](QUICK_START.md) - Paso 6 "Desplegar en Vercel"
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Sección "Paso 3: Desplegar en Vercel"

---

### 📁 ARCHIVOS IMPORTANTES

| Archivo | Propósito | Acción |
|---------|-----------|--------|
| `.env.local.example` | Variables de entorno (plantilla) | Copiar a `.env.local` y editar |
| `vercel.json` | Configuración de Vercel | Dejar como está |
| `tsconfig.json` | Configuración de TypeScript | Dejar como está |
| `package.json` | Dependencias npm | Dejar como está |
| `database/migrations.sql` | Schema SQL | Ejecutar en Supabase |
| `.gitignore` | Git ignore patterns | Dejar como está |

---

### 🧪 TESTING

#### Testing Local
```bash
npm install
npm run dev
# Acceder a http://localhost:3000
```

#### Testing en Producción
Usar URLs de Vercel después del deploy:
```
https://tu-proyecto.vercel.app/public/index.html
https://tu-proyecto.vercel.app/admin/login.html
https://tu-proyecto.vercel.app/api/health
```

Ver [CHECKLIST.md](CHECKLIST.md) para casos de prueba completos.

---

### 🎯 FLUJO DE TRABAJO RECOMENDADO

```
1. PREPARACIÓN (30 min)
   └─ Leer QUICK_START.md
   └─ Crear cuenta Supabase
   └─ Configurar email Gmail

2. SETUP LOCAL (20 min)
   └─ Clonar/descargar proyecto
   └─ Ejecutar migraciones SQL
   └─ Crear .env.local
   └─ npm install

3. TESTING LOCAL (15 min)
   └─ npm run dev
   └─ Probar todas las funciones
   └─ Verificar errores

4. DESPLIEGUE (15 min)
   └─ Git init + push a GitHub
   └─ Conectar a Vercel
   └─ Agregar env variables
   └─ Deploy

5. VALIDACIÓN (10 min)
   └─ Verificar URLs en producción
   └─ Probar login admin
   └─ Probar búsqueda pública
   └─ ¡Listo! ✅
```

**Tiempo total: ~90 minutos desde cero**

---

### 📞 PREGUNTAS FRECUENTES

#### ¿Dónde puedo cambiar los colores?
- Frontend: `admin/` y `public/` - Buscar clase `jardines-blue`
- Tailwind config: Dentro de cada HTML (script tag)

#### ¿Cómo editar campos de formularios?
- Frontend: Ver `public/index.html` y `admin/login.html`
- Backend: Ver `api/` archivos y validaciones

#### ¿Cómo agregar nuevos campos a contratantes?
1. Editar schema en `database/migrations.sql`
2. Ejecutar el nuevo SQL en Supabase
3. Actualizar archivos Excel y frontend
4. Redeploy en Vercel

#### ¿Cómo hacer backup de datos?
En Supabase:
1. Ve a **Backups** en el panel
2. O exporta con `pg_dump` manualmente

---

### 🎓 RECURSOS EXTERNOS

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Node.js Documentation](https://nodejs.org/docs/)

---

### 📝 HISTORIAL DE VERSIONES

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | Abril 2026 | Release inicial - Sistema completo |

---

### ✅ ESTADO DEL PROYECTO

```
✅ Frontend          - Completado
✅ Backend APIs      - Completado
✅ Base de Datos     - Completado
✅ Autenticación     - Completado
✅ 2FA por Email     - Completado
✅ Carga Excel       - Completado
✅ Búsqueda Pública  - Completado
✅ Documentación     - Completado
✅ Seguridad         - Completado
✅ Listo Producción  - SÍ ✅
```

---

**¿Por dónde empiezo?**

👉 [Lee **QUICK_START.md** ahora](QUICK_START.md)

---

**Proyecto: Validación de Membresías - Jardines del Renacer 🌺**
**Versión: 1.0.0 | Estado: ✅ Producción**
