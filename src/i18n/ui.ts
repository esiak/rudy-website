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
  'form.name': 'Name',
  'form.email': 'E-Mail',
  'form.message': 'Nachricht',
  'form.submit': 'Senden',
  'form.messagePlaceholder': 'Nachricht',
  'form.error.nameRequired': 'Bitte geben Sie Ihren Namen ein.',
  'form.error.emailRequired': 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
  'form.error.emailInvalid': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  'form.error.messageRequired': 'Bitte geben Sie eine Nachricht ein.',
  'form.privacyNote':
    'Ich verwende Ihre Angaben nur, um auf Ihre Nachricht zu antworten.',
  'form.privacyLink': 'Datenschutzerklärung',
  'contact.formTitle': 'Ihre Nachricht',
  'contact.messageMeTitle': 'Message Me',
  'contact.messageMeText':
    'Ich freue mich auf Ihre Anfrage und darauf, gemeinsam großartige Lösungen zu entwickeln. Kontaktieren Sie mich gerne!',
  'contact.thanksTitle': 'Vielen Dank für Ihre Nachricht',
  'contact.thanksText': 'Ich melde mich bald bei Ihnen.',
  'contact.backHome': 'Zurück zur Startseite',
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
  'form.name': 'Nom',
  'form.email': 'E-Mail',
  'form.message': 'Message',
  'form.submit': 'Envoyer',
  'form.messagePlaceholder': 'Votre message',
  'form.error.nameRequired': 'Veuillez saisir votre nom.',
  'form.error.emailRequired': 'Veuillez saisir votre adresse e-mail.',
  'form.error.emailInvalid': 'Veuillez saisir une adresse e-mail valide.',
  'form.error.messageRequired': 'Veuillez saisir un message.',
  'form.privacyNote':
    'J’utilise vos données uniquement pour répondre à votre message.',
  'form.privacyLink': 'Politique de confidentialité',
  'contact.formTitle': 'Formulaire',
  'contact.messageMeTitle': 'Message Moi',
  'contact.messageMeText':
    'Je me réjouis de votre demande et de développer ensemble de grandes solutions. N’hésitez pas à me contacter !',
  'contact.thanksTitle': 'Merci pour votre message',
  'contact.thanksText': 'Je vous répondrai bientôt.',
  'contact.backHome': 'Retour à l’accueil',
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
  'form.name': 'Name',
  'form.email': 'Email',
  'form.message': 'Message',
  'form.submit': 'Submit',
  'form.messagePlaceholder': 'Your message',
  'form.error.nameRequired': 'Please enter your name.',
  'form.error.emailRequired': 'Please enter your email address.',
  'form.error.emailInvalid': 'Please enter a valid email address.',
  'form.error.messageRequired': 'Please enter a message.',
  'form.privacyNote': 'I only use your details to reply to your message.',
  'form.privacyLink': 'Privacy policy',
  'contact.formTitle': 'Contact form',
  'contact.messageMeTitle': 'Message me!',
  'contact.messageMeText':
    'I look forward to hearing from you and developing great solutions together. Don’t hesitate to contact me!',
  'contact.thanksTitle': 'Thank you for your message',
  'contact.thanksText': 'I’ll get back to you soon.',
  'contact.backHome': 'Back to Home',
  'a11y.skip': 'Skip to content',
  'a11y.menu': 'Menu',
  'a11y.nav': 'Main navigation',
  'a11y.language': 'Choose language',
} satisfies Record<UiKey, string>;

export const ui: Record<Locale, Record<UiKey, string>> = { de, fr, en };

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}
