import type { Locale } from '../../i18n/routes';

export interface AboutCopy {
  passionHeading: string;
  intro: string;
  talk: string;
  contactLabel: string;
  educationHeading: string;
  education: string;
  personalHeading: string;
  personal: [string, string];
  skillsHeading: string;
  skills: [string, string];
  cvLabel: string;
  expertiseHeading: string;
  expertise: [string, string, string, string];
  languagesHeading: string;
  /** Words between ** are shown in bold, as on the live site. */
  languages: [string, string, string, string];
  testimonialsHeading: string;
  testimonialsLead: string;
  closingHeading: string;
  closing: string;
}

export const aboutCopy: Record<Locale, AboutCopy> = {
  de: {
    passionHeading: 'Datenanalyse ist meine Passion',
    intro:
      'Hallo! Ich bin Dr. Rudy Pastel, ein erfahrener Data Science Freelancer mit Sitz in Europa und einem starken Hintergrund in Datenanalyse, statistischer Modellierung und Softwareentwicklung. Meine berufliche Reise hat mich durch verschiedene Rollen in renommierten Unternehmen geführt, in denen ich stets innovative Lösungen für komplexe Probleme geliefert habe.',
    talk: 'Lassen Sie uns reden!',
    contactLabel: 'Jetzt kontaktieren',
    educationHeading: 'Bildung',
    education:
      'Ich habe einen Doktortitel in Angewandter Mathematik von der ONERA in Paris, wo ich mit dem „PhD Student 2011 Award“ ausgezeichnet wurde. Außerdem habe ich einen Master of Science von der ENSTA Paris Tech mit einem Schwerpunkt auf angewandte Mathematik, Informatik und Physik.',
    personalHeading: 'Persönliche Note',
    personal: [
      'Neben meinem Berufsleben habe ich eine Weltreise durch die Karibik, Südostasien, Australien und Neuseeland unternommen, die meinen Horizont erweitert und meine Lebenserfahrungen bereichert hat.',
      'Ich bin leidenschaftlich daran interessiert, Daten zu nutzen, um Einblicke zu gewinnen und fundierte Entscheidungen zu treffen. Wenn Ihr Unternehmen einen engagierten und sachkundigen Datenanalysten sucht, lassen Sie uns in Kontakt treten und sehen, wie ich zu Ihrem Erfolg beitragen kann.',
    ],
    skillsHeading: 'Fähigkeiten und Werkzeuge',
    skills: [
      'Ich beherrsche R, Shiny, SQL und Git und habe umfangreiche Erfahrung in statistischer Analyse, maschinellem Lernen und Data Mining.',
      'Ich habe ein Talent dafür, komplexe wissenschaftliche, technische und geschäftliche Probleme in praktische Lösungen umzusetzen.',
    ],
    cvLabel: 'CV anfordern',
    expertiseHeading: 'Zu meinen Fachgebieten gehören:',
    expertise: ['Machine Learning', 'Statistik', 'Data Mining', 'Modelling'],
    languagesHeading: 'Sprachkenntnisse',
    languages: [
      'fließend **Englisch** (C2),',
      '**Deutsch** (C1.2) und',
      '**Französisch** (Muttersprache) sowie',
      'fortgeschrittenes **Spanisch** (A2).',
    ],
    testimonialsHeading: 'Kundenstimmen',
    testimonialsLead: 'Das sagen meine Kunden über mich.',
    closingHeading: 'Lassen Sie uns reden!',
    closing:
      'Ich freue mich auf das Gespräch mit Ihnen und neue Aufgaben zu entdecken. Lassen Sie uns gemeinsam tolle Lösungen finden.',
  },
  fr: {
    passionHeading: "L'analyse des données est ma passion",
    intro:
      'Bonjour! Je suis Dr. Rudy Pastel, un freelance en Data Science basé en Europe, avec une solide expérience en analyse de données, modélisation statistique et développement de logiciels. Mon parcours professionnel m’a conduit à occuper divers rôles dans des entreprises de renom, où j’ai constamment apporté des solutions innovantes à des problèmes complexes.',
    talk: 'Parlons-en',
    contactLabel: 'Contactez-moi',
    educationHeading: 'Education',
    education:
      'Je suis titulaire d’un doctorat en mathématiques appliquées de l’ONERA, Paris, où j’ai été honoré du « PhD Student 2011 Award ». J’ai également un Master of Science de l’ENSTA Paris Tech, avec une spécialisation en mathématiques appliquées, informatique et physique.',
    personalHeading: 'Note personnelle',
    personal: [
      'En dehors de ma vie professionnelle, j’ai entrepris un tour du monde à travers les Caraïbes, l’Asie du Sud-Est, l’Australie et la Nouvelle-Zélande, ce qui a élargi mes perspectives et enrichi mes expériences de vie.',
      'Je suis passionné par l’utilisation des données pour obtenir des insights et prendre des décisions éclairées. Si votre entreprise recherche un analyste de données dédié et compétent, connectons-nous et voyons comment je peux contribuer à votre succès.',
    ],
    skillsHeading: 'Compétences et outils',
    skills: [
      'Je maîtrise R, Shiny, SQL et Git, avec une vaste expérience en analyse statistique, apprentissage automatique et fouille de données.',
      'J’ai un talent pour comprendre et formaliser des problèmes scientifiques, techniques et commerciaux complexes en solutions pratiques.',
    ],
    cvLabel: 'Demandez mon CV',
    expertiseHeading: 'Mes compétences comprennent',
    expertise: [
      'Machine learning',
      'Statistiques',
      'Data mining',
      'Modélisation',
    ],
    languagesHeading: 'Langues',
    languages: [
      'couramment **anglais** (C2),',
      '**allemand** (C1.2) et',
      '**français** (langue maternelle)',
      'ainsi que **l’espagnol** avancé (A2).',
    ],
    testimonialsHeading: 'Témoignages de clients',
    testimonialsLead: 'Voici ce que mes clients disent de moi.',
    closingHeading: 'Parlons-en.',
    closing:
      'Je me réjouis de discuter avec vous et de découvrir de nouvelles tâches. Trouvons ensemble des solutions formidables.',
  },
  en: {
    passionHeading: 'Data analysis is my passion',
    intro:
      'Hello! I am Dr. Rudy Pastel, a freelance Data Scientist based in Europe, with a strong background in data analysis, statistical modeling, and software development. My professional journey has taken me through various roles in renowned companies, where I have consistently delivered innovative solutions to complex problems.',
    talk: 'Let us talk',
    contactLabel: 'Contact now',
    educationHeading: 'Education',
    education:
      'I hold a PhD in Applied Mathematics from ONERA, Paris, where I was honored with the “PhD Student 2011 Award”. I also have a Master of Science degree from ENSTA Paris Tech, with a focus on applied mathematics, computer sciences, and physics.',
    personalHeading: 'Personal touch',
    personal: [
      'Beyond my professional life, I embarked on a world tour across the Caribbean, South-East Asia, Australia, and New Zealand, which broadened my perspectives and enriched my life experiences.',
      'I am passionate about leveraging data to drive insights and make informed decisions. If your company is looking for a dedicated and knowledgeable data analyst, let’s connect and see how I can contribute to your success.',
    ],
    skillsHeading: 'Skills and tools',
    skills: [
      'I am proficient in R, Shiny, SQL, and Git, with extensive experience in statistical analysis, machine learning, and data mining.',
      'I have a knack for understanding and formalizing complex scientific, technical, and business problems into practical solutions.',
    ],
    cvLabel: 'Request CV',
    expertiseHeading: 'My expertise includes',
    expertise: ['Machine learning', 'Statistics', 'Data mining', 'Modelling'],
    languagesHeading: 'Language skills',
    languages: [
      'fluent in **English** (C2),',
      '**German** (C1.2), and',
      '**French** (native),',
      'with advanced proficiency in **Spanish** (A2).',
    ],
    testimonialsHeading: 'Customer testimonials',
    testimonialsLead: 'This is what my clients say about me.',
    closingHeading: 'Let us talk',
    closing:
      'I look forward to our conversation and discovering new tasks. Let’s find great solutions together.',
  },
};
