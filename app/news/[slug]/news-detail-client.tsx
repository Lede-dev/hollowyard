"use client";

import {
  newsPosts,
  postStatusLabels,
  postTypeLabels,
  type NewsPost,
} from "../../../lib/posts";
import {
  StoreBrand,
  StoreLanguageSwitch,
  useStoreLanguage,
} from "../../store/store-language";

const detailCopy = {
  ko: {
    brandAria: "할로우야드 홈",
    navAria: "소식 상세 메뉴",
    home: "홈",
    store: "스토어",
    news: "공지",
    published: "게시일",
    period: "이벤트 기간",
    article: "본문",
    links: "관련 링크",
    linksIntro: "게시글과 관련된 페이지나 문서를 확인합니다.",
    related: "다음 소식",
    read: "게시글 읽기",
    back: "모든 소식 보기",
    footer: "공지부터 이벤트까지, Hollowyard의 새로운 기록.",
  },
  en: {
    brandAria: "Hollowyard home",
    navAria: "News detail navigation",
    home: "Home",
    store: "Store",
    news: "News",
    published: "Published",
    period: "Event period",
    article: "Article",
    links: "Related links",
    linksIntro: "Open pages and documentation related to this post.",
    related: "Next stories",
    read: "Read post",
    back: "View all news",
    footer: "Announcements, events, and everything new at Hollowyard.",
  },
} as const;

function formatDate(value: string, language: "ko" | "en") {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function NewsDetailClient({ post }: { post: NewsPost }) {
  const { language, selectLanguage } = useStoreLanguage();
  const copy = detailCopy[language];
  const relatedPosts = newsPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((first, second) => {
      const firstMatch = first.type === post.type ? 1 : 0;
      const secondMatch = second.type === post.type ? 1 : 0;
      return (
        secondMatch - firstMatch ||
        second.publishedAt.localeCompare(first.publishedAt)
      );
    })
    .slice(0, 2);

  return (
    <main className="news-detail-page" data-language={language}>
      <header className="site-header store-site-header">
        <StoreBrand label={copy.brandAria} />
        <nav className="main-nav" aria-label={copy.navAria}>
          <a href="/">{copy.home}</a>
          <a href="/store">{copy.store}</a>
          <a href="/news" aria-current="page">
            {copy.news}
          </a>
        </nav>
        <div className="header-actions">
          <StoreLanguageSwitch
            language={language}
            onSelect={selectLanguage}
          />
        </div>
      </header>

      <div className="detail-breadcrumb">
        <a href="/news">NEWS</a>
        <span aria-hidden="true">/</span>
        <span>{post.code}</span>
      </div>

      <section className={`news-detail-hero news-tone-${post.tone}`}>
        <div className="news-detail-heading">
          <div className="news-detail-meta">
            <span>{postTypeLabels[post.type][language]}</span>
            <span>{postStatusLabels[post.status][language]}</span>
          </div>
          <h1>{post.title[language]}</h1>
          <p>{post.summary[language]}</p>
        </div>
        <aside className="news-detail-facts">
          <strong aria-hidden="true">
            {post.type === "event" ? "EV" : "NT"}
          </strong>
          <dl>
            <div>
              <dt>{copy.published}</dt>
              <dd>{formatDate(post.publishedAt, language)}</dd>
            </div>
            {post.eventPeriod ? (
              <div>
                <dt>{copy.period}</dt>
                <dd>
                  {formatDate(post.eventPeriod.start, language)}
                  <span aria-hidden="true"> — </span>
                  {formatDate(post.eventPeriod.end, language)}
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="news-detail-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className="news-article-layout">
        <article className="news-article">
          <p className="section-kicker">01 / {copy.article}</p>
          <div>
            {post.body.map((section, index) => (
              <section key={section.heading.en}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.heading[language]}</h2>
                  {section.paragraphs[language].map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="news-links">
          <p className="section-kicker">02 / {copy.links}</p>
          <p>{copy.linksIntro}</p>
          {post.links.length > 0 ? (
            <div>
              {post.links.map((link, index) => {
                const external = link.url.startsWith("http");
                return (
                  <a
                    href={link.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    key={link.url}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <b>{link.label[language]}</b>
                      <p>{link.description[language]}</p>
                    </div>
                    <strong aria-hidden="true">↗</strong>
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="news-links-empty">—</p>
          )}
        </aside>
      </section>

      <section className="news-related">
        <div className="related-heading">
          <p className="section-kicker">03 / NEXT</p>
          <h2>{copy.related}</h2>
        </div>
        <div className="news-related-grid">
          {relatedPosts.map((relatedPost) => (
            <a
              href={`/news/${relatedPost.slug}`}
              className={`news-related-card news-tone-${relatedPost.tone}`}
              key={relatedPost.slug}
              aria-label={`${relatedPost.title[language]} — ${copy.read}`}
            >
              <span>{postTypeLabels[relatedPost.type][language]}</span>
              <h3>{relatedPost.title[language]}</h3>
              <p>{formatDate(relatedPost.publishedAt, language)}</p>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <a className="back-to-store" href="/news">
          <span aria-hidden="true">←</span> {copy.back}
        </a>
      </section>

      <footer className="store-footer">
        <StoreBrand label={copy.brandAria} />
        <p>{copy.footer}</p>
        <p>© 2026 Lede Studios</p>
      </footer>
    </main>
  );
}
