"use client";

import {
  categoryLabels,
  products,
  storefronts,
  type Product,
} from "../../../lib/products";
import {
  StoreBrand,
  StoreLanguageSwitch,
  useStoreLanguage,
} from "../store-language";

const detailCopy = {
  ko: {
    brandAria: "할로우야드 홈",
    navAria: "상품 메뉴",
    home: "홈",
    store: "스토어",
    license: "라이선스",
    back: "스토어로 돌아가기",
    release: "업데이트",
    availableAt: "판매 스토어",
    storeIntro:
      "원하는 마켓을 선택하면 새 창에서 해당 스토어로 이동합니다.",
    storeLink: "스토어 열기",
    linkNotice:
      "상품별 판매 URL을 연결하기 전까지 각 플랫폼의 공식 홈으로 이동합니다.",
    description: "상품 설명",
    includes: "상품 구성",
    specifications: "기술 정보",
    related: "함께 살펴볼 에셋",
    relatedLink: "상품 보기",
    footer: "상품 정보는 이곳에서. 구매는 익숙한 마켓에서.",
  },
  en: {
    brandAria: "Hollowyard home",
    navAria: "Product navigation",
    home: "Home",
    store: "Store",
    license: "License",
    back: "Back to store",
    release: "Updated",
    availableAt: "Available at",
    storeIntro: "Choose a marketplace to continue in a new tab.",
    storeLink: "Open store",
    linkNotice:
      "Until product-specific URLs are added, these buttons open each marketplace homepage.",
    description: "About this asset",
    includes: "What's included",
    specifications: "Technical details",
    related: "You may also need",
    relatedLink: "View product",
    footer: "Details here. Checkout on the marketplace you trust.",
  },
} as const;

export default function ProductDetailClient({
  product,
}: {
  product: Product;
}) {
  const { language, selectLanguage } = useStoreLanguage();
  const copy = detailCopy[language];
  const relatedProducts = products
    .filter((candidate) => candidate.slug !== product.slug)
    .sort((first, second) => {
      const firstMatch = first.category === product.category ? 1 : 0;
      const secondMatch = second.category === product.category ? 1 : 0;
      return secondMatch - firstMatch;
    })
    .slice(0, 2);

  return (
    <main className="detail-page" data-language={language}>
      <header className="site-header store-site-header">
        <StoreBrand label={copy.brandAria} />
        <nav className="main-nav" aria-label={copy.navAria}>
          <a href="/">{copy.home}</a>
          <a href="/store" aria-current="page">
            {copy.store}
          </a>
          <a href="/#license">{copy.license}</a>
        </nav>
        <div className="header-actions">
          <StoreLanguageSwitch
            language={language}
            onSelect={selectLanguage}
          />
        </div>
      </header>

      <div className="detail-breadcrumb">
        <a href="/store">STORE</a>
        <span aria-hidden="true">/</span>
        <span>{product.code}</span>
      </div>

      <section className="detail-hero">
        <div
          className={`detail-visual product-tone-${product.tone}`}
          aria-label={`${product.title[language]} preview`}
        >
          <span className="detail-visual-code">{product.code}</span>
          <span className="detail-visual-index">
            {product.category.slice(0, 2).toUpperCase()}
          </span>
          <div className="detail-object" aria-hidden="true">
            <span>{product.title.en.slice(0, 2).toUpperCase()}</span>
          </div>
          <span className="detail-orbit detail-orbit-one" aria-hidden="true" />
          <span className="detail-orbit detail-orbit-two" aria-hidden="true" />
          <span className="detail-visual-caption">HOLLOWYARD / GAME ASSET</span>
        </div>

        <div className="detail-summary">
          <div className="detail-meta">
            <span>{categoryLabels[product.category][language]}</span>
            <span>
              {copy.release} / {product.release}
            </span>
          </div>
          <h1>{product.title[language]}</h1>
          <p className="detail-lead">{product.summary[language]}</p>

          <div className="detail-tags">
            {product.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="storefront-panel">
            <div>
              <p className="section-kicker">{copy.availableAt}</p>
              <p>{copy.storeIntro}</p>
            </div>
            <div className="storefront-links">
              {product.stores.map((storeId) => {
                const store = storefronts[storeId];
                return (
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noreferrer"
                    key={store.id}
                    aria-label={`${store.name} — ${copy.storeLink}`}
                  >
                    <span>{store.name}</span>
                    <b aria-hidden="true">↗</b>
                  </a>
                );
              })}
            </div>
            <p className="store-link-notice">{copy.linkNotice}</p>
          </div>
        </div>
      </section>

      <section className="detail-information">
        <div className="detail-description">
          <p className="section-kicker">01 / {copy.description}</p>
          <p>{product.description[language]}</p>
        </div>

        <div className="detail-includes">
          <p className="section-kicker">02 / {copy.includes}</p>
          <ol>
            {product.includes[language].map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{item}</b>
              </li>
            ))}
          </ol>
        </div>

        <div className="detail-specifications">
          <p className="section-kicker">03 / {copy.specifications}</p>
          <dl>
            {product.specifications.map((item) => (
              <div key={item.label.en}>
                <dt>{item.label[language]}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="related-products">
        <div className="related-heading">
          <p className="section-kicker">04 / NEXT</p>
          <h2>{copy.related}</h2>
        </div>
        <div className="related-grid">
          {relatedProducts.map((relatedProduct) => (
            <a
              href={`/store/${relatedProduct.slug}`}
              className="related-card"
              key={relatedProduct.slug}
              aria-label={`${relatedProduct.title[language]} — ${copy.relatedLink}`}
            >
              <div
                className={`related-visual product-tone-${relatedProduct.tone}`}
                aria-hidden="true"
              >
                <span>{relatedProduct.code}</span>
                <strong>
                  {relatedProduct.category.slice(0, 2).toUpperCase()}
                </strong>
              </div>
              <div>
                <span>{categoryLabels[relatedProduct.category][language]}</span>
                <h3>{relatedProduct.title[language]}</h3>
                <b aria-hidden="true">↗</b>
              </div>
            </a>
          ))}
        </div>
        <a className="back-to-store" href="/store">
          <span aria-hidden="true">←</span> {copy.back}
        </a>
      </section>

      <footer className="store-footer">
        <StoreBrand label={copy.brandAria} />
        <p>{copy.footer}</p>
        <p>© 2026 HOLLOWYARD</p>
      </footer>
    </main>
  );
}

