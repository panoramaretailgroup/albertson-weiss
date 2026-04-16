export const SITE_NAME = "Albertson & Weiss Motors";
export const SITE_DESCRIPTION =
  "Plataforma de inversión en vehículos premium. Rentabilidades estimadas del 20-30%.";

export const LOGISTICS_PHASES = [
  { phase: 1, name: "Comprado en subasta" },
  { phase: 2, name: "En tránsito a almacén USA" },
  { phase: 3, name: "En almacén USA" },
  { phase: 4, name: "Contenedor cargado" },
  { phase: 5, name: "En tránsito marítimo" },
  { phase: 6, name: "Descargado en puerto Europa" },
  { phase: 7, name: "Listo para entrega" },
] as const;

export const CAR_STATUSES = {
  open: "Abierto a inversión",
  funded: "Financiado",
  in_transit: "En tránsito",
  sold: "Vendido",
  completed: "Completado",
} as const;

export const INVESTMENT_STATUSES = {
  active: "Activa",
  completed: "Completada",
  cancelled: "Cancelada",
} as const;

export const ROUTES = {
  home: "/",
  comoFunciona: "/como-funciona",
  oportunidades: "/oportunidades",
  trackRecord: "/track-record",
  sobreNosotros: "/sobre-nosotros",
  faq: "/faq",
  registro: "/registro",
  login: "/login",
  panel: "/panel",
  panelOportunidades: "/panel/oportunidades",
  panelActivas: "/panel/activas",
  panelCompletadas: "/panel/completadas",
  panelPerfil: "/panel/perfil",
  panelNotificaciones: "/panel/notificaciones",
  admin: "/admin",
  adminCoches: "/admin/coches",
  adminCochesNuevo: "/admin/coches/nuevo",
  adminInversiones: "/admin/inversiones",
  adminUsuarios: "/admin/usuarios",
} as const;
