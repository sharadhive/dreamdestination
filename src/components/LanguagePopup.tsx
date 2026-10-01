import { useState, useEffect } from "react";
import { Globe, X, Check, ChevronDown, Sparkles } from "lucide-react";
import {
  useLanguage,
  LANGUAGES,
  COUNTRY_LANGUAGE_MAP,
  getLanguageByCode,
  type Language,
} from "@/contexts/LanguageContext";

interface LanguagePopupProps {
  countrySlug: string;
  countryName: string;
  countryFlag: string;
}

const LanguagePopup = ({ countrySlug, countryName, countryFlag }: LanguagePopupProps) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const countryLangCode = COUNTRY_LANGUAGE_MAP[countrySlug] || "en";
  const countryLang = getLanguageByCode(countryLangCode);

  // Check if popup should show (once per country per session)
  useEffect(() => {
    const dismissedKey = `dd-lang-popup-${countrySlug}`;
    const dismissed = sessionStorage.getItem(dismissedKey);

    if (!dismissed && countryLangCode !== currentLanguage.code) {
      // Delay showing popup for better UX
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [countrySlug, countryLangCode, currentLanguage.code]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(`dd-lang-popup-${countrySlug}`, "true");
  };

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    handleDismiss();
  };

  // Primary suggestions: country language, English, Hindi, Marathi
  const primaryLangs = [
    countryLang,
    getLanguageByCode("en"),
    getLanguageByCode("hi"),
    getLanguageByCode("mr"),
  ].filter((l): l is Language => l !== undefined && l.code !== currentLanguage.code);

  // Remove duplicates
  const uniquePrimary = primaryLangs.filter(
    (lang, i, arr) => arr.findIndex((l) => l.code === lang.code) === i
  );

  // Other Indian languages for "More" section
  const moreLangs = LANGUAGES.filter(
    (l) =>
      l.region === "indian" &&
      !uniquePrimary.find((p) => p.code === l.code) &&
      l.code !== currentLanguage.code
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        /* No backdrop-blur: see the note in EnquiryPopup.tsx. */
        className="fixed inset-0 bg-black/55 z-[60] animate-fade-in"
        onClick={handleDismiss}
        style={{ animationDuration: "0.2s" }}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[61] flex items-center justify-center p-4">
        <div
          className="bg-card border rounded-2xl shadow-elegant w-full max-w-md overflow-hidden animate-bounce-in"
          style={{ animationDuration: "0.4s" }}
        >
          {/* Header */}
          <div className="bg-gradient-hero text-white p-5 relative">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-smooth"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Choose Your Language</h3>
                <p className="text-sm opacity-85">
                  View <span className="font-semibold">{countryFlag} {countryName}</span> page in your preferred language
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Language (Country's language) */}
          {countryLang && countryLang.code !== "en" && countryLang.code !== currentLanguage.code && (
            <div className="p-4 border-b bg-gradient-subtle">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-bold text-secondary uppercase tracking-wide">
                  Suggested for {countryName}
                </span>
              </div>
              <button
                onClick={() => handleSelectLanguage(countryLang)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-smooth group"
              >
                <span className="text-2xl">{countryLang.flag}</span>
                <div className="flex-1 text-left">
                  <span className="font-bold text-foreground group-hover:text-primary transition-smooth">
                    {countryLang.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">{countryLang.nativeName}</span>
                </div>
                <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Select
                </div>
              </button>
            </div>
          )}

          {/* Primary Language Options */}
          <div className="p-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Popular Languages
            </p>
            <div className="grid grid-cols-2 gap-2">
              {uniquePrimary
                .filter((l) => l.code !== countryLangCode || countryLangCode === "en")
                .slice(0, 4)
                .map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className="flex items-center gap-2.5 p-3 rounded-xl border hover:border-primary/30 hover:bg-primary/5 transition-smooth group"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div className="text-left flex-1 min-w-0">
                      <span className="block text-sm font-medium group-hover:text-primary transition-smooth truncate">
                        {lang.name}
                      </span>
                      <span className="block text-[10px] text-muted-foreground truncate">
                        {lang.nativeName}
                      </span>
                    </div>
                  </button>
                ))}
            </div>

            {/* More Languages Toggle */}
            {moreLangs.length > 0 && (
              <div className="mt-3">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-smooth"
                >
                  {showMore ? "Show Less" : `More Languages (${moreLangs.length})`}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
                </button>

                {showMore && (
                  <div className="grid grid-cols-2 gap-2 mt-2 animate-fade-in" style={{ animationDuration: "0.2s" }}>
                    {moreLangs.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang)}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border hover:border-primary/30 hover:bg-primary/5 transition-smooth group"
                      >
                        <span className="text-base">{lang.flag}</span>
                        <div className="text-left flex-1 min-w-0">
                          <span className="block text-xs font-medium group-hover:text-primary transition-smooth truncate">
                            {lang.name}
                          </span>
                          <span className="block text-[10px] text-muted-foreground truncate">
                            {lang.nativeName}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer — Continue in current language */}
          <div className="p-4 border-t bg-gradient-subtle">
            <button
              onClick={handleDismiss}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Check className="w-4 h-4" />
              Continue in {currentLanguage.name} ({currentLanguage.nativeName})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguagePopup;
