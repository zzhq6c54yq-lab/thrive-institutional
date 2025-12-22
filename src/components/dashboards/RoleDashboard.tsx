
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import VeteranDashboard from './VeteranDashboard';
import AdolescentDashboard from './AdolescentDashboard';
import FirstResponderDashboard from './FirstResponderDashboard';
import EducatorDashboard from './EducatorDashboard';
import CorporateDashboard from './CorporateDashboard';
import GoldenYearsDashboard from './GoldenYearsDashboard';
import DefaultDashboard from './DefaultDashboard';

const RoleDashboard: React.FC = () => {
  const { profile, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your personalized dashboard...</div>
      </div>
    );
  }

  if (!profile) {
    return <DefaultDashboard />;
  }

  switch (profile.user_type) {
    case 'veteran':
      return <VeteranDashboard />;
    case 'adolescent':
      return <AdolescentDashboard />;
    case 'first_responder':
      return <FirstResponderDashboard />;
    case 'educator':
      return <EducatorDashboard />;
    case 'corporate':
      return <CorporateDashboard />;
    case 'golden_years':
      return <GoldenYearsDashboard />;
    default:
      return <DefaultDashboard />;
  }
};

export default RoleDashboard;
