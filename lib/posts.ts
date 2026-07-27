import type { LocalizedText } from "./products";

export type PostType = "notice" | "event";
export type PostStatus = "published" | "ongoing" | "ended";
export type PostTone = "acid" | "coral" | "blue" | "violet";

export type NewsPost = {
  code: string;
  slug: string;
  type: PostType;
  status: PostStatus;
  tone: PostTone;
  featured: boolean;
  title: LocalizedText;
  summary: LocalizedText;
  publishedAt: string;
  eventPeriod?: {
    start: string;
    end: string;
  };
  tags: string[];
  body: Array<{
    heading: LocalizedText;
    paragraphs: {
      ko: string[];
      en: string[];
    };
  }>;
  links: Array<{
    label: LocalizedText;
    description: LocalizedText;
    url: string;
  }>;
};

export const postTypeLabels: Record<PostType, LocalizedText> = {
  notice: { ko: "공지", en: "Notice" },
  event: { ko: "이벤트", en: "Event" },
};

export const postStatusLabels: Record<PostStatus, LocalizedText> = {
  published: { ko: "게시됨", en: "Published" },
  ongoing: { ko: "진행 중", en: "Ongoing" },
  ended: { ko: "종료", en: "Ended" },
};

export const newsPosts: NewsPost[] = [
  {
    code: "HY—NEWS—001",
    slug: "hollowyard-store-beta-open",
    type: "notice",
    status: "published",
    tone: "acid",
    featured: true,
    title: {
      ko: "Hollowyard 스토어 베타 오픈",
      en: "Hollowyard Store Beta Is Open",
    },
    summary: {
      ko: "여러 마켓에 흩어진 에셋 정보와 문서를 한곳에서 확인할 수 있는 스토어를 공개합니다.",
      en: "Our new store brings asset details, documentation, and marketplace links into one index.",
    },
    publishedAt: "2026-07-27",
    tags: ["STORE", "BETA", "UPDATE"],
    body: [
      {
        heading: {
          ko: "에셋을 더 쉽게 비교하는 공간",
          en: "A clearer way to compare assets",
        },
        paragraphs: {
          ko: [
            "Hollowyard 스토어 베타를 공개합니다. 환경, 캐릭터, 인터페이스, 오디오와 소품 에셋을 카테고리별로 살펴보고 필요한 정보를 한 페이지에서 비교할 수 있습니다.",
            "각 상세 페이지에는 구성품, 기술 사양, 사용 가이드와 구매 링크가 정리됩니다. 실제 상품별 링크와 새로운 문서는 준비되는 순서대로 업데이트할 예정입니다.",
          ],
          en: [
            "The Hollowyard Store beta is now open. Browse environment, character, interface, audio, and prop assets by category and compare the essential details in one place.",
            "Each detail page collects included files, technical specifications, usage guides, and purchase links. Product-specific links and new documentation will be added as they become available.",
          ],
        },
      },
      {
        heading: {
          ko: "베타 기간에 개선할 항목",
          en: "What we are improving during beta",
        },
        paragraphs: {
          ko: [
            "상품 미리보기, 플랫폼별 직접 구매 링크, 문서 탐색과 모바일 가독성을 우선적으로 다듬고 있습니다.",
          ],
          en: [
            "Product previews, direct marketplace links, documentation discovery, and mobile readability are the first areas we are refining.",
          ],
        },
      },
    ],
    links: [
      {
        label: { ko: "스토어 둘러보기", en: "Explore the store" },
        description: {
          ko: "현재 등록된 Hollowyard 에셋을 확인합니다.",
          en: "Browse the Hollowyard assets currently in the index.",
        },
        url: "/store",
      },
    ],
  },
  {
    code: "HY—EVENT—001",
    slug: "worldbuilding-showcase-2026",
    type: "event",
    status: "ongoing",
    tone: "coral",
    featured: true,
    title: {
      ko: "Worldbuilding Showcase 2026",
      en: "Worldbuilding Showcase 2026",
    },
    summary: {
      ko: "Hollowyard 에셋으로 만든 장면과 제작 과정을 소개하는 온라인 쇼케이스입니다.",
      en: "An online showcase of scenes and production workflows built with Hollowyard assets.",
    },
    publishedAt: "2026-07-24",
    eventPeriod: {
      start: "2026-07-27",
      end: "2026-08-31",
    },
    tags: ["SHOWCASE", "WORLD-BUILDING", "ONLINE"],
    body: [
      {
        heading: {
          ko: "완성 결과와 제작 과정을 함께",
          en: "See the result and the process",
        },
        paragraphs: {
          ko: [
            "Worldbuilding Showcase는 완성된 이미지뿐 아니라 장면을 구성한 순서와 에셋을 선택한 이유까지 함께 기록하는 온라인 이벤트입니다.",
            "선정된 작업은 추후 Hollowyard 채널과 관련 에셋 페이지에서 소개할 예정입니다.",
          ],
          en: [
            "Worldbuilding Showcase documents not only finished scenes, but also the construction order and the reasoning behind each asset choice.",
            "Selected work may be featured later through Hollowyard channels and related asset pages.",
          ],
        },
      },
    ],
    links: [],
  },
  {
    code: "HY—NEWS—002",
    slug: "asset-documentation-update",
    type: "notice",
    status: "published",
    tone: "blue",
    featured: false,
    title: {
      ko: "에셋 문서 구조 업데이트",
      en: "Asset Documentation Update",
    },
    summary: {
      ko: "설치, 구성 파일과 권장 사용 순서를 에셋 상세 페이지에서 바로 찾을 수 있도록 정리했습니다.",
      en: "Installation, file structure, and recommended setup steps are now easier to find from each asset page.",
    },
    publishedAt: "2026-07-22",
    tags: ["DOCUMENTATION", "GUIDE"],
    body: [
      {
        heading: {
          ko: "상세 페이지에서 문서까지",
          en: "From product detail to documentation",
        },
        paragraphs: {
          ko: [
            "각 에셋 페이지에 장문 설명과 문서 링크 영역을 추가했습니다. 설치 가이드와 관련 문서를 새 창에서 열어 작업 흐름을 이어갈 수 있습니다.",
            "새 에셋도 같은 형식으로 등록할 수 있도록 데이터와 문서 템플릿을 함께 관리합니다.",
          ],
          en: [
            "Every asset page now supports long-form editorial content and documentation links that open without interrupting the product overview.",
            "Data and documentation templates keep future asset publishing consistent.",
          ],
        },
      },
    ],
    links: [
      {
        label: { ko: "네온 디스트릭트 가이드", en: "Neon District guide" },
        description: {
          ko: "현재 적용된 에셋 문서 예시를 확인합니다.",
          en: "View a current example of the asset documentation format.",
        },
        url: "https://github.com/Lede-dev/hollowyard/blob/main/docs/assets/neon-district.md",
      },
    ],
  },
  {
    code: "HY—EVENT—002",
    slug: "creator-feedback-session",
    type: "event",
    status: "ended",
    tone: "violet",
    featured: false,
    title: {
      ko: "Creator Feedback Session",
      en: "Creator Feedback Session",
    },
    summary: {
      ko: "스토어 베타와 에셋 문서에 대한 초기 제작자 피드백을 정리한 세션입니다.",
      en: "A focused feedback session covering the store beta and asset documentation.",
    },
    publishedAt: "2026-07-18",
    eventPeriod: {
      start: "2026-07-18",
      end: "2026-07-20",
    },
    tags: ["FEEDBACK", "CREATORS", "BETA"],
    body: [
      {
        heading: {
          ko: "초기 피드백에서 확인한 것",
          en: "What we learned",
        },
        paragraphs: {
          ko: [
            "에셋의 시각적 인상만큼 실제 구성 파일, 지원 포맷과 구매처를 빠르게 비교할 수 있는 정보 구조가 중요하다는 점을 확인했습니다.",
            "피드백을 바탕으로 상세 본문, 문서 카드와 다중 구매 링크 구조를 스토어에 반영했습니다.",
          ],
          en: [
            "The early feedback confirmed that file contents, supported formats, and purchase options need to be as easy to compare as the visual style.",
            "That feedback informed the long-form detail body, documentation cards, and multi-store purchase links now used in the store.",
          ],
        },
      },
    ],
    links: [],
  },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}
