"use client";

import { useEffect, useMemo, useState } from "react";
import {
  categoryLabels,
  products,
  storefronts,
  type ProductCategory,
} from "../../lib/products";
import {
  StoreBrand,
  StoreLanguageSwitch,
  useStoreLanguage,
} from "./store-language";

type CategoryFilter = "all" | ProductCategory;
type SortMode = "latest" | "name";

const storeCopy = {
  ko: {
    brandAria: "할로우야드 홈",
    navAria: "스토어 메뉴",
    home: "홈",
    store: "스토어",
    license: "라이선스",
    kicker: "HOLLOWYARD / ASSET INDEX",
    title: "필요한 에셋을 찾고,\n원하는 스토어에서 구매하세요.",
    intro:
      "할로우야드의 모든 상품 정보와 구성을 한곳에서 비교하고, 익숙한 외부 마켓으로 이동해 구매할 수 있습니다.",
    countLabel: "개의 상품",
    searchLabel: "상품 검색",
    searchPlaceholder: "이름, 설명, 태그로 검색",
    categoryLabel: "카테고리",
    all: "전체",
    sortLabel: "정렬",
    sortLatest: "최신순",
    sortName: "이름순",
    results: "개 결과",
    stores: "판매처",
    detail: "상품 자세히 보기",
    emptyTitle: "검색 결과가 없습니다.",
    emptyDescription: "검색어를 바꾸거나 다른 카테고리를 선택해 보세요.",
    reset: "필터 초기화",
    newsLink: "공지와 이벤트 보기",
    footer: "여러 마켓에 흩어진 할로우야드 에셋을 한곳에서.",
  },
  en: {
    brandAria: "Hollowyard home",
    navAria: "Store navigation",
    home: "Home",
    store: "Store",
    license: "License",
    kicker: "HOLLOWYARD / ASSET INDEX",
    title: "FIND THE ASSET.\nCHOOSE YOUR STORE.",
    intro:
      "Compare every Hollowyard product in one place, then continue to the marketplace you already use.",
    countLabel: "products",
    searchLabel: "Search products",
    searchPlaceholder: "Search by name, description, or tag",
    categoryLabel: "Category",
    all: "All",
    sortLabel: "Sort",
    sortLatest: "Newest",
    sortName: "Name",
    results: "results",
    stores: "Stores",
    detail: "View product details",
    emptyTitle: "No products found.",
    emptyDescription: "Try another term or choose a different category.",
    reset: "Reset filters",
    newsLink: "View news & events",
    footer: "Every Hollowyard asset. Every marketplace. One index.",
  },
} as const;

const categories = Object.keys(categoryLabels) as ProductCategory[];

export default function StoreClient() {
  const { language, selectLanguage } = useStoreLanguage();
  const copy = storeCopy[language];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortMode>("latest");

  useEffect(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get(
      "category",
    );
    if (
      requestedCategory &&
      categories.includes(requestedCategory as ProductCategory)
    ) {
      setCategory(requestedCategory as ProductCategory);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const result = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const searchableText = [
        product.title[language],
        product.summary[language],
        categoryLabels[product.category][language],
        ...product.tags,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return (
        matchesCategory &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });

    return [...result].sort((first, second) => {
      if (sort === "name") {
        return first.title[language].localeCompare(second.title[language]);
      }
      return second.release.localeCompare(first.release);
    });
  }, [category, language, query, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("latest");
  };

  return (
    <main className="store-page" data-language={language}>
      <header className="site-header store-site-header">
        <StoreBrand label={copy.brandAria} />
        <nav className="main-nav" aria-label={copy.navAria}>
          <a href="/">{copy.home}</a>
          <a href="/store" aria-current="page">
            {copy.store}
          </a>
        </nav>
        <div className="header-actions">
          <StoreLanguageSwitch
            language={language}
            onSelect={selectLanguage}
          />
        </div>
      </header>

      <section className="store-hero">
        <div>
          <p className="section-kicker">{copy.kicker}</p>
          <h1>
            {copy.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>
        <div className="store-hero-aside">
          <p>{copy.intro}</p>
          <a className="store-news-link" href="/news">
            {copy.newsLink} <span aria-hidden="true">↗</span>
          </a>
          <div>
            <strong>{String(products.length).padStart(2, "0")}</strong>
            <span>{copy.countLabel}</span>
          </div>
        </div>
      </section>

      <section className="store-toolbar" aria-label="상품 필터">
        <label className="store-search">
          <span>{copy.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
          />
          <b aria-hidden="true">⌕</b>
        </label>

        <div className="category-filter" aria-label={copy.categoryLabel}>
          <span className="toolbar-label">{copy.categoryLabel}</span>
          <div>
            <button
              type="button"
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
            >
              {copy.all} <sup>{products.length}</sup>
            </button>
            {categories.map((categoryKey) => {
              const categoryCount = products.filter(
                (product) => product.category === categoryKey,
              ).length;
              return (
                <button
                  type="button"
                  aria-pressed={category === categoryKey}
                  onClick={() => setCategory(categoryKey)}
                  key={categoryKey}
                >
                  {categoryLabels[categoryKey][language]}{" "}
                  <sup>{categoryCount}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <label className="sort-control">
          <span>{copy.sortLabel}</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
          >
            <option value="latest">{copy.sortLatest}</option>
            <option value="name">{copy.sortName}</option>
          </select>
        </label>
      </section>

      <section className="store-results">
        <div className="results-header">
          <span>
            {String(filteredProducts.length).padStart(2, "0")} {copy.results}
          </span>
          <span>HOLLOWYARD® / 2026</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <a
                className="product-card"
                href={`/store/${product.slug}`}
                key={product.slug}
                aria-label={`${product.title[language]} — ${copy.detail}`}
              >
                <div
                  className={`product-visual product-tone-${product.tone}`}
                  aria-hidden="true"
                >
                  <span className="product-code">{product.code}</span>
                  <span className="product-glyph">
                    {product.category.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="product-shape product-shape-one" />
                  <span className="product-shape product-shape-two" />
                </div>
                <div className="product-card-body">
                  <div className="product-card-meta">
                    <span>{categoryLabels[product.category][language]}</span>
                    <span>{product.release}</span>
                  </div>
                  <h2>{product.title[language]}</h2>
                  <p>{product.summary[language]}</p>
                  <div className="product-card-footer">
                    <span>
                      {copy.stores} /{" "}
                      {product.purchaseLinks
                        .map((link) => storefronts[link.storefront].name)
                        .join(" · ")}
                    </span>
                    <b aria-hidden="true">↗</b>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <span aria-hidden="true">00</span>
            <h2>{copy.emptyTitle}</h2>
            <p>{copy.emptyDescription}</p>
            <button type="button" onClick={resetFilters}>
              {copy.reset}
            </button>
          </div>
        )}
      </section>

      <footer className="store-footer">
        <StoreBrand label={copy.brandAria} />
        <p>{copy.footer}</p>
        <p>© 2026 Lede Studios</p>
      </footer>
    </main>
  );
}
