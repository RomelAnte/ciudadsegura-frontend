# 🛡️ Ciudad Segura - Frontend (Quito)

Una plataforma web interactiva de seguridad ciudadana desarrollada en **Astro 5** y **Leaflet.js**, diseñada para permitir a los vecinos de Quito reportar incidentes, visualizar emergencias comunitarias en un mapa geolocalizado en tiempo real y colaborar con los Comités de Seguridad Barrial.

---

## 📌 1. Problema
Las comunidades urbanas enfrentan constantes retos de seguridad e infraestructura (fallas de alumbrado público, actividades sospechosas, acumulación de basura o ruidos molestos). La ausencia de una herramienta digital directa y geolocalizada dificulta que los vecinos reporten problemas oportunamente y limita la capacidad de respuesta y organización de los Comités de Seguridad Barrial.

---

## 🎯 2. Objetivo
Desarrollar la aplicación frontend de **Ciudad Segura** utilizando una arquitectura basada en componentes con Astro y mapas interactivos con Leaflet.js. La plataforma facilita a los ciudadanos el reporte rápido de problemas comunitarios con ubicación precisa y permite a los comités barriales gestionar, revisar y dar resolución a cada caso registrado.

---

## 🛠️ 3. Stack
- **Framework Web**: Astro 5 (`^7.0.2` - Enrutamiento basado en archivos y componentes `.astro`)
- **Mapas y Geolocalización**: Leaflet.js (`leaflet ^1.9.4`, `@types/leaflet`) para visualización de mapas y marcadores interactivos
- **Estilos y Componentes UI**: Bootstrap 5 (`bootstrap ^5.3.8`) y Bootstrap Icons (`bootstrap-icons ^1.13.1`)
- **Lenguaje & Entorno**: JavaScript / TypeScript (ESM, Node.js `>=22.12.0`)
- **Integración Backend**: REST API enviando solicitudes HTTP al backend `ciudadsegura_backend` (`PUBLIC_API_URL`)

---

## 📐 4. Arquitectura
La aplicación está organizada de forma modular siguiendo las buenas prácticas de Astro:

```text
ciudadsegura-frontend/
├── public/                    # Recursos estáticos e iconos (favicon, etc.)
├── src/
│   ├── components/            # Componentes reutilizables de UI
│   │   ├── Header.astro       # Encabezado principal con usuario y logotipo
│   │   ├── Sidebar.astro      # Menú de navegación lateral para escritorio
│   │   ├── BottomNav.astro    # Barra de navegación inferior para dispositivos móviles
│   │   ├── DisclaimerBanner.astro # Banner de aviso de emergencia (ej. llamar al 911)
│   │   ├── Logo.astro         # Identidad gráfica de Ciudad Segura
│   │   └── Menu.astro         # Menú emergente de navegación
│   ├── layouts/               # Plantillas globales
│   │   └── BaseLayout.astro   # Layout principal con Bootstrap, Leaflet CSS y SEO
│   ├── pages/                 # Rutas dinámicas y estáticas de la aplicación
│   │   ├── index.astro        # Mapa de incidentes en tiempo real en Quito
│   │   ├── reportar.astro     # Formulario geolocalizado para registrar un nuevo reporte
│   │   ├── mis-reportes.astro # Historial y estado de los reportes del usuario
│   │   ├── login.astro        # Autenticación para ciudadanos y miembros del comité
│   │   ├── comite/            # Módulo administrativo del Comité Barrial
│   │   │   ├── reportes.astro # Panel de revisión, gestión y actualización de reportes
│   │   │   └── crear-usuario.astro # Registro de nuevos coordinadores del comité
│   │   └── reportes/
   │       └── [id].astro     # Vista en detalle de un reporte individual
│   ├── scripts/
│   │   └── reportsData.js     # Módulo de integración API y categorías de incidentes
│   └── style/
│       └── global.css         # Estilos globales y personalización de interfaz
├── astro.config.mjs           # Configuración del servidor y framework Astro
└── package.json               # Configuración de dependencias y scripts
```

---

## ⚙️ 5. Funcionalidades
- 🗺️ **Mapa Interactivo de Incidentes**: Visualización de eventos geolocalizados en Quito sobre mapa Leaflet con iconos dinámicos según el tipo de incidente (Alumbrado, Actividad sospechosa, Basura, etc.).
- 📝 **Reporte Ciudadano Geolocalizado**: Formulario para enviar reportes especificando categoría, descripción, fotografías y marcando la ubicación exacta en el mapa.
- 📊 **Seguimiento de Mis Reportes**: Panel personal donde el ciudadano consulta la evolución de sus incidentes (Pendiente, En Proceso, Resuelto).
- 🛡️ **Panel Administrativo del Comité Barrial**: Módulo dedicado para que los coordinadores verifiquen incidentes, cambien estados y asignen soluciones.
- 🔐 **Autenticación con Roles**: Inicio de sesión diferenciado para usuarios ciudadanos y administradores del comité.
- 📱 **Experiencia Adaptativa Mobile-First**: Menú inferior para móviles (`BottomNav`) y panel lateral expandible en escritorio (`Sidebar`).

---

## 📊 6. Estado Actual
🟢 **Funcional / Desarrollado (v0.0.1)**: Aplicación frontend completada con enrutamiento de Astro, mapas Leaflet.js operativos, componentes UI adaptativos y conexión configurada con el backend de Ciudad Segura.

---

## 🖼️ 7. Capturas

> *Sección reservada para capturas de pantalla de la aplicación (Mapa en tiempo real de Quito, Formulario de Reporte y Módulo Administrativo del Comité).*

---

## 🚀 8. Cómo Ejecutarlo

### Requisitos previos
- **Node.js**: Versión `>=22.12.0`.
- **npm**: Incluido con Node.js.
- **Backend**: Servidor `ciudadsegura_backend` ejecutándose (opcional para desarrollo local con mocks).

### Pasos de ejecución
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/RomelAnte/ciudadsegura-frontend.git
   cd ciudadsegura-frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   PUBLIC_API_URL=http://localhost:8000
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre tu navegador e ingresa a `http://localhost:4321/`.

5. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 🗺️ 9. Roadmap
- [ ] Soporte de PWA (Progressive Web App) con instalación en inicio y funcionamiento offline parcial.
- [ ] Ubicación en tiempo real mediante API de Geolocation del navegador/dispositivo.
- [ ] Filtro avanzado por barrios/sectores de Quito, rangos de fechas y nivel de urgencia.
- [ ] Mapa de calor (*Heatmap*) para análisis visual de zonas de riesgo por parte del comité.
- [ ] Envío automático de alertas a grupos comunitarios (WhatsApp / Telegram / SMS).
