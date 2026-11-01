import type { Locale } from './routes';

type HomeKey =
  | 'name'
  | 'tagline'
  | 'qualification'
  | 'portraitAlt'
  | 'description'
  | 'partnerHeading'
  | 'partnerText'
  | 'referencesHeading'
  | 'referencesIntro'
  | 'exampleHeading'
  | 'exampleSubheading'
  | 'exampleText1'
  | 'exampleText2'
  | 'exampleText3'
  | 'servicesHeading'
  | 'servicesIntro'
  | 'testimonialsHeading'
  | 'testimonialsIntro'
  | 'closingLine'
  | 'signature';

export const home = {
  de: {
    name: 'Dr. Rudy Pastel',
    tagline: 'Freelance Data Scientist',
    qualification: 'Promotion in angewandter Mathematik.',
    portraitAlt: 'Porträt von Dr. Rudy Pastel',
    description:
      'Freelance Data Scientist. Ich bin Franzose, lebe und arbeite seit über 10 Jahren in Deutschland. Ich bin ein perfektes Bindeglied für deutsch-französische Teams.',
    partnerHeading: 'Partner für Ihre nationalen und internationalen Projekte',
    partnerText:
      'Ich bin Franzose, lebe und arbeite seit über 10 Jahren in Deutschland. Ich bin ein perfektes Bindeglied für deutsch-französische Teams.',
    referencesHeading: 'Referenzen',
    referencesIntro:
      'Ein kleiner Überblick über meine Kunden mit Projektbeispielen.',
    exampleHeading: 'Beispielprojekt',
    exampleSubheading: 'Replikation einer chemischen Substanz',
    exampleText1:
      'Die Eigenschaften einer chemischen Verbindung hängen von ihrer molekularen Zusammensetzung ab. Wenn die Verbindung teuer, selten oder schwer zu beschaffen ist, kann man versuchen, ihre Zusammensetzung durch Mischen der vorhandenen Ausgangsstoffe nachzubilden. Die Schwierigkeit besteht darin, eine Mischung zu finden, die ein angemessenes Gleichgewicht zwischen Eigenschaften und Preis herstellt.',
    exampleText2:
      'Das Chemieunternehmen möchte diesen Prozess automatisieren, um die Experten zu entlasten.',
    exampleText3:
      'Meine Aufgabe war es, die Experten bei einer datengetriebenen Replikation zu unterstützen.',
    servicesHeading: 'Meine Leistungen',
    servicesIntro: 'Hier eine Übersicht meiner Leistungsangebote für Sie.',
    testimonialsHeading: 'Kundenstimmen',
    testimonialsIntro: 'Das sagen meine Kunden über mich.',
    closingLine: 'Ich freue mich auf Ihre Herausforderungen.',
    signature: 'Dr. Rudy Pastel',
  },
  fr: {
    name: 'Dr. Rudy Pastel',
    tagline: 'Data Scientist indépendant',
    qualification: 'Ingénieur ENSTA & Docteur en mathématiques appliquées',
    portraitAlt: 'Portrait de Dr Rudy Pastel',
    description:
      'Data Scientist indépendant. Je suis français, je vis et travaille en Allemagne depuis plus de 10 ans. Je suis un lien parfait pour les équipes franco-allemandes.',
    partnerHeading: 'Partenaires pour vos projets nationaux et internationaux',
    partnerText:
      'Je suis français, je vis et travaille en Allemagne depuis plus de 10 ans. Je suis un lien parfait pour les équipes franco-allemandes.',
    referencesHeading: 'Références',
    referencesIntro:
      'Un bref aperçu de mes clients avec des exemples de projets.',
    exampleHeading: 'Exemple de projet',
    exampleSubheading: "Réplication d'une substance chimique",
    exampleText1:
      'Les propriétés d’un composé chimique dépendent de sa composition moléculaire. Si le composé est cher, rare ou difficile à obtenir, on peut essayer de reproduire sa composition en mélangeant les substances de base existantes. La difficulté consiste à trouver un mélange qui permette d’atteindre un équilibre raisonnable entre les propriétés et le prix.',
    exampleText2:
      'L’entreprise chimique souhaite automatiser ce processus afin d’alléger la charge de travail des experts.',
    exampleText3:
      'Ma mission consistait à aider les experts à réaliser une réplication pilotée par les données.',
    servicesHeading: 'Mes services',
    servicesIntro:
      'Je propose des services complets, garantissant excellence académique et fiabilité professionnelle.',
    testimonialsHeading: 'Témoignages de clients',
    testimonialsIntro: 'Voici ce que mes clients disent de moi.',
    closingLine: 'Je me réjouis de vos défis.',
    signature: 'Dr. Rudy Pastel',
  },
  en: {
    name: 'Dr. Rudy Pastel',
    tagline: 'Freelance Data Scientist',
    qualification: 'PhD in applied mathematics.',
    portraitAlt: 'Portrait of Dr. Rudy Pastel',
    description:
      'Freelance Data Scientist. I am French and have been living and working in Germany for over 10 years. I am a perfect link for Franco-German teams.',
    partnerHeading: 'Partner for your national and international projects',
    partnerText:
      'I am French and have been living and working in Germany for over 10 years. I am a perfect link for Franco-German teams.',
    referencesHeading: 'References',
    referencesIntro: 'A brief overview of my clients with project examples.',
    exampleHeading: 'Example project',
    exampleSubheading: 'Replication of a chemical substance',
    exampleText1:
      'The properties of a chemical compound depend on its molecular composition. If the compound is expensive, rare or difficult to obtain, you can try to recreate its composition by mixing the existing starting materials. The difficulty lies in finding a mixture that strikes an appropriate balance between properties and price.',
    exampleText2:
      'The chemical company would like to automate this process in order to reduce the workload on the experts.',
    exampleText3:
      'My task was to support the experts with data-driven replication.',
    servicesHeading: 'My services',
    servicesIntro:
      'I offer comprehensive services tailored to your needs, ensuring academic excellence and professional reliability.',
    testimonialsHeading: 'Customer testimonials',
    testimonialsIntro: 'This is what my clients say about me.',
    closingLine: 'I am looking forward to new challenges.',
    signature: 'Dr. Rudy Pastel',
  },
} satisfies Record<Locale, Record<HomeKey, string>>;
