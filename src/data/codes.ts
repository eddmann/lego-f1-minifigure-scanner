import type { CarEntry } from '../types';

export const entries: CarEntry[] = [
  // North America (one code each)
  {
    id: 'ferrari',
    name: 'Ferrari',
    region: 'NA',
    codes: ['6538425'],
    imageUrl: `${import.meta.env.BASE_URL}cars/ferrari.png`,
  },
  {
    id: 'rb20',
    name: 'RB20',
    region: 'NA',
    codes: ['6538426'],
    imageUrl: `${import.meta.env.BASE_URL}cars/rb20.png`,
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG',
    region: 'NA',
    codes: ['6538427'],
    imageUrl: `${import.meta.env.BASE_URL}cars/mercedes.png`,
  },
  {
    id: 'aston',
    name: 'Aston Martin',
    region: 'NA',
    codes: ['6538428'],
    imageUrl: `${import.meta.env.BASE_URL}cars/aston.png`,
  },
  {
    id: 'vcarb',
    name: 'VCARB',
    region: 'NA',
    codes: ['6538429'],
    imageUrl: `${import.meta.env.BASE_URL}cars/vcarb.png`,
  },
  {
    id: 'sauber',
    name: 'Sauber',
    region: 'NA',
    codes: ['6538430'],
    imageUrl: `${import.meta.env.BASE_URL}cars/sauber.png`,
  },
  {
    id: 'alpine',
    name: 'Alpine',
    region: 'NA',
    codes: ['6538431'],
    imageUrl: `${import.meta.env.BASE_URL}cars/alpine.png`,
  },
  {
    id: 'williams',
    name: 'Williams',
    region: 'NA',
    codes: ['6538432'],
    imageUrl: `${import.meta.env.BASE_URL}cars/williams.png`,
  },
  {
    id: 'haas',
    name: 'Haas',
    region: 'NA',
    codes: ['6538433'],
    imageUrl: `${import.meta.env.BASE_URL}cars/haas.png`,
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    region: 'NA',
    codes: ['6538434'],
    imageUrl: `${import.meta.env.BASE_URL}cars/mclaren.png`,
  },
  {
    id: 'f1',
    name: 'F1',
    region: 'NA',
    codes: ['6538435'],
    imageUrl: `${import.meta.env.BASE_URL}cars/f1.png`,
  },
  {
    id: 'f1-academy',
    name: 'F1 Academy',
    region: 'NA',
    codes: ['6538436'],
    imageUrl: `${import.meta.env.BASE_URL}cars/f1-academy.png`,
  },

  // Europe (two codes each)
  {
    id: 'ferrari-eu',
    name: 'Ferrari',
    region: 'EU',
    codes: ['6536841', '6538305'],
    imageUrl: `${import.meta.env.BASE_URL}cars/ferrari.png`,
  },
  {
    id: 'rb20-eu',
    name: 'RB20',
    region: 'EU',
    codes: ['6536842', '6538306'],
    imageUrl: `${import.meta.env.BASE_URL}cars/rb20.png`,
  },
  {
    id: 'mercedes-eu',
    name: 'Mercedes-AMG',
    region: 'EU',
    codes: ['6536843', '6538307'],
    imageUrl: `${import.meta.env.BASE_URL}cars/mercedes.png`,
  },
  {
    id: 'aston-eu',
    name: 'Aston Martin',
    region: 'EU',
    codes: ['6536844', '6538308'],
    imageUrl: `${import.meta.env.BASE_URL}cars/aston.png`,
  },
  {
    id: 'vcarb-eu',
    name: 'VCARB',
    region: 'EU',
    codes: ['6536845', '6538309'],
    imageUrl: `${import.meta.env.BASE_URL}cars/vcarb.png`,
  },
  {
    id: 'sauber-eu',
    name: 'Sauber',
    region: 'EU',
    codes: ['6536846', '6538310'],
    imageUrl: `${import.meta.env.BASE_URL}cars/sauber.png`,
  },
  {
    id: 'alpine-eu',
    name: 'Alpine',
    region: 'EU',
    codes: ['6536847', '6538311'],
    imageUrl: `${import.meta.env.BASE_URL}cars/alpine.png`,
  },
  {
    id: 'williams-eu',
    name: 'Williams',
    region: 'EU',
    codes: ['6536848', '6538312'],
    imageUrl: `${import.meta.env.BASE_URL}cars/williams.png`,
  },
  {
    id: 'haas-eu',
    name: 'Haas',
    region: 'EU',
    codes: ['6536849', '6538313'],
    imageUrl: `${import.meta.env.BASE_URL}cars/haas.png`,
  },
  {
    id: 'mclaren-eu',
    name: 'McLaren',
    region: 'EU',
    codes: ['6536850', '6538314'],
    imageUrl: `${import.meta.env.BASE_URL}cars/mclaren.png`,
  },
  {
    id: 'f1-eu',
    name: 'F1',
    region: 'EU',
    codes: ['6536851', '6538315'],
    imageUrl: `${import.meta.env.BASE_URL}cars/f1.png`,
  },
  {
    id: 'f1-academy-eu',
    name: 'F1 Academy',
    region: 'EU',
    codes: ['6536852', '6538316'],
    imageUrl: `${import.meta.env.BASE_URL}cars/f1-academy.png`,
  },
];

export const codeIndex: Record<string, CarEntry> = Object.fromEntries(
  entries.flatMap(e => e.codes.map(c => [c, e] as const))
);

export function findCarByCode(
  rawCode: string | undefined | null
): CarEntry | undefined {
  if (!rawCode) return undefined;
  const normalized = String(rawCode).trim();
  return codeIndex[normalized];
}
