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
      contact: "문의",
    },
    eyebrow: ["독립 게임 에셋 레이블", "서울 · 전 세계"],
    hero: ["세계를 만들고.", "분위기를 완성하다."],
    heroDescription:
      "할로우야드는 게임의 분위기를 완성하는 에셋과 콘텐츠를 만듭니다. 더 빠르게 시작하고, 더 당신다운 세계를 구축하세요.",
    explore: "카탈로그 보기",
    artAria: "할로우야드 에셋 컬렉션 미리보기",
    marqueeAria: "할로우야드 제공 콘텐츠",
    catalog: {
      kicker: "01 / 카탈로그",
      title: "당신의 세계에 부족한 한 조각.",
      description:
        "단순히 공간을 채우는 에셋이 아닌, 게임의 인상을 결정하는 재료를 소개합니다.",
    },
    collections: [
      {
        id: "A—01",
        title: "환경",
        description: "도시, 자연, 실내 공간을 빠르게 완성하는 모듈형 월드 에셋",
        tags: ["3D", "모듈형"],
        tone: "acid",
      },
      {
        id: "A—02",
        title: "캐릭터",
        description: "게임의 분위기를 선명하게 만드는 캐릭터와 크리처 컬렉션",
        tags: ["리깅", "게임 레디"],
        tone: "coral",
      },
      {
        id: "A—03",
        title: "인터페이스",
        description: "HUD부터 아이콘까지, 플레이 경험을 정돈하는 UI 시스템",
        tags: ["UI 키트", "원본 포함"],
        tone: "blue",
      },
    ],
    manifesto: {
      kicker: "02 / 할로우야드의 기준",
      lines: ["좋은 에셋은", "새로운 문을 열고,", "세계를 넓혀야 합니다."],
    },
    workflow: [
      {
        number: "01",
        title: "엄선된 에셋",
        text: "쓰임이 분명하고 완성도 높은 에셋만 선별합니다.",
      },
      {
        number: "02",
        title: "프로덕션 레디",
        text: "실제 제작 환경에 바로 연결할 수 있도록 정리합니다.",
      },
      {
        number: "03",
        title: "당신의 것이 되도록",
        text: "프로젝트의 개성을 해치지 않는 유연한 활용을 지향합니다.",
      },
    ],
    license: {
      kicker: "03 / 명확한 설계",
      title: "간결한 라이선스. 진지한 작업.",
      description:
        "개인 프로젝트부터 상업 게임까지. 에셋을 고르는 순간보다 만드는 시간에 더 집중할 수 있도록 명확한 라이선스를 지향합니다.",
      link: "라이선스 안내 받기",
    },
    closing: {
      kicker: "곧, 야드가 열립니다",
      lines: ["당신의 다음 세계는", "여기서 시작됩니다."],
      description: [
        "첫 번째 컬렉션과 출시 소식을 가장 먼저 받아보세요.",
        "협업 및 입점 문의도 환영합니다.",
      ],
    },
    footerTagline: "아직 존재하지 않는 세계를 위한 게임 에셋.",
    topAria: "맨 위로",
  },
  en: {
    brandAria: "Hollowyard home",
    navAria: "Main navigation",
    nav: {
      catalog: "Catalog",
      about: "About",
      license: "License",
      contact: "Contact",
    },
    eyebrow: ["Independent game asset label", "Seoul · Worldwide"],
    hero: ["BUILD THE WORLD.", "OWN THE MOOD."],
    heroDescription:
      "Hollowyard creates game assets and content that define the mood. Start faster, then shape a world that feels unmistakably yours.",
    explore: "Explore the yard",
    artAria: "Preview of the Hollowyard asset collection",
    marqueeAria: "Content available from Hollowyard",
    catalog: {
      kicker: "01 / The catalog",
      title: "Find what your world is missing.",
      description:
        "Not filler, but the building blocks that give your game its lasting impression.",
    },
    collections: [
      {
        id: "A—01",
        title: "Environment",
        description:
          "Modular world assets for building cities, nature, and interiors faster.",
        tags: ["3D", "MODULAR"],
        tone: "acid",
      },
      {
        id: "A—02",
        title: "Characters",
        description:
          "Characters and creature collections designed to sharpen the mood of your game.",
        tags: ["RIGGED", "GAME-READY"],
        tone: "coral",
      },
      {
        id: "A—03",
        title: "Interface",
        description:
          "UI systems that bring order to the player experience, from HUDs to icons.",
        tags: ["UI KIT", "SOURCE"],
        tone: "blue",
      },
    ],
    manifesto: {
      kicker: "02 / Why Hollowyard",
      lines: ["A good asset", "should open a door,", "not close a world."],
    },
    workflow: [
      {
        number: "01",
        title: "Curated, not crowded",
        text: "We select only purposeful, production-quality assets.",
      },
      {
        number: "02",
        title: "Ready for production",
        text: "Everything is organized to slot into real production workflows.",
      },
      {
        number: "03",
        title: "Made to be yours",
        text: "Flexible by design, so your project keeps its own identity.",
      },
    ],
    license: {
      kicker: "03 / Clear by design",
      title: "Simple license. Serious work.",
      description:
        "From personal projects to commercial games, our licensing is designed to keep your focus on making—not decoding fine print.",
      link: "Read the license guide",
    },
    closing: {
      kicker: "The yard is opening soon",
      lines: ["Your next world", "starts here."],
      description: [
        "Be first to hear about our debut collection and upcoming releases.",
        "We also welcome collaboration and creator inquiries.",
      ],
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
          <a className="header-cta" href="#contact">
            {copy.nav.contact} <ArrowIcon />
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
            {copy.hero[0]}
            <br />
            <span>{copy.hero[1]}</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">{copy.heroDescription}</p>

            <a className="primary-button" href="#catalog">
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
            <article
              className={`collection-card ${collection.tone}`}
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
            </article>
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
          <a href="#contact">
            {copy.license.link} <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="closing section-shell" id="contact">
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
          <a
            className="primary-button light"
            href="mailto:hello@hollowyard.com"
          >
            hello@hollowyard.com <ArrowIcon />
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
