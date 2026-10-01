import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import CountryPage from "./pages/CountryPage";
import CountriesIndex from "./pages/CountriesIndex";
import StudyInUKPage from "./pages/StudyInUKPage";
import StudyInCanadaPage from "./pages/StudyInCanadaPage";
import StudyInUSAPage from "./pages/StudyInUSAPage";
import StudyInAustraliaPage from "./pages/StudyInAustraliaPage";
import StudyInNZPage from "./pages/StudyInNZPage";
import StudyInIrelandPage from "./pages/StudyInIrelandPage";
import StudyInFrancePage from "./pages/StudyInFrancePage";
import StudyInGermanyPage from "./pages/StudyInGermanyPage";
import StudyInDubaiPage from "./pages/StudyInDubaiPage";
import StudyInSwitzerlandPage from "./pages/StudyInSwitzerlandPage";
import StudyInMalaysiaPage from "./pages/StudyInMalaysiaPage";
import StudyInMauritiusPage from "./pages/StudyInMauritiusPage";
import StudyInItalyPage from "./pages/StudyInItalyPage";
import StudyInSingaporePage from "./pages/StudyInSingaporePage";
import StudyInNetherlandsPage from "./pages/StudyInNetherlandsPage";
import StudyInIndiaPage from "./pages/StudyInIndiaPage";
import StudyInSpainPage from "./pages/StudyInSpainPage";
import StudyInRussiaPage from "./pages/StudyInRussiaPage";
import StudyInChinaPage from "./pages/StudyInChinaPage";
import StudyInJapanPage from "./pages/StudyInJapanPage";
import TestPreparationsPage from "./pages/services/TestPreparationsPage";
import CareerCounsellingPage from "./pages/services/CareerCounsellingPage";
import AdmissionGuidancePage from "./pages/services/AdmissionGuidancePage";
import FinancialAssistancePage from "./pages/services/FinancialAssistancePage";
import ScholarshipAssistancePage from "./pages/services/ScholarshipAssistancePage";
import TravelForexPage from "./pages/services/TravelForexPage";
import VisaAssistancePage from "./pages/services/VisaAssistancePage";
import StudentAccommodationPage from "./pages/services/StudentAccommodationPage";
import InsuranceAssistancePage from "./pages/services/InsuranceAssistancePage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import BlogsPage from "./pages/BlogsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import ThankYouPage from "./pages/ThankYouPage";
import LegalPage, { LEGAL_DOCS } from "./pages/legal/LegalPage";
import LocationsIndexPage, { LocationRouter, LocationAliasRedirect, LegacyLocationRedirect } from "./pages/LocationPage";

