# 상품 데이터 템플릿

아래 객체를 복제해 `lib/products.ts`의 `products` 배열에 추가합니다.

```ts
{
  code: "HY—ENV—000",
  slug: "asset-slug",
  category: "environment",
  tone: "acid",
  title: {
    ko: "에셋 이름",
    en: "Asset Name",
  },
  summary: {
    ko: "목록과 상세 상단에 표시되는 한 줄 요약",
    en: "One-line summary shown in listings and the detail hero.",
  },
  description: {
    ko: "본문을 시작하는 핵심 소개 문장",
    en: "Primary introduction for the editorial body.",
  },
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
  documents: [
    {
      label: {
        ko: "에셋 가이드",
        en: "Asset guide",
      },
      description: {
        ko: "문서 링크에 대한 짧은 설명",
        en: "A short description of the linked document.",
      },
      url: "https://example.com/document",
    },
  ],
  tags: ["3D", "MODULAR", "PBR"],
  includes: {
    ko: ["구성품 1", "구성품 2"],
    en: ["Included item 1", "Included item 2"],
  },
  specifications: [
    {
      label: { ko: "포맷", en: "Formats" },
      value: "FBX · OBJ",
    },
  ],
  purchaseLinks: [
    {
      storefront: "fab",
      url: "https://www.fab.com/listings/product-specific-url",
    },
    {
      storefront: "unity",
      url: "https://assetstore.unity.com/packages/product-specific-url",
    },
  ],
  release: "2026.07",
},
```

`purchaseLinks`에는 최대 6개만 등록할 수 있습니다. 문서가 없으면 `documents: []`를 사용합니다.
