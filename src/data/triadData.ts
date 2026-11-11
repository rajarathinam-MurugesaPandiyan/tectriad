import type { OfferingSummary, TriadMember } from '../types';
import { CHANNEL_HANDLE, CHANNEL_URL } from './videosData';

export const TECH_TRIAD_MEMBERS: TriadMember[] = [
  {
    id: 'rajarathinam',
    name: 'Rajarathinam',
    initial: 'R',
    role: 'Co-Founder • The Triad',
    accentId: 'ethics-of-coding',
  },
  {
    id: 'gowtham',
    name: 'Gowtham',
    initial: 'G',
    role: 'Co-Founder • The Triad',
    accentId: 'xpense-cloud',
  },
  {
    id: 'gary',
    name: 'Gary',
    initial: 'G',
    role: 'Co-Founder • The Triad',
    accentId: 'streako',
  },
];

export const TECH_TRIAD_ORG = {
  name: 'Tech Triad',
  eyebrow: 'Tech Triad • Rajarathinam, Gowtham & Gary',
  headlinePrefix: 'Built by Three Builders. Products & Services for',
  headlineAccent: 'Real Impact.',
  description:
    'Tech Triad is the software and education organization founded by Rajarathinam, Gowtham, and Gary—delivering Ethics Of Coding, xpense-cloud, and Streako.',
  offeringsLabel: 'Our Products & Services',
};

export const TECH_TRIAD_OFFERINGS: OfferingSummary[] = [
  {
    id: 'ethics-of-coding',
    kind: 'Service',
    name: 'Ethics Of Coding',
    domainLabel: CHANNEL_HANDLE,
    roleLabel: 'Service • Developer Education & DevKits',
    summary:
      'Free software engineering masterclasses in Tamil covering Flutter, BLoC, Web Dev, and Clean Architecture.',
    statusLabel: '16+ Free Tutorials',
    targetSection: '#videos',
    externalUrl: CHANNEL_URL,
  },
  {
    id: 'xpense-cloud',
    kind: 'Product',
    name: 'xpense-cloud',
    domainLabel: 'xpense-cloud.in',
    roleLabel: 'Product • Cloud Expense Intelligence',
    summary:
      'Real-time cashflow visibility, visual budget analytics, and offline-resilient multi-device sync.',
    statusLabel: 'Live • Web & Mobile',
    targetSection: '#product-xpense-cloud',
    externalUrl: 'https://xpense-cloud.in',
  },
  {
    id: 'streako',
    kind: 'Product',
    name: 'Streako',
    domainLabel: 'streako.in',
    roleLabel: 'Product • Habit & Streak Tracker',
    summary:
      'Build lasting daily routines with effortless check-ins, visual consistency streaks, and habit momentum.',
    statusLabel: 'Live • Web App',
    targetSection: '#product-streako',
    externalUrl: 'http://streako.in/',
  },
];
