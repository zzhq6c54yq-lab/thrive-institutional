import React from 'react';
import Page from '@/components/Page';
import PersonalizedRecommendations from '@/components/recommendations/PersonalizedRecommendations';

const PersonalizedRecommendationsPage: React.FC = () => {
  return (
    <Page title="Personalized Recommendations" showBackButton={true}>
      <PersonalizedRecommendations />
    </Page>
  );
};

export default PersonalizedRecommendationsPage;