const collections = [
  {
    id: "A—01",
    title: "Environment",
    description: "도시, 자연, 실내 공간을 빠르게 완성하는 모듈형 월드 에셋",
    tags: ["3D", "MODULAR"],
    tone: "acid",
  },
  {
    id: "A—02",
    title: "Characters",
    description: "게임의 분위기를 선명하게 만드는 캐릭터와 크리처 컬렉션",
    tags: ["RIGGED", "GAME-READY"],
    tone: "coral",
  },
  {
    id: "A—03",
    title: "Interface",
    description: "HUD부터 아이콘까지, 플레이 경험을 정돈하는 UI 시스템",
    tags: ["UI KIT", "SOURCE"],
    tone: "blue",
  },
];

const workflow = [
  {
    number: "01",
    title: "Curated, not crowded",
    text: "쓰임이 분명하고 완성도 높은 에셋만 선별합니다.",
  },
  {
    number: "02",
    title: "Ready for production",
    text: "실제 제작 환경에 바로 연결할 수 있도록 정리합니다.",
  },
  {
    number: "03",
    title: "Made to be yours",
    text: "프로젝트의 개성을 해치지 않는 유연한 활용을 지향합니다.",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hollowyard 홈">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>HOLLOWYARD</span>
        </a>

        <nav className="main-nav" aria-label="주요 메뉴">
          <a href="#catalog">Catalog</a>
          <a href="#principles">About</a>
          <a href="#license">License</a>
        </nav>

        <a className="header-cta" href="#contact">
          Contact <ArrowIcon />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>Independent game asset label</span>
            <span>Seoul · Worldwide</span>
          </p>

          <h1>
            BUILD THE WORLD.
            <br />
            <span>OWN THE MOOD.</span>
          </h1>

          <div className="hero-bottom">
            <p className="hero-description">
              할로우야드는 게임의 분위기를 완성하는 에셋과 콘텐츠를
              만듭니다. 더 빠르게 시작하고, 더 당신다운 세계를 구축하세요.
            </p>

            <a className="primary-button" href="#catalog">
              Explore the yard <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label="할로우야드 에셋 컬렉션 미리보기">
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

      <div className="marquee" aria-label="할로우야드 제공 콘텐츠">
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
          <p className="section-kicker">01 / The catalog</p>
          <div>
            <h2>Find what your world is missing.</h2>
            <p>
              단순히 채우는 에셋이 아닌, 게임의 인상을 결정하는 재료를
              소개합니다.
            </p>
          </div>
        </div>

        <div className="collection-grid">
          {collections.map((collection) => (
            <article className={`collection-card ${collection.tone}`} key={collection.id}>
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
          <p className="section-kicker">02 / Why Hollowyard</p>
          <h2>
            A good asset
            <br />
            should open a door,
            <br />
            <em>not close a world.</em>
          </h2>
        </div>

        <div className="workflow-list">
          {workflow.map((item) => (
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
          <p className="section-kicker">03 / Clear by design</p>
          <h2>Simple license. Serious work.</h2>
          <p>
            개인 프로젝트부터 상업 게임까지. 에셋을 고르는 순간보다 만드는
            시간에 더 집중할 수 있도록 명확한 라이선스를 지향합니다.
          </p>
          <a href="#contact">
            라이선스 안내 받기 <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="closing section-shell" id="contact">
        <p className="section-kicker">The yard is opening soon</p>
        <h2>
          Your next world
          <br />
          starts <span>here.</span>
        </h2>
        <div className="closing-bottom">
          <p>
            첫 번째 컬렉션과 출시 소식을 가장 먼저 받아보세요.
            <br />
            협업 및 입점 문의도 환영합니다.
          </p>
          <a className="primary-button light" href="mailto:hello@hollowyard.com">
            hello@hollowyard.com <ArrowIcon />
          </a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="맨 위로">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>HOLLOWYARD</span>
        </a>
        <p>GAME ASSETS FOR WORLDS YET TO EXIST.</p>
        <p>© 2026 HOLLOWYARD</p>
      </footer>
    </main>
  );
}
