export type Language = "ko" | "en";
export type ProductCategory =
  | "environment"
  | "characters"
  | "interface"
  | "audio"
  | "props";
export type ProductTone =
  | "acid"
  | "coral"
  | "blue"
  | "violet"
  | "orange"
  | "mint";

export type LocalizedText = {
  ko: string;
  en: string;
};

export type Storefront = {
  id: "fab" | "unity" | "gumroad" | "itch" | "cgtrader" | "cubebrush";
  name: string;
  url: string;
  profileUrl?: string;
  description: LocalizedText;
};

export type ProductBodySection = {
  heading: LocalizedText;
  paragraphs: {
    ko: string[];
    en: string[];
  };
};

export type ProductDocumentLink = {
  label: LocalizedText;
  description: LocalizedText;
  url: string;
};

export type ProductPurchaseLink = {
  storefront: Storefront["id"];
  url: string;
};

export type Product = {
  code: string;
  slug: string;
  category: ProductCategory;
  tone: ProductTone;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  body: ProductBodySection[];
  documents: ProductDocumentLink[];
  tags: string[];
  includes: {
    ko: string[];
    en: string[];
  };
  specifications: Array<{
    label: LocalizedText;
    value: string;
  }>;
  purchaseLinks: ProductPurchaseLink[];
  release: string;
};

export const MAX_PURCHASE_LINKS = 6;

export const storefronts: Record<Storefront["id"], Storefront> = {
  fab: {
    id: "fab",
    name: "Fab",
    url: "https://www.fab.com/",
    profileUrl: "https://fab.hollowyard.com/",
    description: {
      ko: "언리얼 엔진과 실시간 제작 환경을 위한 에셋을 만나는 글로벌 마켓입니다.",
      en: "A global marketplace for Unreal Engine and real-time production assets.",
    },
  },
  unity: {
    id: "unity",
    name: "Unity Asset Store",
    url: "https://assetstore.unity.com/",
    profileUrl: "https://unityassetstore.hollowyard.com/",
    description: {
      ko: "Unity 프로젝트에 바로 적용할 수 있는 패키지와 리소스를 제공하는 마켓입니다.",
      en: "A marketplace for packages and resources ready to use in Unity projects.",
    },
  },
  gumroad: {
    id: "gumroad",
    name: "Gumroad",
    url: "https://gumroad.com/",
    profileUrl: "https://gumroad.hollowyard.com/",
    description: {
      ko: "원본 파일과 독립 배포 상품을 Hollowyard에서 직접 제공하는 채널입니다.",
      en: "Hollowyard's direct channel for source files and independently distributed products.",
    },
  },
  itch: {
    id: "itch",
    name: "itch.io",
    url: "https://itch.io/game-assets",
    description: {
      ko: "인디 게임 제작자를 위한 도구와 에셋을 제공하는 오픈 마켓입니다.",
      en: "An open marketplace for tools and assets made for indie game creators.",
    },
  },
  cgtrader: {
    id: "cgtrader",
    name: "CGTrader",
    url: "https://www.cgtrader.com/",
    description: {
      ko: "게임과 시각화를 위한 3D 모델을 제공하는 전문 마켓입니다.",
      en: "A specialist marketplace for 3D models used in games and visualization.",
    },
  },
  cubebrush: {
    id: "cubebrush",
    name: "Cubebrush",
    url: "https://cubebrush.co/",
    description: {
      ko: "게임 아트와 디지털 제작 리소스를 제공하는 크리에이터 마켓입니다.",
      en: "A creator marketplace for game art and digital production resources.",
    },
  },
};

export const categoryLabels: Record<ProductCategory, LocalizedText> = {
  environment: { ko: "환경", en: "Environment" },
  characters: { ko: "캐릭터", en: "Characters" },
  interface: { ko: "인터페이스", en: "Interface" },
  audio: { ko: "오디오", en: "Audio" },
  props: { ko: "소품", en: "Props" },
};

