export const es = {
  nav: {
    home: "Inicio",
    schedules: "Horarios",
    rsvp: "Confirmar asistencia",
    brand: "Eduard & Mar",
  },
  home: {
    heroTitle: "Eduard & Mar",
    heroLead:
      "¡Nos casamos! Explora los detalles del día, consulta el horario y confirma si podrás venir.",
    ctaSchedule: "Ver horario",
    ctaRsvp: "Confirmar asistencia",
    datePlace: "12 de julio de 2026 · Barcelona, España",
    infoTitle: "Información general",
    infoText: "Lugar, fecha, transporte y alojamiento.",
    scheduleTitle: "Horario del día",
    scheduleText:
      "Horarios de la ceremonia, el aperitivo, la cena y la fiesta.",
  },
  schedules: {
    title: "Horarios",
    intro: "Aquí encontrarás el horario detallado del día de la boda.",
    items: [
      { title: "Ceremonia", time: "17:00 · Iglesia de Sant Pere" },
      { title: "Aperitivo", time: "18:30 · Terraza del jardín" },
      { title: "Cena", time: "20:30 · Salón principal" },
      { title: "Fiesta", time: "23:30 · Pista de baile" },
    ],
  },
  rsvp: {
    title: "Confirmar asistencia",
    lead: "Por favor, dinos si vendrás. Te enviaremos más detalles.",
    fullName: "Nombre y apellidos",
    email: "Correo electrónico",
    willAttend: "¿Asistirás?",
    yes: "Sí",
    no: "No",
    notes: "Notas (dieta, acompañantes, etc.)",
    submit: "Enviar confirmación",
    success: "¡Gracias! Hemos registrado tu respuesta 🎉",
  },
  enter: {
    enterPassword: "Introduce la contraseña",
    passwordPlaceholder: "Contraseña",
    submit: "Confirmar",
    invalidPassword: "Contraseña incorrecta",
  },
} as const;
