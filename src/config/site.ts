/**
 * Configuración central del funnel.
 * Valores reales → variables PUBLIC_* en `.env` / Vercel.
 * No inventar IDs, URLs ni credenciales: dejar vacío hasta tener el dato.
 */

function readEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  return typeof value === 'string' ? value.trim() : '';
}

function optionalUrl(key: keyof ImportMetaEnv): string | null {
  const value = readEnv(key);
  if (!value || value === '#' || value.toUpperCase() === 'REEMPLAZAR') return null;
  return value;
}

/** Solo dígitos para wa.me (código país + número, sin + ni espacios). */
function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

function buildWhatsAppHref(): string | null {
  const group = optionalUrl('PUBLIC_WHATSAPP_GROUP_URL');
  if (group) return group;

  const number = digitsOnly(readEnv('PUBLIC_WHATSAPP_NUMBER'));
  if (!number) return null;

  const message = readEnv('PUBLIC_WHATSAPP_MESSAGE');
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const siteUrl =
  optionalUrl('PUBLIC_SITE_URL') ??
  (typeof import.meta.env.SITE === 'string' && import.meta.env.SITE
    ? import.meta.env.SITE.replace(/\/$/, '')
    : 'http://localhost:4321');

export const site = {
  brand: readEnv('PUBLIC_SITE_NAME') || 'Hernán Elejalde Amin',
  tagline: 'CRECER CON PROPÓSITO',
  motto: 'Fe. Claridad. Acción.',
  description:
    'Clase online gratuita de Hernán Elejalde Amin para aprender a enfrentar problemas con mayor claridad y dirección desde principios cristianos prácticos.',
  year: 2026,
  url: siteUrl,

  event: {
    /** ISO 8601 con offset. Ej. Colombia: 2026-11-23T20:00:00-05:00 */
    iso: readEnv('PUBLIC_EVENT_ISO') || '2026-11-23T20:00:00-05:00',
    locale: 'es-CO',
    timeZone: 'America/Bogota',
    timeLabel: 'Hora Colombia',
  },

  mastertools: {
    /** URL de action del formulario MasterTools Forms / Email Tool. */
    formAction: optionalUrl('PUBLIC_MASTERTOOLS_FORM_ACTION'),
    /** ID opcional del formulario (si MasterTools lo requiere en embed). */
    formId: optionalUrl('PUBLIC_MASTERTOOLS_FORM_ID'),
    configured: Boolean(optionalUrl('PUBLIC_MASTERTOOLS_FORM_ACTION')),
  },

  whatsapp: {
    /** Preferido por el copy actual: enlace a grupo. */
    groupUrl: optionalUrl('PUBLIC_WHATSAPP_GROUP_URL'),
    number: readEnv('PUBLIC_WHATSAPP_NUMBER') || null,
    message: readEnv('PUBLIC_WHATSAPP_MESSAGE') || null,
    /** href final del CTA (grupo o wa.me). null = pendiente. */
    href: buildWhatsAppHref(),
  },

  links: {
    offer: optionalUrl('PUBLIC_OFFER_URL'),
    privacy: optionalUrl('PUBLIC_URL_PRIVACY'),
    terms: optionalUrl('PUBLIC_URL_TERMS'),
    contact: optionalUrl('PUBLIC_URL_CONTACT'),
    facebook: optionalUrl('PUBLIC_URL_FACEBOOK'),
    instagram: optionalUrl('PUBLIC_URL_INSTAGRAM'),
    youtube: optionalUrl('PUBLIC_URL_YOUTUBE'),
    twitter: optionalUrl('PUBLIC_URL_TWITTER'),
  },

  wistia: {
    captura: optionalUrl('PUBLIC_WISTIA_ID_CAPTURA'),
    gracias: optionalUrl('PUBLIC_WISTIA_ID_GRACIAS'),
    webinar: optionalUrl('PUBLIC_WISTIA_ID_WEBINAR'),
  },

  seo: {
    ogImage: optionalUrl('PUBLIC_OG_IMAGE') || '/assets/hernan-estudio.jpg',
  },

  thankYouPath: '/gracias/',
} as const;

export type SiteConfig = typeof site;

/** href usable en <a>: URL real o "#" si pendiente. */
export function hrefOrPending(url: string | null | undefined): string {
  return url && url.length > 0 ? url : '#';
}

export function isConfigured(url: string | null | undefined): boolean {
  return Boolean(url && url.length > 0 && url !== '#');
}