import FloatingContactWidget from "@/components/FloatingContactWidget";
import FloatingCalculator from "@/components/FloatingCalculator";
import EnquiryPopup from "@/components/EnquiryPopup";
import ScrollToTop from "@/components/ScrollToTop";
import MetaPixelRouteTracker from "@/components/MetaPixelRouteTracker";
import GlobalLeadTracker from "@/components/GlobalLeadTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          {/* Fires a Meta PageView on every route change. Inert until a pixel ID
              is set in src/config/site.ts — see the note there. */}
          <MetaPixelRouteTracker />
          {/* Fires a Meta Lead event on WhatsApp and Call CTA clicks across
              every page via document-level event delegation. */}
          <GlobalLeadTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/countries" element={<CountriesIndex />} />

            {/* ─── Custom Country Pages (new URL pattern: /study-in-{country}) ─── */}
            <Route path="/study-in-uk" element={<StudyInUKPage />} />
            <Route path="/study-in-canada" element={<StudyInCanadaPage />} />
            <Route path="/study-in-usa" element={<StudyInUSAPage />} />
            <Route path="/study-in-australia" element={<StudyInAustraliaPage />} />
            <Route path="/study-in-new-zealand" element={<StudyInNZPage />} />
            <Route path="/study-in-ireland" element={<StudyInIrelandPage />} />
            <Route path="/study-in-france" element={<StudyInFrancePage />} />
            <Route path="/study-in-germany" element={<StudyInGermanyPage />} />
            <Route path="/study-in-dubai" element={<StudyInDubaiPage />} />
            <Route path="/study-in-switzerland" element={<StudyInSwitzerlandPage />} />
            <Route path="/study-in-malaysia" element={<StudyInMalaysiaPage />} />
            <Route path="/study-in-mauritius" element={<StudyInMauritiusPage />} />
            <Route path="/study-in-italy" element={<StudyInItalyPage />} />
            <Route path="/study-in-singapore" element={<StudyInSingaporePage />} />
            <Route path="/study-in-netherlands" element={<StudyInNetherlandsPage />} />
            <Route path="/study-in-india" element={<StudyInIndiaPage />} />
            <Route path="/study-in-spain" element={<StudyInSpainPage />} />
            <Route path="/study-in-russia" element={<StudyInRussiaPage />} />
            <Route path="/study-in-china" element={<StudyInChinaPage />} />
            <Route path="/study-in-japan" element={<StudyInJapanPage />} />

            {/* ─── Redirect old /countries/{slug} to new /study-in-{slug} URLs ─── */}
            <Route path="/countries/uk" element={<Navigate to="/study-in-uk" replace />} />
            <Route path="/countries/canada" element={<Navigate to="/study-in-canada" replace />} />
            <Route path="/countries/usa" element={<Navigate to="/study-in-usa" replace />} />
            <Route path="/countries/australia" element={<Navigate to="/study-in-australia" replace />} />
            <Route path="/countries/new-zealand" element={<Navigate to="/study-in-new-zealand" replace />} />
            <Route path="/countries/ireland" element={<Navigate to="/study-in-ireland" replace />} />
            <Route path="/countries/france" element={<Navigate to="/study-in-france" replace />} />
            <Route path="/countries/germany" element={<Navigate to="/study-in-germany" replace />} />
            <Route path="/countries/dubai" element={<Navigate to="/study-in-dubai" replace />} />
            <Route path="/countries/uae" element={<Navigate to="/study-in-dubai" replace />} />
            <Route path="/countries/switzerland" element={<Navigate to="/study-in-switzerland" replace />} />
            <Route path="/countries/malaysia" element={<Navigate to="/study-in-malaysia" replace />} />
            <Route path="/countries/mauritius" element={<Navigate to="/study-in-mauritius" replace />} />
            <Route path="/countries/italy" element={<Navigate to="/study-in-italy" replace />} />
            <Route path="/countries/singapore" element={<Navigate to="/study-in-singapore" replace />} />
            <Route path="/countries/netherlands" element={<Navigate to="/study-in-netherlands" replace />} />
            <Route path="/countries/india" element={<Navigate to="/study-in-india" replace />} />
            <Route path="/countries/spain" element={<Navigate to="/study-in-spain" replace />} />
            <Route path="/countries/russia" element={<Navigate to="/study-in-russia" replace />} />
            <Route path="/countries/china" element={<Navigate to="/study-in-china" replace />} />
            <Route path="/countries/japan" element={<Navigate to="/study-in-japan" replace />} />

            {/* ─── Generic country page for countries without custom pages ─── */}
            <Route path="/countries/:countrySlug" element={<CountryPage />} />

            {/* ─── Service Pages ─── */}
            <Route path="/test-preparations" element={<TestPreparationsPage />} />
            <Route path="/career-counselling" element={<CareerCounsellingPage />} />
            <Route path="/admission-guidance" element={<AdmissionGuidancePage />} />
            <Route path="/financial-assistance" element={<FinancialAssistancePage />} />
            <Route path="/scholarship-assistance" element={<ScholarshipAssistancePage />} />
            <Route path="/travel-forex-assistance" element={<TravelForexPage />} />
            <Route path="/visa-assistance" element={<VisaAssistancePage />} />
            <Route path="/student-accommodation" element={<StudentAccommodationPage />} />
            <Route path="/insurance-assistance" element={<InsuranceAssistancePage />} />

            {/* ─── Location Pages (states & cities) ─── */}
            {/* The hub. Links to every state and city page, so a crawler can
                reach all of them from one place. */}
            <Route path="/locations" element={<LocationsIndexPage />} />
            {/* The old structure. Kept so indexed /locations/... URLs redirect
                instead of 404ing; the hosting configs do the real 301. */}
            <Route path="/locations/:slug" element={<LegacyLocationRedirect />} />

            {/* ─── Legal Pages ─── */}
            <Route path="/privacy-policy" element={<LegalPage doc={LEGAL_DOCS["privacy-policy"]} />} />
            <Route path="/terms-and-conditions" element={<LegalPage doc={LEGAL_DOCS["terms-and-conditions"]} />} />
            {/* The old URL. Nothing is indexed yet, but the redirect costs nothing
                and protects any link already shared. */}
            <Route path="/terms-of-service" element={<Navigate to="/terms-and-conditions" replace />} />
            <Route path="/disclaimer" element={<LegalPage doc={LEGAL_DOCS["disclaimer"]} />} />
            <Route path="/cookie-policy" element={<LegalPage doc={LEGAL_DOCS["cookie-policy"]} />} />

            {/* ─── About & Contact Pages ─── */}
            {/* ─── Content pages ─── */}
            <Route path="/blogs" element={<BlogsPage />} />
            {/* /blog → /blogs, because people type both and one of them has to be canonical. */}
            <Route path="/blog" element={<Navigate to="/blogs" replace />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            {/* Common alternates people type or link to. All 301 to /reviews. */}
            <Route path="/testimonials" element={<Navigate to="/reviews" replace />} />
            <Route path="/success-stories" element={<Navigate to="/reviews" replace />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THIS LINE.
                Everything below is a catch-all and will swallow new paths. */}

            {/* Location pages live at the site root: /study-abroad-consultants-in-mumbai.
                React Router v6 ranks static segments above dynamic ones, so every
                route declared above still wins over this one — but a new static
                route added BELOW it would not. LocationRouter renders NotFound for
                any segment that is not a real state or city. */}
            <Route path="/:locationSlug" element={<LocationRouter />} />

            {/* Multi-segment keyword aliases and anything else → 404. */}
            <Route path="*" element={<LocationAliasRedirect />} />
          </Routes>
          <FloatingContactWidget />
          {/* Bottom-left, opposite the contact widget. Also opens on the
              #calculator hash, so the hero, How It Works and footer links that
              used to scroll to the homepage section still work. */}
          <FloatingCalculator />
          {/* Sitewide enquiry form. Appears 20 seconds after a page settles, on
              any route except /contact — interrupting someone who is already
              looking at a form to hand them a second form is worse than doing
              nothing. Dismissal is remembered; a submitted enquiry suppresses it
              for good. The delay is what keeps it clear of Google's intrusive
              interstitial guidance — see ENQUIRY_POPUP in src/config/site.ts. */}
          <EnquiryPopup />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
