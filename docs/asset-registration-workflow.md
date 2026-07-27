# Hollowyard 에셋 등록 워크플로

새 에셋을 스토어 목록과 상세 페이지에 추가할 때 사용하는 표준 작업 절차입니다.

## 1. 준비

- 상품 코드와 URL용 `slug`를 확정합니다.
- 한국어·영어 제목, 한 줄 요약, 상세 소개를 준비합니다.
- 구성품, 기술 사양, 태그, 출시 월을 정리합니다.
- 실제 에셋 구매 페이지 URL을 최대 6개까지 준비합니다.
- 설치 또는 사용 가이드가 필요하면 `docs/assets/_template.md`를 복제합니다.

## 2. 상품 데이터 등록

1. `docs/templates/product-entry.template.md`의 객체를 복제합니다.
2. `lib/products.ts`의 `products` 배열 마지막에 객체를 추가합니다.
3. `slug`는 영문 소문자와 하이픈만 사용하고 다른 상품과 중복되지 않게 합니다.
4. `purchaseLinks`에는 플랫폼 홈이 아닌 해당 상품의 직접 구매 URL을 넣습니다.
5. `purchaseLinks`는 최대 6개입니다. 초과하면 빌드가 실패하도록 검증되어 있습니다.
6. `body`에는 상세 페이지 본문 섹션을 원하는 만큼 추가할 수 있습니다.
7. `documents`에는 가이드, 변경 기록, 지원 페이지 등 외부 문서를 연결합니다.

지원 플랫폼 ID:

- `fab`
- `unity`
- `gumroad`
- `itch`
- `cgtrader`
- `cubebrush`

새 플랫폼이 필요하면 `Storefront` 타입과 `storefronts` 레코드를 함께 추가합니다.

## 3. 에셋 가이드 작성

1. `docs/assets/_template.md`를 `docs/assets/{slug}.md`로 복제합니다.
2. 설치, 구성 파일, 권장 사용 순서, 지원 범위를 작성합니다.
3. 상품 데이터의 `documents` URL이 새 문서를 정확히 가리키는지 확인합니다.
4. 별도 문서가 없다면 `documents: []`로 둘 수 있습니다.

## 4. 검증

```bash
npm run build
npm test
```

확인 항목:

- `/store`에 새 상품 카드가 표시되는가
- `/store/{slug}`가 정상 생성되는가
- 한국어와 영어 본문이 모두 표시되는가
- 문서 링크가 새 창에서 올바르게 열리는가
- 모든 구매 버튼이 해당 상품의 직접 구매 페이지로 이동하는가
- 모바일에서 구매 링크와 문서 카드가 한 열로 정렬되는가

## 5. 배포

검증이 끝난 변경을 `main`에 반영하면 GitHub Actions가 Cloudflare 배포를 수행합니다. 배포 후 공개 상세 페이지와 구매 링크를 다시 확인합니다.
