"use client";

import { useEffect, useState } from "react";

type Language = "ko" | "en";

const content = {
  ko: {
    brandAria: "할로우야드 홈",
    navAria: "주요 메뉴",
    nav: {
      catalog: "카탈로그",
      about: "브랜드",
      license: "라이선스",
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
    manifesto: {
      kicker: "02 / 할로우야드의 기준",
      lines: ["좋은 에셋은", "완성된 답이 아니라,", "더 큰 가능성입니다."],
    },
    workflow: [
      {
        number: "01",
        title: "덜어내고, 골라내다",
        text: "많이보다 정확하게. 쓰임과 완성도가 분명한 에셋만 선별합니다.",
      },
      {
        number: "02",
        title: "바로 만들 수 있게",
        text: "열고, 연결하고, 이어서 만들 수 있도록 실제 제작 흐름에 맞춰 정리합니다.",
      },
      {
        number: "03",
        title: "당신의 세계로",
        text: "에셋의 흔적보다 창작자의 개성이 남도록 유연하게 설계합니다.",
      },
    ],
    license: {
      kicker: "03 / 명확한 설계",
      title: "쉽게 이해하고, 자유롭게 만들기.",
      description:
        "개인 작업부터 상업 게임까지. 복잡한 해석 대신 만드는 일에 집중할 수 있도록 사용 범위를 명확하게 안내합니다.",
      link: "라이선스 살펴보기",
    },
    closing: {
      kicker: "모든 판매처를 한곳에서",
      lines: ["원하는 에셋을 찾고,", "익숙한 곳에서 구매하세요."],
      description: [
        "상품 정보와 구성은 할로우야드에서 비교하고,",
        "구매는 원하는 외부 마켓에서 이어집니다.",
      ],
      cta: "스토어 열기",
    },
    footerTagline: "아직 없는 세계를 위한, 준비된 에셋.",
    topAria: "맨 위로",
  },
  en: {
    brandAria: "Hollowyard home",
    navAria: "Main navigation",
    nav: {
      catalog: "Catalog",
      about: "About",
      license: "License",
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
    manifesto: {
      kicker: "02 / Why Hollowyard",
      lines: ["A good asset", "isn't the final answer—", "it's more possibility."],
    },
    workflow: [
      {
        number: "01",
        title: "Less, but better",
        text: "We choose for purpose and finish—not for the size of the catalog.",
      },
      {
        number: "02",
        title: "Ready when you are",
        text: "Everything is organized to open, connect, and continue building.",
      },
      {
        number: "03",
        title: "Built for your world",
        text: "Flexible by design, so your creative voice stays in the foreground.",
      },
    ],
    license: {
      kicker: "03 / Clear by design",
      title: "Clear terms. More room to create.",
      description:
        "From personal work to commercial games, every use case is explained clearly so you can stay focused on making.",
      link: "Explore the license",
    },
    closing: {
      kicker: "Every marketplace. One hub.",
      lines: ["Find the right asset,", "buy where you prefer."],
      description: [
        "Compare every product and package here,",
        "then continue to the marketplace you already use.",
      ],
      cta: "Open the store",
    },
    footerTagline: "GAME ASSETS FOR WORLDS YET TO EXIST.",
    topAria: "Back to top",
  },
} as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ko");
  const copy = content[language];

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

  return (
    <main data-language={language}>
      <header className="site-header">
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
          <a href="#catalog">{copy.nav.catalog}</a>
          <a href="#principles">{copy.nav.about}</a>
          <a href="#license">{copy.nav.license}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label="언어 선택 / Language">
            <button
              type="button"
              aria-pressed={language === "ko"}
              onClick={() => selectLanguage("ko")}
            >
              KO
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              aria-pressed={language === "en"}
              onClick={() => selectLanguage("en")}
            >
              EN
            </button>
          </div>
          <a className="header-cta" href="/store">
            {copy.nav.store} <ArrowIcon />
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
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

        <div className="hero-art" aria-label={copy.artAria}>
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
        <div>
          <span>GAME ASSETS</span>
          <i>✦</i>
          <span>ENVIRONMENTS</span>
          <i>✦</i>
          <span>CHARACTERS</span>
          <i>✦</i>
          <span>UI SYSTEMS</span>
          <i>✦</i>
          <span>SOUND &amp; CONTENT</span>
          <i>✦</i>
        </div>
      </div>

      <section className="catalog section-shell" id="catalog">
        <div className="section-heading">
          <p className="section-kicker">{copy.catalog.kicker}</p>
          <div>
            <h2>{copy.catalog.title}</h2>
            <p>{copy.catalog.description}</p>
          </div>
        </div>

        <div className="collection-grid">
          {copy.collections.map((collection) => (
            <a
              className={`collection-card ${collection.tone}`}
              href={`/store?category=${collection.category}`}
              key={collection.id}
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

      <section className="manifesto section-shell" id="principles">
        <div className="manifesto-title">
          <p className="section-kicker">{copy.manifesto.kicker}</p>
          <h2>
            {copy.manifesto.lines[0]}
            <br />
            {copy.manifesto.lines[1]}
            <br />
            <em>{copy.manifesto.lines[2]}</em>
          </h2>
        </div>

        <div className="workflow-list">
          {copy.workflow.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="license section-shell" id="license">
        <div className="license-visual">
          <span className="license-code">LICENSE / HY—STD</span>
          <div className="stamp">
            <span>USE</span>
            <strong>BUILD</strong>
            <span>SHIP</span>
          </div>
          <span className="license-note">NO HIDDEN MAZE</span>
        </div>

        <div className="license-copy">
          <p className="section-kicker">{copy.license.kicker}</p>
          <h2>{copy.license.title}</h2>
          <p>{copy.license.description}</p>
          <a href="/store">
            {copy.license.link} <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="closing section-shell" id="store-hub">
        <p className="section-kicker">{copy.closing.kicker}</p>
        <h2>
          {copy.closing.lines[0]}
          <br />
          <span>{copy.closing.lines[1]}</span>
        </h2>
        <div className="closing-bottom">
          <p>
            {copy.closing.description[0]}
            <br />
            {copy.closing.description[1]}
          </p>
          <a className="primary-button light" href="/store">
            {copy.closing.cta} <ArrowIcon />
          </a>
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
        <p>© 2026 HOLLOWYARD</p>
      </footer>
    </main>
  );
}
