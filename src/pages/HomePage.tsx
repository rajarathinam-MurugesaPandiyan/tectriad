import React from 'react';
import { Hero } from '../components/Hero';
import { ProductsSection } from '../components/ProductsSection';
import { YouTubeSection } from '../components/YouTubeSection';
import { MissionSection } from '../components/MissionSection';

interface HomePageProps {
  onOpenVideoModal: (videoId: string, videoTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenVideoModal }) => {
  return (
    <>
      <Hero />
      <ProductsSection />
      <YouTubeSection onOpenVideoModal={onOpenVideoModal} previewLimit={6} />
      <MissionSection />
    </>
  );
};

