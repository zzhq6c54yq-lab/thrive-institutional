import { Navigate } from "react-router-dom";

// Redirect to the full privacy policy on the marketing site
const PrivacyPolicy = () => {
  return <Navigate to="/privacy" replace />;
};

export default PrivacyPolicy;
