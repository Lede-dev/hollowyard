"use client";

import { useEffect, useState } from "react";
import type { Language } from "../../lib/products";

export function useStoreLanguage() {
  const [language, setLanguage] = useState<Language>("ko");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("hollowyard-language");
    if (savedLanguage === "ko" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("hollowyard-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  return { language, selectLanguage };
}

export function StoreLanguageSwitch({
  language,
  onSelect,
}: {
  language: Language;
  onSelect: (language: Language) => void;
}) {
  return (
    <div className="language-switch" aria-label="언어 선택 / Language">
      <button
        type="button"
        aria-pressed={language === "ko"}
        onClick={() => onSelect("ko")}
      >
        KO
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => onSelect("en")}
      >
        EN
      </button>
    </div>
  );
}

export function StoreBrand({ label }: { label: string }) {
  return (
    <a className="brand" href="/" aria-label={label}>
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>HOLLOWYARD</span>
    </a>
  );
}

