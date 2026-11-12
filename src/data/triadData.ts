import type { OfferingSummary, TriadMember } from '../types';
import { CHANNEL_HANDLE, CHANNEL_URL } from './videosData';
import rajarathinamImg from '../assets/rajarathinam.jpg';
import gowthamImg from '../assets/gowtham.JPG';
import garyImg from '../assets/gary.JPG';

export const TECTRIAD_MEMBERS: TriadMember[] = [
  {
    id: 'rajarathinam',
    name: 'Rajarathinam M',
    initial: 'R',
    avatar: rajarathinamImg,
    avatarPosition: '50% 34%',
    role: 'Co-Founder • The Triad',
    accentId: 'ethics-of-coding',
  },
  {
    id: 'gowtham',
    name: 'Gowtham M',
    initial: 'G',
    avatar: gowthamImg,
    avatarPosition: '50% 22%',
    role: 'Co-Founder • The Triad',
    accentId: 'xpense-cloud',
  },
  {
    id: 'gary',
    name: 'Gary A',
    initial: 'G',
    avatar: garyImg,
    avatarPosition: '50% 24%',
    role: 'Co-Founder • The Triad',
    accentId: 'streako',
  },
];

export const TECTRIAD_ORG = {
  name: 'Tectriad',
  eyebrow: 'Tectriad • Rajarathinam M, Gowtham M & Gary A',
  headlinePrefix: 'Built by Three Builders. Products & Services for',
  headlineAccent: 'Real Impact.',
  description:
    'Tectriad is the software and education organization founded by Rajarathinam M, Gowtham M, and Gary A—delivering Ethics Of Coding, xpense-cloud, and Streako.',
  offeringsLabel: 'Our Products & Services',
};

export const TECTRIAD_OFFERINGS: OfferingSummary[] = [
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
    statusLabel: 'Live • Android & Web',
    targetSection: '#product-streako',
    externalUrl: 'http://streako.in/',
  },
];
