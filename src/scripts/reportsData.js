// Central mock database and helpers for Ciudad Segura (Quito)

export const INCIDENT_CATEGORIES = [
  { id: 'alumbrado', name: 'Alumbrado Público', icon: 'bi-lightbulb-fill', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  { id: 'sospechoso', name: 'Actividad Sospechosa', icon: 'bi-shield-fill-exclamation', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
  { id: 'basura', name: 'Acumulación de Basura', icon: 'bi-trash3-fill', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  { id: 'ruido', name: 'Ruido Excesivo / Fiesta', icon: 'bi-volume-up-fill', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
  { id: 'vandalismo', name: 'Grafiti / Vandalismo', icon: 'bi-paint-bucket', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
  { id: 'obstruccion', name: 'Obstrucción de Vía', icon: 'bi-cone-striped', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
  { id: 'fauna', name: 'Mascota / Fauna', icon: 'bi-heart-pulse-fill', color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.15)' },
  { id: 'otro', name: 'Otro Novedad', icon: 'bi-exclamation-triangle-fill', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' },
];

export const REPORT_STATUSES = {
  PENDIENTE: { label: 'Pendiente', badgeClass: 'bg-warning text-dark', icon: 'bi-clock-history', color: '#f59e0b' },
  EN_PROCESO: { label: 'En Revisión', badgeClass: 'bg-info text-dark', icon: 'bi-gear-wide-connected', color: '#3b82f6' },
  ATENDIDO: { label: 'Atendido', badgeClass: 'bg-success text-white', icon: 'bi-check-circle-fill', color: '#10b981' },
  ARCHIVADO: { label: 'Archivado', badgeClass: 'bg-secondary text-white', icon: 'bi-archive-fill', color: '#64748b' }
};

// Current logged in mock user
export const CURRENT_USER = {
  id: 'user-123',
  name: 'Carlos Andrade (Vecino)',
  email: 'carlos.andrade@barrio.ec',
  sector: 'La Carolina - Manzana 4',
  role: 'ciudadano', // 'ciudadano' | 'comite'
};

const now = new Date();
const minusHours = (h) => new Date(now.getTime() - h * 3600 * 1000).toISOString();

export const INITIAL_REPORTS = [
  {
    id: 'REP-101',
    code: 'REP-2026-101',
    category: 'alumbrado',
    categoryName: 'Alumbrado Público',
    title: 'Luminaria principal apagada en pasaje peatonal',
    description: 'La luminaria poste #45 se apaga intermitentemente desde anoche. Deja a oscuras la esquina del parque infantil.',
    lat: -0.1807,
    lng: -78.4678,
    locationName: 'Av. República y Pasaje Eloy Alfaro (La Carolina)',
    status: 'PENDIENTE',
    createdAt: minusHours(1.2), // 1.2 hours ago (< 3h -> can edit/delete)
    userId: 'user-123', // Created by current user
    authorName: 'Carlos Andrade', // STAYS HIDDEN except on "Mis Reportes"
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'PENDIENTE', time: minusHours(1.2), note: 'Reporte ingresado por el ciudadano.' }
    ]
  },
  {
    id: 'REP-102',
    code: 'REP-2026-102',
    category: 'sospechoso',
    categoryName: 'Actividad Sospechosa',
    title: 'Vehículo oscuro estacionado sin placas cerca al portón',
    description: 'Automóvil sedan plomo estacionado con 2 ocupantes encendidos por más de 45 minutos sin movimiento.',
    lat: -0.1782,
    lng: -78.4750,
    locationName: 'Calle Rumipamba y Av. Amazonas',
    status: 'EN_PROCESO',
    createdAt: minusHours(4.5), // > 3h -> modification expired
    userId: 'user-123', // Created by current user
    authorName: 'Carlos Andrade',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'PENDIENTE', time: minusHours(4.5), note: 'Reporte ingresado por el ciudadano.' },
      { status: 'EN_PROCESO', time: minusHours(3.0), note: 'Comité de Seguridad tomó conocimiento y notificó al guardia de turno.' }
    ]
  },
  {
    id: 'REP-103',
    code: 'REP-2026-103',
    category: 'basura',
    categoryName: 'Acumulación de Basura',
    title: 'Desechos de poda acumulados obstruyendo la acera',
    description: 'Fueron dejados sacos de restos vegetales en la acera impidiendo el paso de adultos mayores.',
    lat: -0.1850,
    lng: -78.4600,
    locationName: 'Av. González Suárez y Coruña',
    status: 'ATENDIDO',
    createdAt: minusHours(14),
    userId: 'user-456', // Another user
    authorName: 'María Fernanda V.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'PENDIENTE', time: minusHours(14), note: 'Reporte ingresado.' },
      { status: 'EN_PROCESO', time: minusHours(10), note: 'Coordinación con minga comunitaria.' },
      { status: 'ATENDIDO', time: minusHours(2), note: 'Escombros recolectados por la cuadrilla del barrio.' }
    ]
  },
  {
    id: 'REP-104',
    code: 'REP-2026-104',
    category: 'ruido',
    categoryName: 'Ruido Excesivo / Fiesta',
    title: 'Música a alto volumen en inmueble deshabitado',
    description: 'Ruido molesto afectando el descanso del sector durante la madrugada.',
    lat: -0.1820,
    lng: -78.4710,
    locationName: 'Pasaje El Jardín #142',
    status: 'PENDIENTE',
    createdAt: minusHours(2.1),
    userId: 'user-789',
    authorName: 'Jorge Morales',
    imageUrl: null,
    timeline: [
      { status: 'PENDIENTE', time: minusHours(2.1), note: 'Reporte ingresado.' }
    ]
  },
  {
    id: 'REP-105',
    code: 'REP-2026-105',
    category: 'vandalismo',
    categoryName: 'Grafiti / Vandalismo',
    title: 'Manchado de pintura en pared posterior de la casa comunal',
    description: 'Pintas recientes realizadas durante el fin de semana.',
    lat: -0.1750,
    lng: -78.4820,
    locationName: 'Calle Batán Alto y Shyris',
    status: 'ATENDIDO',
    createdAt: minusHours(28),
    userId: 'user-999',
    authorName: 'Ana Lucía G.',
    imageUrl: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=600&q=80',
    timeline: [
      { status: 'PENDIENTE', time: minusHours(28), note: 'Reporte ingresado.' },
      { status: 'ATENDIDO', time: minusHours(5), note: 'Pintura restaurada por el comité de mantenimiento.' }
    ]
  }
];

/**
 * Calculates if a report can be edited/deleted (within 3 hours of creation)
 */
export function getReportWindowStatus(createdAtIso, userId) {
  const created = new Date(createdAtIso);
  const diffMs = Date.now() - created.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const maxHours = 3;

  const isOwner = userId === CURRENT_USER.id;
  const canModify = isOwner && diffHours <= maxHours;

  if (diffHours > maxHours) {
    return {
      canModify: false,
      isOwner,
      formattedTime: 'Ventana de 3 horas expirada',
      hoursLeft: 0,
      minutesLeft: 0,
      percentageLeft: 0
    };
  }

  const msLeft = (maxHours * 3600 * 1000) - diffMs;
  const hoursLeft = Math.floor(msLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
  const percentageLeft = Math.max(0, Math.min(100, Math.round((msLeft / (3 * 3600 * 1000)) * 100)));

  return {
    canModify,
    isOwner,
    formattedTime: `${hoursLeft}h ${minutesLeft}m restantes para editar`,
    hoursLeft,
    minutesLeft,
    percentageLeft
  };
}
