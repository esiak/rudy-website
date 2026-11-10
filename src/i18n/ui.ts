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
  'footer.owner': 'Dr. Rudy Pastel',
  'contact.messageMeTitle': 'Message Me',
  'contact.messageMeText':
    'Ich freue mich auf Ihre Anfrage und darauf, gemeinsam großartige Lösungen zu entwickeln. Kontaktieren Sie mich gerne!',
  'a11y.skip': 'Zum Inhalt springen',
  'a11y.menu': 'Menü',
  'a11y.nav': 'Hauptnavigation',
  'a11y.language': 'Sprache wählen',
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
  'footer.owner': 'Rudy Pastel',
  'contact.messageMeTitle': 'Message Moi',
  'contact.messageMeText':
    'Je me réjouis de votre demande et de développer ensemble de grandes solutions. N’hésitez pas à me contacter !',
  'a11y.skip': 'Aller au contenu',
  'a11y.menu': 'Menu',
  'a11y.nav': 'Navigation principale',
  'a11y.language': 'Choisir la langue',
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
  'footer.privacy': 'Privacy Policy',
  'footer.imprint': 'Imprint',
  'footer.owner': 'Rudy Pastel',
  'contact.messageMeTitle': 'Message me!',
  'contact.messageMeText':
    'I look forward to hearing from you and developing great solutions together. Don’t hesitate to contact me!',
  'a11y.skip': 'Skip to content',
  'a11y.menu': 'Menu',
  'a11y.nav': 'Main navigation',
  'a11y.language': 'Choose language',
} satisfies Record<UiKey, string>;

export const ui: Record<Locale, Record<UiKey, string>> = { de, fr, en };

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}
