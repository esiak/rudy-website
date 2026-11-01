import type { Locale } from './routes';

const de = {
  'nav.home': 'Startseite',
  'nav.services': 'Leistungen',
  'nav.about': 'Über mich',
  'nav.contact': 'Kontakt',
  'nav.imprint': 'Impressum',
  'nav.privacy': 'Datenschutz',
  'button.contactMe': 'Kontaktieren Sie mich',
  'button.moreInfo': 'Mehr Infos',
  'footer.privacy': 'Datenschutz',
  'footer.imprint': 'Impressum',
  'form.name': 'Name',
  'form.email': 'E-Mail',
  'form.message': 'Nachricht',
  'form.submit': 'Absenden',
};

export type UiKey = keyof typeof de;

const fr = {
  'nav.home': 'Accueil',
  'nav.services': 'Services',
  'nav.about': 'À propos',
  'nav.contact': 'Contact',
  'nav.imprint': 'Mentions légales',
  'nav.privacy': 'Confidentialité',
  'button.contactMe': 'Contactez-moi',
  'button.moreInfo': "Plus d'infos",
  'footer.privacy': 'Confidentialité',
  'footer.imprint': 'Mentions légales',
  'form.name': 'Nom',
  'form.email': 'E-mail',
  'form.message': 'Message',
  'form.submit': 'Envoyer',
} satisfies Record<UiKey, string>;

const en = {
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.imprint': 'Imprint',
  'nav.privacy': 'Privacy',
  'button.contactMe': 'Contact me',
  'button.moreInfo': 'More info',
  'footer.privacy': 'Privacy',
  'footer.imprint': 'Imprint',
  'form.name': 'Name',
  'form.email': 'Email',
  'form.message': 'Message',
  'form.submit': 'Submit',
} satisfies Record<UiKey, string>;

export const ui: Record<Locale, Record<UiKey, string>> = { de, fr, en };

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}
