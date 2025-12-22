import React from 'react';
import Page from '@/components/Page';
import EnhancedAudioTherapy from '@/components/audio/EnhancedAudioTherapy';

const EnhancedAudioTherapyPage: React.FC = () => {
  return (
    <Page title="Enhanced Audio Therapy" showBackButton={true}>
      <EnhancedAudioTherapy />
    </Page>
  );
};

export default EnhancedAudioTherapyPage;