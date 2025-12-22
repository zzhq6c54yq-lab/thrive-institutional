import React from 'react';
import Page from '@/components/Page';
import ProgressDashboard from '@/components/progress/ProgressDashboard';

const ProgressDashboardPage: React.FC = () => {
  return (
    <Page title="Progress Dashboard" showBackButton={true}>
      <ProgressDashboard />
    </Page>
  );
};

export default ProgressDashboardPage;