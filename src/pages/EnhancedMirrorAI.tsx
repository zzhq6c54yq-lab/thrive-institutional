import React from 'react';
import Page from '@/components/Page';
import EnhancedMirrorAI from '@/components/ai/EnhancedMirrorAI';

const EnhancedMirrorAIPage: React.FC = () => {
  return (
    <Page title="Enhanced MirrorAI" showBackButton={true}>
      <EnhancedMirrorAI />
    </Page>
  );
};

export default EnhancedMirrorAIPage;