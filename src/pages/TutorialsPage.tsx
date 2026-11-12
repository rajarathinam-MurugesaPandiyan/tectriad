import React from 'react';
import { YouTubeSection } from '../components/YouTubeSection';

interface TutorialsPageProps {
  onOpenVideoModal: (videoId: string, videoTitle: string) => void;
}

export const TutorialsPage: React.FC<TutorialsPageProps> = ({
  onOpenVideoModal,
}) => {
  return <YouTubeSection onOpenVideoModal={onOpenVideoModal} />;
};

