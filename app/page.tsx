"use client";

import {
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Language = "ko" | "en";

const content = {
  ko: {
    brandAria: "할로우야드 홈",
    navAria: "주요 메뉴",
    nav: {
      home: "홈",
      store: "스토어",
    },
    eyebrow: ["게임을 위한 에셋. 세계를 위한 재료.", "서울 · 전 세계"],
    hero: ["아직 없는 세계를 위한", "준비된 에셋."],
    heroDescription:
      "상상은 빠르게, 제작은 단단하게. 할로우야드는 세계관의 밀도를 높이는 게임 에셋과 콘텐츠를 만듭니다.",
    explore: "에셋 둘러보기",
    artAria: "할로우야드 에셋 컬렉션 미리보기",
    marqueeAria: "할로우야드 제공 콘텐츠",
    catalog: {
      kicker: "01 / 카탈로그",
      title: "세계의 빈칸을 채우는 재료.",
      description:
        "배경을 만들고, 캐릭터에 생기를 더하고, 플레이 경험을 정돈하는 에셋을 선별합니다.",
    },
    collections: [
      {
        id: "A—01",
        title: "환경",
        description: "도시, 자연, 실내 공간을 빠르게 완성하는 모듈형 월드 에셋",
        tags: ["3D", "모듈형"],
        tone: "acid",
        category: "environment",
      },
      {
        id: "A—02",
        title: "캐릭터",
        description: "게임의 분위기를 선명하게 만드는 캐릭터와 크리처 컬렉션",
        tags: ["리깅", "게임 레디"],
        tone: "coral",
        category: "characters",
      },
      {
        id: "A—03",
        title: "인터페이스",
        description: "HUD부터 아이콘까지, 플레이 경험을 정돈하는 UI 시스템",
        tags: ["UI 키트", "원본 포함"],
        tone: "blue",
        category: "interface",
      },
    ],
    footerTagline: "아직 없는 세계를 위한, 준비된 에셋.",
    topAria: "맨 위로",
  },
  en: {
    brandAria: "Hollowyard home",
    navAria: "Main navigation",
    nav: {
      home: "Home",
      store: "Store",
    },
    eyebrow: ["Assets for games. Materials for worlds.", "Seoul · Worldwide"],
    hero: ["READY FOR WORLDS.", "YET TO EXIST."],
    heroDescription:
      "Imagine faster. Build with confidence. Hollowyard makes game assets and content that give your world more depth.",
    explore: "Explore the assets",
    artAria: "Preview of the Hollowyard asset collection",
    marqueeAria: "Content available from Hollowyard",
    catalog: {
      kicker: "01 / The catalog",
      title: "The missing pieces of your world.",
      description:
        "Curated assets for building places, bringing characters to life, and shaping a coherent play experience.",
    },
    collections: [
      {
        id: "A—01",
        title: "Environment",
        description:
          "Modular world assets for building cities, nature, and interiors faster.",
        tags: ["3D", "MODULAR"],
        tone: "acid",
        category: "environment",
      },
      {
        id: "A—02",
        title: "Characters",
        description:
          "Characters and creature collections designed to sharpen the mood of your game.",
        tags: ["RIGGED", "GAME-READY"],
        tone: "coral",
        category: "characters",
      },
      {
        id: "A—03",
        title: "Interface",
        description:
          "UI systems that bring order to the player experience, from HUDs to icons.",
        tags: ["UI KIT", "SOURCE"],
        tone: "blue",
        category: "interface",
      },
    ],
    footerTagline: "GAME ASSETS FOR WORLDS YET TO EXIST.",
    topAria: "Back to top",
  },
} as const;

const marqueeItems = [
  "GAME ASSETS",
  "ENVIRONMENTS",
  "CHARACTERS",
  "UI SYSTEMS",
  "SOUND & CONTENT",
] as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ko");
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const copy = content[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("hollowyard-language");
    if (savedLanguage === "ko" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 18);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("hollowyard-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const moveHeroArt = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const resetHeroArt = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0");
    event.currentTarget.style.setProperty("--pointer-y", "0");
  };

  const moveCollectionCard = (
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty(
      "--tilt-x",
      `${((0.5 - y / 100) * 6).toFixed(2)}deg`,
    );
    event.currentTarget.style.setProperty(
      "--tilt-y",
      `${((x / 100 - 0.5) * 6).toFixed(2)}deg`,
    );
    event.currentTarget.style.setProperty("--glow-x", `${x.toFixed(1)}%`);
    event.currentTarget.style.setProperty("--glow-y", `${y.toFixed(1)}%`);
  };

  const resetCollectionCard = (
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--glow-x", "50%");
    event.currentTarget.style.setProperty("--glow-y", "50%");
  };

  return (
    <main data-language={language}>
      <header className={`site-header${headerScrolled ? " is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label={copy.brandAria}>
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>HOLLOWYARD</span>
        </a>

        <nav className="main-nav" aria-label={copy.navAria}>
          <a href="#top" aria-current="page">
            {copy.nav.home}
          </a>
          <a href="/store">{copy.nav.store}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label="언어 선택 · Language">
            <button
              type="button"
              aria-pressed={language === "ko"}
              onClick={() => selectLanguage("ko")}
            >
              KO
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              aria-pressed={language === "en"}
              onClick={() => selectLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">
            <span>{copy.eyebrow[0]}</span>
            <span>{copy.eyebrow[1]}</span>
          </p>

          <h1>
            <span className="hero-line hero-line-primary">{copy.hero[0]}</span>
            <span className="hero-line hero-line-accent">{copy.hero[1]}</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">{copy.heroDescription}</p>

            <a className="primary-button" href="/store">
              {copy.explore} <ArrowIcon />
            </a>
          </div>
        </div>

        <div
          className="hero-art reveal-delay-1"
          aria-label={copy.artAria}
          data-reveal
          onPointerMove={moveHeroArt}
          onPointerLeave={resetHeroArt}
        >
          <div className="art-grid" aria-hidden="true" />
          <div className="orb orb-one" aria-hidden="true" />
          <div className="orb orb-two" aria-hidden="true" />
          <div className="monolith" aria-hidden="true">
            <span>HY</span>
          </div>
          <div className="asset-label label-top">
            <span>ASSET TYPE</span>
            <b>WORLD / OBJECT</b>
          </div>
          <div className="asset-label label-bottom">
            <span>STATUS</span>
            <b>GAME READY</b>
          </div>
          <span className="art-index">HY—001</span>
          <span className="art-caption">OBJECTS FOR OTHER WORLDS</span>
        </div>
      </section>

      <div className="marquee" aria-label={copy.marqueeAria}>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              {marqueeItems.map((item) => (
                <span className="marquee-item" key={`${group}-${item}`}>
                  <span>{item}</span>
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="catalog section-shell" id="catalog">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">{copy.catalog.kicker}</p>
          <div>
            <h2>{copy.catalog.title}</h2>
            <p>{copy.catalog.description}</p>
          </div>
        </div>

        <div className="collection-grid">
          {copy.collections.map((collection, index) => (
            <a
              className={`collection-card ${collection.tone} reveal-delay-${index + 1}`}
              href={`/store?category=${collection.category}`}
              key={collection.id}
              data-reveal
              onPointerMove={moveCollectionCard}
              onPointerLeave={resetCollectionCard}
            >
              <div className="card-meta">
                <span>{collection.id}</span>
                <span>COLLECTION</span>
              </div>
              <div className="card-visual" aria-hidden="true">
                <span className="visual-ring" />
                <span className="visual-block" />
                <span className="visual-dot" />
              </div>
              <div className="card-content">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <div className="tag-row">
                  {collection.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label={copy.topAria}>
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>HOLLOWYARD</span>
        </a>
        <p>{copy.footerTagline}</p>
        <p>© 2026 Lede Studios</p>
      </footer>
    </main>
  );
}