function assetGuide(slug: string): ProductDocumentLink {
  return {
    label: { ko: "에셋 가이드", en: "Asset guide" },
    description: {
      ko: "설치, 구성 파일, 권장 사용 순서를 확인합니다.",
      en: "Review installation, included files, and the recommended setup.",
    },
    url: `https://github.com/Lede-dev/hollowyard/blob/main/docs/assets/${slug}.md`,
  };
}

function defineProducts(entries: Product[]) {
  entries.forEach((product) => {
    if (product.purchaseLinks.length > MAX_PURCHASE_LINKS) {
      throw new Error(
        `${product.slug} has ${product.purchaseLinks.length} purchase links. The maximum is ${MAX_PURCHASE_LINKS}.`,
      );
    }
  });

  return entries;
}

export const products: Product[] = defineProducts([
  {
    code: "HY—ENV—001",
    slug: "neon-district",
    category: "environment",
    tone: "acid",
    title: {
      ko: "네온 디스트릭트",
      en: "Neon District",
    },
    summary: {
      ko: "밤의 도시를 빠르게 조립하는 모듈형 사이버펑크 환경 키트",
      en: "A modular cyberpunk environment kit for assembling cities after dark.",
    },
    description: {
      ko: "좁은 골목, 상점 외벽, 옥상 구조물과 네온 사인을 조합해 밀도 높은 미래 도시를 구성할 수 있습니다. 반복 사용이 눈에 띄지 않도록 모듈 비율과 머티리얼 변형을 함께 설계했습니다.",
      en: "Build dense future cities from alleys, storefronts, rooftop structures, and neon signage. Modular proportions and material variations are designed to keep repetition from feeling obvious.",
    },
    body: [
      {
        heading: { ko: "도시를 조립하는 방식", en: "Build the city in layers" },
        paragraphs: {
          ko: [
            "대형 건축 모듈로 실루엣을 먼저 잡고, 상점 외벽과 옥상 구조물로 밀도를 더한 뒤 네온 사인과 거리 소품으로 시선을 유도하는 흐름을 권장합니다.",
            "모든 주요 모듈은 공통 그리드를 사용하며 머티리얼 변형을 조합해 같은 구조를 반복해도 장면의 인상이 달라지도록 설계했습니다.",
          ],
          en: [
            "Start with large architectural modules, add density with storefronts and rooftop structures, then guide the eye with neon signs and street props.",
            "Major modules share a common grid, while material variants help repeated structures read as distinct spaces.",
          ],
        },
      },
    ],
    documents: [assetGuide("neon-district")],
    tags: ["3D", "MODULAR", "PBR"],
    includes: {
      ko: [
        "건축 모듈 64종",
        "네온 사인 42종",
        "거리 소품 38종",
        "데모 씬과 라이트 프리셋",
      ],
      en: [
        "64 architectural modules",
        "42 neon signs",
        "38 street props",
        "Demo scene and lighting presets",
      ],
    },
    specifications: [
      {
        label: { ko: "포맷", en: "Formats" },
        value: "FBX · OBJ · PNG",
      },
      {
        label: { ko: "텍스처", en: "Textures" },
        value: "2K / 4K PBR",
      },
      {
        label: { ko: "지원", en: "Support" },
        value: "Unity · Unreal Engine",
      },
    ],
    purchaseLinks: [
      { storefront: "fab", url: storefronts.fab.url },
      { storefront: "unity", url: storefronts.unity.url },
    ],
    release: "2026.07",
  },
  {
    code: "HY—ENV—002",
    slug: "mosswood-ruins",
    category: "environment",
    tone: "mint",
    title: {
      ko: "모스우드 유적",
      en: "Mosswood Ruins",
    },
    summary: {
      ko: "이끼와 오래된 돌로 채우는 스타일라이즈드 판타지 유적 세트",
      en: "A stylized fantasy ruin set shaped by moss, stone, and time.",
    },
    description: {
      ko: "무너진 벽, 아치, 계단과 식생을 자유롭게 배치해 작은 던전부터 넓은 야외 유적까지 만들 수 있습니다. 따뜻한 색감과 단순한 형태로 다양한 판타지 스타일에 자연스럽게 섞입니다.",
      en: "Arrange broken walls, arches, stairs, and foliage to build anything from a small dungeon to a broad outdoor ruin. Warm colors and simplified forms blend naturally into a range of fantasy styles.",
    },
    body: [
      {
        heading: { ko: "작은 폐허부터 넓은 유적까지", en: "From ruins to landmarks" },
        paragraphs: {
          ko: [
            "벽과 아치 모듈을 조합해 기본 동선을 만든 뒤 계단, 파편, 식생을 겹쳐 오래된 장소의 시간감을 표현할 수 있습니다.",
            "주간과 야간 데모 씬을 기준으로 조명과 안개 밀도를 비교하며 프로젝트의 스타일에 맞게 조정하세요.",
          ],
          en: [
            "Combine walls and arches to establish circulation, then layer stairs, rubble, and foliage to suggest the age of the location.",
            "Use the day and night demo scenes as lighting references, then tune fog and color to match your project.",
          ],
        },
      },
    ],
    documents: [assetGuide("mosswood-ruins")],
    tags: ["3D", "STYLIZED", "NATURE"],
    includes: {
      ko: [
        "석조 모듈 51종",
        "식생 에셋 26종",
        "바닥 데칼 18종",
        "주간·야간 데모 씬",
      ],
      en: [
        "51 stone modules",
        "26 foliage assets",
        "18 ground decals",
        "Day and night demo scenes",
      ],
    },
    specifications: [
      {
        label: { ko: "포맷", en: "Formats" },
        value: "FBX · OBJ · PNG",
      },
      {
        label: { ko: "텍스처", en: "Textures" },
        value: "2K PBR",
      },
      {
        label: { ko: "지원", en: "Support" },
        value: "Unity · Unreal Engine",
      },
    ],
    purchaseLinks: [
      { storefront: "fab", url: storefronts.fab.url },
      { storefront: "unity", url: storefronts.unity.url },
    ],
    release: "2026.06",
  },
  {
    code: "HY—CHR—001",
    slug: "hollow-creatures-vol-01",
    category: "characters",
    tone: "coral",
    title: {
      ko: "할로우 크리처 Vol. 01",
      en: "Hollow Creatures Vol. 01",
    },
    summary: {
      ko: "어둡고 낯선 세계를 위한 게임 레디 크리처 컬렉션",
      en: "A game-ready creature collection for dark and unfamiliar worlds.",
    },
    description: {
      ko: "실루엣이 분명한 세 종류의 크리처와 공통 애니메이션 세트를 제공합니다. 기본 머티리얼 변형과 LOD가 포함되어 빠르게 전투와 탐험 장면에 배치할 수 있습니다.",
      en: "Three creatures with distinct silhouettes share a production-ready animation set. Material variations and LODs make them quick to place in combat and exploration scenes.",
    },
    body: [
      {
        heading: { ko: "공통 리그, 빠른 배치", en: "Shared rig, faster setup" },
        paragraphs: {
          ko: [
            "세 크리처는 공통 애니메이션 구조를 사용하므로 동일한 상태 머신과 전투 로직을 재사용하기 쉽습니다.",
            "근거리와 원거리 실루엣을 모두 확인할 수 있도록 LOD와 머티리얼 변형이 포함되어 있습니다.",
          ],
          en: [
            "All three creatures share an animation structure, making it easier to reuse state machines and combat logic.",
            "LOD levels and material variants support both close-up encounters and distant silhouettes.",
          ],
        },
      },
    ],
    documents: [assetGuide("hollow-creatures-vol-01")],
    tags: ["RIGGED", "ANIMATED", "LOD"],
    includes: {
      ko: [
        "크리처 캐릭터 3종",
        "공통 애니메이션 24종",
        "머티리얼 변형 4종",
        "LOD 3단계",
      ],
      en: [
        "3 creature characters",
        "24 shared animations",
        "4 material variations",
        "3 LOD levels",
      ],
    },
    specifications: [
      {
        label: { ko: "포맷", en: "Formats" },
        value: "FBX · GLB",
      },
      {
        label: { ko: "리그", en: "Rig" },
        value: "Humanoid-compatible",
      },
      {
        label: { ko: "지원", en: "Support" },
        value: "Unity · Unreal Engine",
      },
    ],
    purchaseLinks: [
      { storefront: "fab", url: storefronts.fab.url },
      { storefront: "unity", url: storefronts.unity.url },
    ],
    release: "2026.05",
  },
  {
    code: "HY—UI—001",
    slug: "signal-ui-system",
    category: "interface",
    tone: "blue",
    title: {
      ko: "시그널 UI 시스템",
      en: "Signal UI System",
    },
    summary: {
      ko: "전술·SF 게임을 위한 확장 가능한 HUD와 인터페이스 키트",
      en: "An expandable HUD and interface kit for tactical and science-fiction games.",
    },
    description: {
      ko: "HUD, 인벤토리, 미션 로그와 설정 화면을 하나의 시각 시스템으로 구성했습니다. 편집 가능한 원본과 컴포넌트 규칙을 포함해 프로젝트 규모가 커져도 일관성을 유지할 수 있습니다.",
      en: "HUDs, inventory, mission logs, and settings screens share one visual system. Editable sources and component rules help the interface stay consistent as the project grows.",
    },
    body: [
      {
        heading: { ko: "하나의 규칙으로 확장하기", en: "Scale from one system" },
        paragraphs: {
          ko: [
            "HUD와 메뉴 화면은 동일한 간격, 색상, 상태 규칙을 공유해 새로운 화면을 추가할 때도 일관성을 유지합니다.",
            "Figma 원본에서 토큰과 컴포넌트를 먼저 프로젝트 스타일에 맞춘 뒤 엔진용 에셋을 내보내는 흐름을 권장합니다.",
          ],
          en: [
            "HUD and menu screens share spacing, color, and state rules so new screens stay visually consistent.",
            "Adapt tokens and components in the Figma source before exporting engine-ready assets.",
          ],
        },
      },
    ],
    documents: [assetGuide("signal-ui-system")],
    tags: ["UI KIT", "FIGMA", "SOURCE"],
    includes: {
      ko: [
        "화면 템플릿 28종",
        "HUD 컴포넌트 76종",
        "아이콘 180종",
        "Figma 원본과 스타일 가이드",
      ],
      en: [
        "28 screen templates",
        "76 HUD components",
        "180 icons",
        "Figma source and style guide",
      ],
    },
    specifications: [
      {
        label: { ko: "포맷", en: "Formats" },
        value: "FIG · SVG · PNG",
      },
      {
        label: { ko: "해상도", en: "Resolution" },
        value: "Vector / 4K ready",
      },
      {
        label: { ko: "지원", en: "Support" },
        value: "Unity · Unreal · Web",
      },
    ],
    purchaseLinks: [
      { storefront: "gumroad", url: storefronts.gumroad.url },
      { storefront: "unity", url: storefronts.unity.url },
    ],
    release: "2026.04",
  },
  {
    code: "HY—AUD—001",
    slug: "impact-sfx-essentials",
    category: "audio",
    tone: "violet",
    title: {
      ko: "임팩트 SFX 에센셜",
      en: "Impact SFX Essentials",
    },
    summary: {
      ko: "전투와 인터랙션에 무게를 더하는 레이어형 효과음 라이브러리",
      en: "A layered effects library that adds weight to combat and interaction.",
    },
    description: {
      ko: "타격, 폭발, 금속, 파편과 에너지 계열 효과음을 바로 사용할 수 있는 완성음과 자유롭게 조합할 수 있는 레이어로 함께 제공합니다.",
      en: "Impacts, explosions, metal, debris, and energy sounds arrive as both finished effects and flexible layers ready for custom combinations.",
    },
    body: [
      {
        heading: { ko: "완성음과 레이어를 함께", en: "Finished sounds and layers" },
        paragraphs: {
          ko: [
            "빠른 프로토타입에는 완성 효과음을 바로 사용하고, 고유한 연출이 필요한 장면에서는 개별 레이어를 조합해 새로운 임팩트를 만들 수 있습니다.",
            "메타데이터 시트의 분류와 강도 값을 활용하면 대규모 프로젝트에서도 필요한 소리를 빠르게 찾을 수 있습니다.",
          ],
          en: [
            "Use finished effects for rapid prototyping, or combine individual layers when a scene needs a signature impact.",
            "The metadata sheet includes categories and intensity values for faster searching in larger projects.",
          ],
        },
      },
    ],
    documents: [assetGuide("impact-sfx-essentials")],
    tags: ["WAV", "96KHZ", "ROYALTY-FREE"],
    includes: {
      ko: [
        "완성 효과음 320종",
        "개별 레이어 180종",
        "루프 24종",
        "메타데이터 시트",
      ],
      en: [
        "320 finished sound effects",
        "180 individual layers",
        "24 loops",
        "Metadata sheet",
      ],
    },
    specifications: [
      {
        label: { ko: "포맷", en: "Formats" },
        value: "WAV",
      },
      {
        label: { ko: "품질", en: "Quality" },
        value: "24-bit / 96kHz",
      },
      {
        label: { ko: "라이선스", en: "License" },
        value: "Commercial use",
      },
    ],
    purchaseLinks: [
      { storefront: "gumroad", url: storefronts.gumroad.url },
      { storefront: "fab", url: storefronts.fab.url },
    ],
    release: "2026.03",
  },
  {
    code: "HY—PRP—001",
    slug: "workshop-props",
    category: "props",
    tone: "orange",
    title: {
      ko: "워크숍 프롭 컬렉션",
      en: "Workshop Props",
    },
    summary: {
      ko: "작업실과 생존 거점을 채우는 로우폴리 소품 컬렉션",
      en: "A low-poly prop collection for workshops, shelters, and survival bases.",
    },
    description: {
      ko: "도구, 수납함, 작업대, 조명과 생활 소품을 한 세트로 구성했습니다. 간결한 형태와 통일된 텍스처 팔레트로 배경의 밀도를 빠르게 높일 수 있습니다.",
      en: "Tools, storage, workbenches, lighting, and everyday objects form one cohesive set. Clean shapes and a shared texture palette add density without visual noise.",
    },
    body: [
      {
        heading: { ko: "배경에 생활감을 더하기", en: "Add lived-in detail" },
        paragraphs: {
          ko: [
            "작업대와 수납함으로 공간의 큰 기능을 정한 뒤 도구, 조명, 생활 소품을 이야기의 단서처럼 배치할 수 있습니다.",
            "공유 텍스처 아틀라스를 사용해 드로우 콜을 관리하면서도 여섯 가지 색상 변형으로 구역별 차이를 만들 수 있습니다.",
          ],
          en: [
            "Establish the function of a room with workbenches and storage, then use tools, lights, and everyday objects as story cues.",
            "Shared texture atlases help control draw calls, while six color variants distinguish different areas.",
          ],
        },
      },
    ],
    documents: [assetGuide("workshop-props")],
    tags: ["LOW-POLY", "PROPS", "ATLAS"],
    includes: {
      ko: [
        "소품 모델 96종",
        "컬러 변형 6종",
        "텍스처 아틀라스 4종",
        "조립형 데모 씬",
      ],
      en: [
        "96 prop models",
        "6 color variations",
        "4 texture atlases",
        "Modular demo scene",
      ],
    },
    specifications: [
      {
        label: { ko: "포맷", en: "Formats" },
        value: "FBX · OBJ · GLB",
      },
      {
        label: { ko: "텍스처", en: "Textures" },
        value: "1K / 2K Atlas",
      },
      {
        label: { ko: "지원", en: "Support" },
        value: "Unity · Unreal · Godot",
      },
    ],
    purchaseLinks: [
      { storefront: "fab", url: storefronts.fab.url },
      { storefront: "unity", url: storefronts.unity.url },
      { storefront: "gumroad", url: storefronts.gumroad.url },
    ],
    release: "2026.02",
  },
]);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
