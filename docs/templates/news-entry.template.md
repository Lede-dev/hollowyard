# 공지·이벤트 데이터 템플릿

아래 객체를 복제해 `lib/posts.ts`의 `newsPosts` 배열에 추가합니다.

```ts
{
  code: "HY—NEWS—000",
  slug: "post-slug",
  type: "notice",
  status: "published",
  tone: "acid",
  featured: false,
  title: {
    ko: "게시글 제목",
    en: "Post title",
  },
  summary: {
    ko: "목록과 상세 상단에 표시되는 한 줄 요약",
    en: "One-line summary shown in the list and detail hero.",
  },
  publishedAt: "2026-07-27",
  // 이벤트일 때만 사용합니다.
  eventPeriod: {
    start: "2026-07-27",
    end: "2026-08-31",
  },
  tags: ["UPDATE", "STORE"],
  body: [
    {
      heading: {
        ko: "본문 섹션 제목",
        en: "Body section title",
      },
      paragraphs: {
        ko: [
          "첫 번째 한국어 문단",
          "두 번째 한국어 문단",
        ],
        en: [
          "First English paragraph.",
          "Second English paragraph.",
        ],
      },
    },
  ],
  links: [
    {
      label: {
        ko: "관련 링크",
        en: "Related link",
      },
      description: {
        ko: "링크에 대한 짧은 설명",
        en: "A short description of the destination.",
      },
      url: "/store",
    },
  ],
},
```

이벤트가 아니라면 `eventPeriod`를 제거합니다. 관련 링크가 없다면 `links: []`를 사용합니다.
