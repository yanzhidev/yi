import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';
import { type Language, languages } from '../utils/i18n';

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full",
          "bg-stone-100 text-stone-600",
          "text-sm font-medium",
          "hover:bg-stone-200 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-stone-300"
        )}
        aria-label={t.selectLanguage}
      >
        <Globe className="w-4 h-4" />
        <span>{t.languages[language]}</span>
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-40",
            "bg-white rounded-xl shadow-lg border border-stone-100",
            "py-2 z-50"
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleSelect(lang)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2",
                "text-sm text-left text-stone-800",
                "hover:bg-stone-50 transition-colors",
                language === lang && "bg-stone-50 text-stone-900 font-medium"
              )}
            >
              <span>{t.languages[lang]}</span>
              {language === lang && (
                <Check className="w-4 h-4 text-stone-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
