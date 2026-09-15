/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_NAME?: string;

  readonly PUBLIC_EVENT_ISO?: string;

  readonly PUBLIC_MASTERTOOLS_FORM_ACTION?: string;
  readonly PUBLIC_MASTERTOOLS_FORM_ID?: string;

  readonly PUBLIC_WHATSAPP_GROUP_URL?: string;
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
  readonly PUBLIC_WHATSAPP_MESSAGE?: string;

  readonly PUBLIC_WISTIA_ID_CAPTURA?: string;
  readonly PUBLIC_WISTIA_ID_GRACIAS?: string;
  readonly PUBLIC_WISTIA_ID_WEBINAR?: string;

  readonly PUBLIC_OFFER_URL?: string;

  readonly PUBLIC_URL_PRIVACY?: string;
  readonly PUBLIC_URL_TERMS?: string;
  readonly PUBLIC_URL_CONTACT?: string;

  readonly PUBLIC_URL_FACEBOOK?: string;
  readonly PUBLIC_URL_INSTAGRAM?: string;
  readonly PUBLIC_URL_YOUTUBE?: string;
  readonly PUBLIC_URL_TWITTER?: string;

  readonly PUBLIC_OG_IMAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
