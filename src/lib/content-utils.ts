import type { Locale } from '../i18n/routes';

type Localized = Record<Locale, string>;

const ongoingPrefix: Record<Locale, string> = {
  de: 'seit',
  fr: 'depuis',
  en: 'since',
};

const formatMonth = (value: string) => {
  const [year, month] = value.split('-');
  return `${month}/${year}`;
};

export const formatPeriod = (start: string, end: string, locale: Locale) =>
  end === 'ongoing'
    ? `${ongoingPrefix[locale]} ${formatMonth(start)}`
    : `${formatMonth(start)} - ${formatMonth(end)}`;

export const sortByOrder = <T extends { order: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order);

export type ReferenceEntry = {
  id: string;
  data: {
    client: string;
    start: string;
    end: string;
    description: Localized;
    order: number;
  };
};

export type ServiceEntry<Image = unknown> = {
  id: string;
  data: {
    key: 'r' | 'sql' | 'shiny';
    icon: Image;
    title: Localized;
    text: Localized;
    order: number;
  };
};

export type TestimonialEntry<Image = unknown> = {
  id: string;
  data: {
    quote: Localized;
    authorName: string;
    authorRole: string;
    photo: Image;
    order: number;
  };
};

const byOrder = <T extends { data: { order: number } }>(entries: T[]) =>
  sortByOrder(entries.map((entry) => ({ entry, order: entry.data.order }))).map(
    ({ entry }) => entry,
  );

export const localizeReferences = (entries: ReferenceEntry[], locale: Locale) =>
  byOrder(entries).map(({ id, data }) => ({
    id,
    client: data.client,
    period: formatPeriod(data.start, data.end, locale),
    description: data.description[locale],
    start: data.start,
    end: data.end,
  }));

export const localizeServices = <Image>(
  entries: ServiceEntry<Image>[],
  locale: Locale,
) =>
  byOrder(entries).map(({ id, data }) => ({
    id,
    key: data.key,
    icon: data.icon,
    title: data.title[locale],
    text: data.text[locale],
  }));

export const localizeTestimonials = <Image>(
  entries: TestimonialEntry<Image>[],
  locale: Locale,
) =>
  byOrder(entries).map(({ id, data }) => ({
    id,
    quote: data.quote[locale],
    authorName: data.authorName,
    authorRole: data.authorRole,
    photo: data.photo,
  }));
