import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";

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

export const getLanguageByCode = (code: string): Language | undefined =>
  LANGUAGES.find((l) => l.code === code);

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "dd-language";

/* ─── localStorage is unavailable in private mode and some embedded views ─── */
const readStoredCode = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStoredCode = (code: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* ignore — the googtrans cookie still carries the choice */
  }
};

/* ─── Google Translate plumbing ─── */

const injectGoogleTranslateScript = () => {
  if (document.getElementById("google-translate-script")) return;

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
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.head.appendChild(script);
};

/**
 * Set the hidden Google Translate <select>.
 * The event must bubble — Google's own handler is bound higher up the tree,
 * and a non-bubbling event silently does nothing.
 */
const triggerGoogleTranslate = (langCode: string): boolean => {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!select) return false;
  select.value = langCode;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
};

/** Retry until Google's widget has built its <select>. */
const applyWhenReady = (langCode: string, onDone: () => void) => {
  let attempts = 0;
  const tick = () => {
    if (triggerGoogleTranslate(langCode)) {
      window.setTimeout(onDone, 1200);
      return;
    }
    if (attempts++ < 30) {
      window.setTimeout(tick, 400);
    } else {
      onDone();
    }
  };
  tick();
};

const clearGoogTransCookie = () => {
  const host = window.location.hostname;
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // The cookie can exist under several domain scopes — clear each.
  document.cookie = `googtrans=; ${expired}`;
  document.cookie = `googtrans=; ${expired} domain=${host};`;
  document.cookie = `googtrans=; ${expired} domain=.${host};`;
  const parts = host.split(".");
  if (parts.length > 2) {
    const root = parts.slice(-2).join(".");
    document.cookie = `googtrans=; ${expired} domain=.${root};`;
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = readStoredCode();
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) return found;
    }
    return LANGUAGES[0];
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const restoredRef = useRef(false);

  useEffect(() => {
    injectGoogleTranslateScript();
  }, []);

  /**
   * Re-apply the saved language on load.
   * Without this, a visitor who picked Marathi and refreshed saw the switcher
   * say "मराठी" while the page sat in English — the state was remembered but
   * never handed back to Google Translate.
   */
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    if (currentLanguage.code === "en") return;
    setIsTranslating(true);
    applyWhenReady(currentLanguage.code, () => setIsTranslating(false));
  }, [currentLanguage.code]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    writeStoredCode(lang.code);

    if (lang.code === "en") {
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    setIsTranslating(true);
    applyWhenReady(lang.code, () => setIsTranslating(false));
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, isTranslating }}>
      {/*
        Kept in the layout but moved off-screen rather than display:none.
        Google Translate does not reliably build its <select> inside a
        display:none container — that was why selecting a language appeared
        to do nothing at all.
      */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />
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
