import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Hollowyard homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>HOLLOWYARD — Game Assets for Worlds Yet to Exist<\/title>/i,
  );
  assert.match(html, /아직 없는 세계를 위한/);
  assert.match(html, /class="marquee-track"/);
  assert.match(html, /href="\/news">공지<\/a>/);
  assert.match(html, /© 2026 Lede Studios/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("server-renders product editorial, documents, and purchase links", async () => {
  const response = await render("/store/neon-district");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /네온 디스트릭트/);
  assert.match(html, /class="asset-editorial"/);
  assert.match(html, /도시를 조립하는 방식/);
  assert.match(html, /에셋 가이드/);
  assert.match(html, /docs\/assets\/neon-district\.md/);
  assert.match(html, /최대 6개의 독립적인 구매 링크/);
  assert.match(html, /class="storefront-links"/);
});

test("server-renders the active marketplace directory", async () => {
  const response = await render("/store");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /class="storefront-directory"/);
  assert.match(html, /OFFICIAL STOREFRONTS/);
  assert.match(html, /Fab/);
  assert.match(html, /Unity Asset Store/);
  assert.match(html, /Gumroad/);
  assert.match(html, /등록 에셋/);
  assert.ok(html.includes('href="https://www.fab.com/"'));
});

test("server-renders the news index and event detail", async () => {
  const [indexResponse, detailResponse] = await Promise.all([
    render("/news"),
    render("/news/worldbuilding-showcase-2026"),
  ]);

  assert.equal(indexResponse.status, 200);
  assert.equal(detailResponse.status, 200);

  const [indexHtml, detailHtml] = await Promise.all([
    indexResponse.text(),
    detailResponse.text(),
  ]);

  assert.match(indexHtml, /HOLLOWYARD \/ NEWSROOM/);
  assert.match(indexHtml, /Hollowyard 스토어 베타 오픈/);
  assert.match(indexHtml, /Worldbuilding Showcase 2026/);
  assert.match(indexHtml, /class="news-grid"/);
  assert.match(indexHtml, /href="\/news" aria-current="page">공지<\/a>/);
  assert.match(detailHtml, /class="news-detail-hero news-tone-coral"/);
  assert.match(detailHtml, /이벤트 기간/);
  assert.match(detailHtml, /완성 결과와 제작 과정을 함께/);
});

test("keeps asset registration templates and purchase-link validation", async () => {
  const [products, workflow, productTemplate, guideTemplate] = await Promise.all([
    readFile(new URL("../lib/products.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../docs/asset-registration-workflow.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../docs/templates/product-entry.template.md",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../docs/assets/_template.md", import.meta.url), "utf8"),
  ]);

  assert.match(products, /export const MAX_PURCHASE_LINKS = 6/);
  assert.match(products, /product\.purchaseLinks\.length > MAX_PURCHASE_LINKS/);
  assert.match(workflow, /최대 6개/);
  assert.match(productTemplate, /purchaseLinks/);
  assert.match(productTemplate, /body:/);
  assert.match(productTemplate, /documents:/);
  assert.match(guideTemplate, /## 설치/);
});

test("keeps the news publishing workflow and data template", async () => {
  const [posts, workflow, template] = await Promise.all([
    readFile(new URL("../lib/posts.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../docs/news-publishing-workflow.md", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../docs/templates/news-entry.template.md", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(posts, /export type PostType = "notice" \| "event"/);
  assert.match(posts, /export const newsPosts/);
  assert.match(workflow, /공지·이벤트 게시 워크플로/);
  assert.match(template, /eventPeriod/);
  assert.match(template, /featured:/);
  assert.match(template, /body:/);
});
