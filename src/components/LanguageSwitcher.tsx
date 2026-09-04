import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check, Search, Loader2 } from "lucide-react";
import { useLanguage, LANGUAGES, type Language } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, isTranslating } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const indianLangs = LANGUAGES.filter(
    (l) => l.region === "indian" && l.name.toLowerCase().includes(search.toLowerCase())
  );
  const internationalLangs = LANGUAGES.filter(
    (l) => l.region === "international" && l.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-smooth text-sm"
        aria-label="Choose language"
        id="language-switcher-btn"
      >
        {isTranslating ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <Globe className="w-4 h-4 text-primary" />
        )}
        <span className="hidden sm:inline font-medium text-foreground">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-card border rounded-xl shadow-elegant z-50 overflow-hidden animate-fade-in">
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {/* Primary Languages (English, Hindi, Marathi) */}
            {indianLangs.length > 0 && (
              <div className="p-2">
                <p className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                  🇮🇳 Indian Languages
                </p>
                {indianLangs.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-smooth ${
                      currentLanguage.code === lang.code
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <span className="block leading-tight">{lang.name}</span>
                      <span className="block text-xs text-muted-foreground">{lang.nativeName}</span>
                    </div>
                    {currentLanguage.code === lang.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* International Languages */}
            {internationalLangs.length > 0 && (
              <div className="p-2 border-t">
                <p className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                  🌍 International Languages
                </p>
                {internationalLangs.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-smooth ${
                      currentLanguage.code === lang.code
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <span className="block leading-tight">{lang.name}</span>
                      <span className="block text-xs text-muted-foreground">{lang.nativeName}</span>
                    </div>
                    {currentLanguage.code === lang.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {indianLangs.length === 0 && internationalLangs.length === 0 && (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No languages match "{search}"
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t bg-gradient-subtle">
            <p className="text-[10px] text-muted-foreground text-center">
              Powered by Google Translate
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
