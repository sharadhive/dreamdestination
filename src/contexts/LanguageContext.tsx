import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
  region: "indian" | "international";
}

export const LANGUAGES: Language[] = [
  // Primary
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", region: "indian" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", region: "indian" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", region: "indian" },

  // Other Indian Languages
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", region: "indian" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", region: "indian" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳", region: "indian" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", region: "indian" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", region: "indian" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", region: "indian" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳", region: "indian" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳", region: "indian" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", flag: "🇮🇳", region: "indian" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇮🇳", region: "indian" },

  // International Languages
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", region: "international" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", region: "international" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", region: "international" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", region: "international" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", region: "international" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", region: "international" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦", region: "international" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", region: "international" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", region: "international" },
  { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷", region: "international" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇦🇪", region: "international" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", region: "international" },
];

// Map country slugs to their primary language code
export const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  uk: "en",
  usa: "en",
  canada: "en",
  australia: "en",
  "new-zealand": "en",
  singapore: "en",
  ireland: "en",
  france: "fr",
  germany: "de",
  uae: "ar",
  india: "hi",
  switzerland: "de",
  spain: "es",
  malaysia: "ms",
  mauritius: "fr",
  netherlands: "nl",
  italy: "it",
  russia: "ru",
  ukraine: "uk",
  china: "zh-CN",
  japan: "ja",
  iran: "fa",
};

export const getLanguageByCode = (code: string): Language | undefined => {
  return LANGUAGES.find((l) => l.code === code);
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Inject Google Translate script
const injectGoogleTranslateScript = () => {
  if (document.getElementById("google-translate-script")) return;

  // Add the initialization function
  (window as any).googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.head.appendChild(script);
};

// Programmatically trigger Google Translate
const triggerGoogleTranslate = (langCode: string) => {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
    return true;
  }
  return false;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    () => {
      const saved = localStorage.getItem("dd-language");
      if (saved) {
        const found = LANGUAGES.find((l) => l.code === saved);
        if (found) return found;
      }
      return LANGUAGES[0]; // Default English
    }
  );
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    injectGoogleTranslateScript();
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem("dd-language", lang.code);

    if (lang.code === "en") {
      // Reset to English — remove Google Translate
      const iframe = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement;
      if (iframe) {
        const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
        const closeBtn = innerDoc?.querySelector(".goog-close-link") as HTMLAnchorElement;
        if (closeBtn) closeBtn.click();
      }
      // Also try cookie method
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
      window.location.reload();
      return;
    }

    setIsTranslating(true);

    // Try to translate, with retries for when Google Translate hasn't loaded yet
    let attempts = 0;
    const tryTranslate = () => {
      if (triggerGoogleTranslate(lang.code)) {
        setTimeout(() => setIsTranslating(false), 1500);
      } else if (attempts < 20) {
        attempts++;
        setTimeout(tryTranslate, 500);
      } else {
        setIsTranslating(false);
      }
    };
    tryTranslate();
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, isTranslating }}>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }} />
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
