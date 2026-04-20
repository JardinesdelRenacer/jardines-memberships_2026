# CHECKLIST DE DESPLIEGUE

## Antes de Desplegar

### Configuración Local

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Proyecto clonado/creado localmente
- [ ] `npm install` ejecutado
- [ ] `.env.local` creado desde `.env.local.example`

### Supabase Configurado

- [ ] Proyecto Supabase creado en supabase.com
- [ ] `SUPABASE_URL` obtenida
- [ ] `SUPABASE_ANON_KEY` obtenida
- [ ] `SUPABASE_SERVICE_ROLE_KEY` obtenida
- [ ] Migraciones SQL ejecutadas (database/migrations.sql)
- [ ] Tablas `admins` y `contratantes` creadas
- [ ] RLS habilitado (si corresponde)

### Email Configurado

- [ ] Cuenta Gmail accesible
- [ ] 2FA habilitado en Gmail
- [ ] App Password generada (myaccount.google.com/apppasswords)
- [ ] `EMAIL_USER` configurado
- [ ] `EMAIL_PASS` (App Password) configurado

### Seguridad
# CHECKLIST DE DESPLIEGUE

## Antes de Desplegar

### Configuración Local

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Proyecto clonado/creado localmente
- [ ] `npm install` ejecutado
- [ ] `.env.local` creado desde `.env.local.example`

### Supabase Configurado

- [ ] Proyecto Supabase creado en supabase.com
- [ ] `SUPABASE_URL` obtenida
- [ ] `SUPABASE_ANON_KEY` obtenida
- [ ] `SUPABASE_SERVICE_ROLE_KEY` obtenida
- [ ] Migraciones SQL ejecutadas (database/migrations.sql)
- [ ] Tablas `admins` y `contratantes` creadas
- [ ] RLS habilitado (si corresponde)

### Email Configurado

- [ ] Cuenta Gmail accesible
- [ ] 2FA habilitado en Gmail
- [ ] App Password generada (myaccount.google.com/apppasswords)
- [ ] `EMAIL_USER` configurado
- [ ] `EMAIL_PASS` (App Password) configurado

### Seguridad

- [ ] `JWT_SECRET` generado (mínimo 32 caracteres)
  ```bash
  # Generar secret aleatorio:
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Todas las variables en `.env.local`
- [ ] `.env.local` está en `.gitignore`
- [ ] No hay secrets en código fuente

### Testing Local

```bash
# Ejecutar tests locales
npm run dev

# Verificar endpoints:
curl http://localhost:3000/api/health
# Respuesta: {"status":"API funcionando correctamente"}
```

---

## Desplegar en Vercel

### Preparar Repositorio Git

```bash
# Inicializar git (si no está ya inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: Jardines memberships system"

# Cambiar rama a main
git branch -M main

# Agregar origin remoto
git remote add origin https://github.com/tu-usuario/jardines-memberships.git

# Push a GitHub
git push -u origin main
```

### Crear Proyecto en Vercel

- [ ] Accede a vercel.com/dashboard
- [ ] Click en Add New → Project
- [ ] Selecciona tu repositorio de GitHub
- [ ] Vercel detectará Next.js/framework automáticamente
- [ ] Click en Configure Project (si es necesario)

### Agregar Variables de Entorno

En Vercel, Settings → Environment Variables:

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
NEXT_PUBLIC_API_URL=https://tu-proyecto.vercel.app
```

- [ ] Todas las variables agregadas
- [ ] Nada de secretos en el código

### Desplegar

- [ ] Click en Deploy
- [ ] Esperar a que finalice (2-5 minutos)
- [ ] Verificar que dice "Deployed"

---

## Post-Despliegue

### Verificar Despliegue

- [ ] API Health: `https://tu-proyecto.vercel.app/api/health`
- [ ] Frontend Público: `https://tu-proyecto.vercel.app/public/index.html`
- [ ] Login Admin: `https://tu-proyecto.vercel.app/admin/login.html`

### Probar Funciones Principales

Registro Admin:
```bash
curl -X POST https://tu-proyecto.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@jardinesdelrenacer.co",
    "password": "ContraseñaSegura123",
    "nombre": "Administrador",
    "accion": "registro"
  }'
```

Login Paso 1:
```bash
curl -X POST https://tu-proyecto.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@jardinesdelrenacer.co",
    "password": "ContraseñaSegura123",
    "accion": "login_paso1"
  }'
```

Búsqueda (sin auth):
```bash
curl https://tu-proyecto.vercel.app/api/contratantes?cedula=1234567890
```

### Cargar Datos de Prueba

1. En Supabase, abre Table Editor
2. Ve a tabla `contratantes`
3. Agrega algunos registros de prueba
4. Prueba la búsqueda desde el frontend

### Tests Finales

- [ ] Admin puede registrarse
- [ ] Admin recibe código 2FA por email
- [ ] Admin puede loguearse después de verificar 2FA
- [ ] Admin puede ver dashboard
- [ ] Admin puede descargar Excel template
- [ ] Admin puede cargar Excel con contratantes
- [ ] Usuario público puede buscar por cédula
- [ ] Solo datos permitidos se muestran

---

## Actualizaciones Futuras

Para hacer cambios después del despliegue:

```bash
# 1. Hacer cambios en código local
# 2. Git commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# 3. Vercel se despliega automáticamente
# 4. Verificar en https://tu-proyecto.vercel.app
```

---

## Troubleshooting

### Error: "Cannot find module"
```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push origin main
```

### Error: "SUPABASE_URL undefined"
- Verificar que las variables de entorno están en Vercel
- Ir a Settings → Environment Variables
- Agregar `NEXT_PUBLIC_` prefix si es necesario

### Error: "Email not sending"
- Verificar Email y Password en .env.local
- Verificar que es App Password, no contraseña de Gmail
- Habilitar "Less secure apps" si es necesario (no recomendado)

### Error: "Database connection failed"
- Verificar SUPABASE_URL
- Verificar SUPABASE_SERVICE_ROLE_KEY
- Verificar que migraciones SQL se ejecutaron

---

## Soporte

1. Revisa los logs de Vercel: Settings → Functions → Logs
2. Abre DevTools (F12) y revisa Console
3. Verifica que todas las variables de entorno están configuradas
4. Lee DEPLOYMENT_GUIDE.md para más detalles

---

**¡Sistema listo para producción!**
