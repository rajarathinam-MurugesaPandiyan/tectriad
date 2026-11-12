import type { ProductItem } from '../types';
import { CHANNEL_URL, CHANNEL_HANDLE } from './videosData';

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'xpense-cloud',
    brandId: 'xpense-cloud',
    kind: 'Product',
    name: 'xpense-cloud',
    category: 'FinTech & Cloud',
    badge: 'Finance Product',
    status: 'Live',
    platforms: 'Android • iOS • Web',
    tagline: 'Smart Cloud-Powered Expense Intelligence & Budget Analytics',
    description:
      'Built to replace cluttered spreadsheets with real-time cashflow visibility, visual budget caps, multi-currency tracking, and offline-first cross-device synchronization.',
    websiteUrl: 'https://xpense-cloud.in',
    websiteLabel: 'Launch xpense-cloud.in',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ethicsofcoding.xpensecloud',
    appStoreUrl: 'https://apps.apple.com/app/xpense-cloud/id1649201923',
    highlights: [
      'Real-time Cloud Sync',
      'Visual Spending Charts',
      'Offline-First Cache',
      'Multi-Currency Ready',
    ],
    stats: [
      { label: 'Platforms', value: 'Mobile + Web' },
      { label: 'Sync Engine', value: 'Offline-First' },
    ],
    features: [
      {
        title: 'Instant Expense Logging',
        description: 'Record transactions in seconds with tags, payment methods, and notes.',
        icon: 'lightning',
      },
      {
        title: 'Visual Analytics & Breakdown',
        description: 'Interactive category breakdowns, burn rate views, and savings trends.',
        icon: 'chart',
      },
      {
        title: 'Cross-Device Cloud Sync',
        description: 'Stay in sync across phone, tablet, and web with local offline resilience.',
        icon: 'cloud',
      },
      {
        title: 'End-to-End Privacy',
        description: 'Client-side encrypted caching with zero unsolicited third-party tracking.',
        icon: 'shield',
      },
    ],
  },
  {
    id: 'streako',
    brandId: 'streako',
    kind: 'Product',
    name: 'Streako',
    category: 'Habits & Productivity',
    badge: 'Habit Product',
    status: 'Live',
    platforms: 'Android • Web',
    tagline: 'Daily Habit Tracking, Streak Momentum & Consistency Analytics',
    description:
      'Designed to make consistency effortless. Track daily habits, protect active streaks, visualize long-term progress patterns, and turn small daily wins into lasting routines.',
    websiteUrl: 'http://streako.in/',
    websiteLabel: 'Open streako.in',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ethicsofcoding.streako',
    highlights: [
      'Daily Streak Engine',
      'Visual Heatmaps',
      'Smart Habit Check-ins',
      'Consistency Milestones',
    ],
    stats: [
      { label: 'Core Loop', value: 'Daily Streaks' },
      { label: 'Platforms', value: 'Android + Web' },
    ],
    features: [
      {
        title: 'Frictionless Daily Check-Ins',
        description: 'Log completed habits in one tap to keep your daily momentum alive.',
        icon: 'flame',
      },
      {
        title: 'Consistency Heatmaps',
        description: 'Spot strong weeks and patterns at a glance across clean calendar views.',
        icon: 'calendar',
      },
      {
        title: 'Focused Reminders',
        description: 'Stay accountable to your schedule without noisy notification fatigue.',
        icon: 'bell',
      },
      {
        title: 'Milestones & Progress',
        description: 'Celebrate unbroken runs and personal bests as habits compound over time.',
        icon: 'award',
      },
    ],
  },
  {
    id: 'ethics-of-coding',
    brandId: 'ethics-of-coding',
    kind: 'Service',
    name: 'Ethics Of Coding',
    category: 'Developer Education',
    badge: 'Education Service',
    status: 'Free Service',
    platforms: 'YouTube • GitHub • Web',
    tagline: 'Free Tamil Coding Masterclasses & Engineering Architecture Kits',
    description:
      'Tectriad’s developer education service—empowering learners without language barriers through in-depth Flutter, BLoC, React, and Clean Architecture tutorials.',
    internalHref: '/tutorials',
    internalLabel: 'Browse All 16+ Tutorials',
    externalActionUrl: `${CHANNEL_URL}?sub_confirmation=1`,
    externalActionLabel: `YouTube (${CHANNEL_HANDLE})`,
    highlights: [
      'Flutter & BLoC Mastery',
      'Clean Architecture',
      'Web & React 19 Kits',
      '100% Free in Tamil',
    ],
    stats: [
      { label: 'Curriculum', value: '16+ Masterclasses' },
      { label: 'Access', value: 'Free Forever' },
    ],
    features: [
      {
        title: 'Clean Architecture Pattern',
        description: 'Clear separation across Data, Domain, and Presentation layers.',
        icon: 'layers',
      },
      {
        title: 'Native Tamil Clarity',
        description: 'Enterprise concepts explained in approachable Tamil with zero fluff.',
        icon: 'code',
      },
      {
        title: 'Production State Systems',
        description: 'Real-world BLoC, API networking, error handling, and theme tokens.',
        icon: 'lightning',
      },
      {
        title: 'Open Learning Community',
        description: 'Guided developer education and reusable kits crafted by Tectriad.',
        icon: 'shield',
      },
    ],
  },
];
