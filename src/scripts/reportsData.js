// Central mock database and helpers for Ciudad Segura (Quito)

export const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';

export const DEFAULT_INCIDENT_CATEGORIES = [
  { id: 'alumbrado', name: 'Alumbrado Público', icon: 'bi-lightbulb-fill', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  { id: 'sospechoso', name: 'Actividad Sospechosa', icon: 'bi-shield-fill-exclamation', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
  { id: 'basura', name: 'Acumulación de Basura', icon: 'bi-trash3-fill', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  { id: 'ruido', name: 'Ruido Excesivo / Fiesta', icon: 'bi-volume-up-fill', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
  { id: 'vandalismo', name: 'Grafiti / Vandalismo', icon: 'bi-paint-bucket', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
  { id: 'obstruccion', name: 'Obstrucción de Vía', icon: 'bi-cone-striped', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
  { id: 'fauna', name: 'Mascota / Fauna', icon: 'bi-heart-pulse-fill', color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.15)' },
  { id: 'otro', name: 'Otro Novedad', icon: 'bi-exclamation-triangle-fill', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' },
];

export async function fetchIncidentCategories() {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const res = await fetch(`${API_URL}/api/tipos_reportes/`, {
      method: 'GET',
      headers
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[Ciudad Segura] No se pudo conectar a la API, usando categorías por defecto:', err.message);
    return DEFAULT_INCIDENT_CATEGORIES;
  }
}

// Top-level export con fallback seguro para server-side rendering
export const INCIDENT_CATEGORIES = await fetchIncidentCategories();

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

export const INITIAL_REPORTS = async() =>{
  try{
    const response = await fetch(`${API_URL}/api/reports/`)

    if(!response.ok){
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  }
  catch(error){
    console.error('Hubo un problema con la petición:', error);

    return [];
  }
};

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