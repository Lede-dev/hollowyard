"use client";

import { useMemo, useState } from "react";
import {
  newsPosts,
  postStatusLabels,
  postTypeLabels,
  type PostType,
} from "../../lib/posts";
import {
  StoreBrand,
  StoreLanguageSwitch,
  useStoreLanguage,
} from "../store/store-language";

type TypeFilter = "all" | PostType;
type SortMode = "latest" | "oldest";

const newsCopy = {
  ko: {
    brandAria: "할로우야드 홈",
    navAria: "소식 페이지 메뉴",
    home: "홈",
    store: "스토어",
    kicker: "HOLLOWYARD / NEWSROOM",
    title: "새로운 소식과,\n진행 중인 이벤트.",
    intro:
      "에셋 업데이트, 스토어 공지와 Hollowyard가 준비하는 이벤트를 한곳에서 확인할 수 있습니다.",
    countLabel: "개의 게시글",
    searchLabel: "게시글 검색",
    searchPlaceholder: "제목, 내용, 태그로 검색",
    typeLabel: "분류",
    all: "전체",
    sortLabel: "정렬",
    sortLatest: "최신순",
    sortOldest: "오래된 순",
    results: "개 결과",
    read: "게시글 읽기",
    published: "게시일",
    period: "기간",
    emptyTitle: "게시글을 찾을 수 없습니다.",
    emptyDescription: "검색어를 바꾸거나 다른 분류를 선택해 보세요.",
    reset: "필터 초기화",
    footer: "공지부터 이벤트까지, Hollowyard의 새로운 기록.",
  },
  en: {
    brandAria: "Hollowyard home",
    navAria: "News navigation",
    home: "Home",
    store: "Store",
    kicker: "HOLLOWYARD / NEWSROOM",
    title: "LATEST NOTES.\nCURRENT EVENTS.",
    intro:
      "Follow asset updates, store announcements, and events from Hollowyard in one place.",
    countLabel: "posts",
    searchLabel: "Search posts",
    searchPlaceholder: "Search by title, content, or tag",
    typeLabel: "Type",
    all: "All",
    sortLabel: "Sort",
    sortLatest: "Newest",
    sortOldest: "Oldest",
    results: "results",
    read: "Read post",
    published: "Published",
    period: "Period",
    emptyTitle: "No posts found.",
    emptyDescription: "Try another term or choose a different type.",
    reset: "Reset filters",
    footer: "Announcements, events, and everything new at Hollowyard.",
  },
} as const;

const postTypes: PostType[] = ["notice", "event"];

function formatDate(value: string, language: "ko" | "en") {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function NewsClient() {
  const { language, selectLanguage } = useStoreLanguage();
  const copy = newsCopy[language];
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<SortMode>("latest");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const result = newsPosts.filter((post) => {
      const matchesType = type === "all" || post.type === type;
      const searchableText = [
        post.title[language],
        post.summary[language],
        postTypeLabels[post.type][language],
        ...post.tags,
        ...post.body.flatMap((section) => [
          section.heading[language],
          ...section.paragraphs[language],
        ]),
      ]
        .join(" ")
        .toLocaleLowerCase();

      return (
        matchesType &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });

    return [...result].sort((first, second) =>
      sort === "latest"
        ? second.publishedAt.localeCompare(first.publishedAt)
        : first.publishedAt.localeCompare(second.publishedAt),
    );
  }, [language, query, sort, type]);

  const resetFilters = () => {
    setQuery("");
    setType("all");
    setSort("latest");
  };

  return (
    <main className="news-page" data-language={language}>
      <header className="site-header store-site-header">
        <StoreBrand label={copy.brandAria} />
        <nav className="main-nav" aria-label={copy.navAria}>
          <a href="/">{copy.home}</a>
          <a href="/store">{copy.store}</a>
        </nav>
        <div className="header-actions">
          <StoreLanguageSwitch
            language={language}
            onSelect={selectLanguage}
          />
        </div>
      </header>

      <section className="news-hero">
        <div>
          <p className="section-kicker">{copy.kicker}</p>
          <h1>
            {copy.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>
        <div className="news-hero-aside">
          <p>{copy.intro}</p>
          <div>
            <strong>{String(newsPosts.length).padStart(2, "0")}</strong>
            <span>{copy.countLabel}</span>
          </div>
        </div>
      </section>

      <section className="news-toolbar" aria-label={copy.typeLabel}>
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

        <div className="category-filter" aria-label={copy.typeLabel}>
          <span className="toolbar-label">{copy.typeLabel}</span>
          <div>
            <button
              type="button"
              aria-pressed={type === "all"}
              onClick={() => setType("all")}
            >
              {copy.all} <sup>{newsPosts.length}</sup>
            </button>
            {postTypes.map((postType) => {
              const count = newsPosts.filter(
                (post) => post.type === postType,
              ).length;
              return (
                <button
                  type="button"
                  aria-pressed={type === postType}
                  onClick={() => setType(postType)}
                  key={postType}
                >
                  {postTypeLabels[postType][language]} <sup>{count}</sup>
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
            <option value="oldest">{copy.sortOldest}</option>
          </select>
        </label>
      </section>

      <section className="news-results">
        <div className="results-header">
          <span>
            {String(filteredPosts.length).padStart(2, "0")} {copy.results}
          </span>
          <span>HOLLOWYARD® / NEWSROOM</span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="news-grid">
            {filteredPosts.map((post) => (
              <a
                className={`news-card news-tone-${post.tone}${post.featured ? " is-featured" : ""}`}
                href={`/news/${post.slug}`}
                key={post.slug}
                aria-label={`${post.title[language]} — ${copy.read}`}
              >
                <div className="news-card-meta">
                  <span>{postTypeLabels[post.type][language]}</span>
                  <span>{postStatusLabels[post.status][language]}</span>
                </div>
                <div className="news-card-index">
                  <span>{post.code}</span>
                  <strong aria-hidden="true">
                    {post.type === "event" ? "EV" : "NT"}
                  </strong>
                </div>
                <div className="news-card-body">
                  <p>
                    {copy.published} /{" "}
                    {formatDate(post.publishedAt, language)}
                  </p>
                  <h2>{post.title[language]}</h2>
                  <p>{post.summary[language]}</p>
                  <div className="news-card-footer">
                    <div>
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
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
