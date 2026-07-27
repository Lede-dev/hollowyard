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
  id: "fab" | "unity" | "gumroad";
  name: string;
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
  tags: string[];
  includes: {
    ko: string[];
    en: string[];
  };
  specifications: Array<{
    label: LocalizedText;
    value: string;
  }>;
  stores: Storefront["id"][];
  release: string;
};

export const storefronts: Record<Storefront["id"], Storefront> = {
  fab: {
    id: "fab",
    name: "Fab",
    url: "https://www.fab.com/",
  },
  unity: {
    id: "unity",
    name: "Unity Asset Store",
    url: "https://assetstore.unity.com/",
  },
  gumroad: {
    id: "gumroad",
    name: "Gumroad",
    url: "https://gumroad.com/",
  },
};

export const categoryLabels: Record<ProductCategory, LocalizedText> = {
  environment: { ko: "환경", en: "Environment" },
  characters: { ko: "캐릭터", en: "Characters" },
  interface: { ko: "인터페이스", en: "Interface" },
  audio: { ko: "오디오", en: "Audio" },
  props: { ko: "소품", en: "Props" },
};

export const products: Product[] = [
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
    stores: ["fab", "unity"],
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
    stores: ["fab", "unity"],
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
    stores: ["fab", "unity"],
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
    stores: ["gumroad", "unity"],
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
    stores: ["gumroad", "fab"],
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
    stores: ["fab", "unity", "gumroad"],
    release: "2026.02",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

