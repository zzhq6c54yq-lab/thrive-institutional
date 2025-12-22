import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteLoadingWrapper from "./components/RouteLoadingWrapper";
import NotFound from "./pages/NotFound";
import SiteLayout from "@/components/site/SiteLayout";
import SiteEntry from "@/pages/site/SiteEntry";
import SiteLanding from "@/pages/site/SiteLanding";
import SiteTherapy from "@/pages/site/SiteTherapy";
import SiteCoaching from "@/pages/site/SiteCoaching";
import SiteMeetHenry from "@/pages/site/SiteMeetHenry";
import SitePricing from "@/pages/site/SitePricing";
import SiteDemo from "@/pages/site/SiteDemo";
import SiteEngagement from "@/pages/site/SiteEngagement";
import SiteCareers from "@/pages/site/SiteCareers";
import SiteInvestors from "@/pages/site/SiteInvestors";
import SiteAbout from "@/pages/site/SiteAbout";
import SiteContact from "@/pages/site/SiteContact";
import SiteApp from "@/pages/site/SiteApp";
import SitePrivacyPolicy from "@/pages/site/SitePrivacyPolicy";
import SiteTermsOfService from "@/pages/site/SiteTermsOfService";
import SiteHIPAANotice from "@/pages/site/SiteHIPAANotice";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

const APP_DOMAIN = "thrive-mental.app";

function App() {
  return (
    <ErrorBoundary>
      <RouteLoadingWrapper>
        <div className="min-h-screen bg-black">
          <Routes>
            {/* Marketing Website Routes */}
            <Route element={<SiteLayout />}>
              <Route path="/" element={<SiteEntry />} />
              <Route path="/home" element={<SiteLanding />} />
              <Route path="/therapy" element={<SiteTherapy />} />
              <Route path="/coaching" element={<SiteCoaching />} />
              <Route path="/henry" element={<SiteMeetHenry />} />
              <Route path="/pricing" element={<SitePricing />} />
              <Route path="/demo" element={<SiteDemo />} />
              <Route path="/engagement" element={<SiteEngagement />} />
              <Route path="/careers" element={<SiteCareers />} />
              <Route path="/investors" element={<SiteInvestors />} />
              <Route path="/about" element={<SiteAbout />} />
              <Route path="/contact" element={<SiteContact />} />
              <Route path="/the-app" element={<SiteApp />} />
              <Route path="/privacy" element={<SitePrivacyPolicy />} />
              <Route path="/terms" element={<SiteTermsOfService />} />
              <Route path="/hipaa" element={<SiteHIPAANotice />} />
            </Route>

            {/* Redirect any /app/* routes to thrive-mental.app */}
            <Route path="/app/*" element={<RedirectToApp />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </RouteLoadingWrapper>
    </ErrorBoundary>
  );
}

function RedirectToApp() {
  const path = window.location.pathname;
  window.location.href = `https://${APP_DOMAIN}${path}`;
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Redirecting to app...</p>
    </div>
  );
}

export default App;
