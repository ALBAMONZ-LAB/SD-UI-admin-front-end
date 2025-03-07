# SD-UI Admin Front End

이 프로젝트는 **SD-UI**의 이벤트를 관리하는 관리자 대시보드입니다. [SD_UI_PoC](https://github.com/ALBAMONZ-LAB/SD_UI_PoC) 백엔드와 연결되며, 이벤트 페이지 생성, 조회 및 관리를 제공합니다.

## 기능

- 이벤트 관리: 이벤트를 생성, 조회 및 관리할 수 있음.
- API 연동: `SD_UI_PoC` 백엔드에서 데이터를 가져옴. (추가 예정)
- TanStack Query 사용: 효율적인 데이터 가져오기 및 캐싱.
- Next.js 15 (App Router): 최신 아키텍처 적용.
- TypeScript 지원: 타입 안정성 강화.

## 프로젝트 구조

```
📂 src/
 ┣ 📂 app/                     # App Router (Next.js 15)
 ┣ 📂 components/              # 재사용 가능한 컴포넌트
 ┣ 📂 hooks/                   # 커스텀 훅 (TanStack Query)
 ┣ 📂 api/                     # API 호출 함수
 ┣ 📂 types/                   # 타입 정의
 ┣ 📂 utils/                   # 공통 유틸 함수
 ┣ 📂 styles/                  # 전역 스타일 (추가 예정)
 ┣ next.config.js              # Next.js 설정
 ┣ tsconfig.json               # TypeScript 설정
 ┗ package.json                # 패키지 목록
```

## 설치 방법

```sh
git clone https://github.com/ALBAMONZ-LAB/SD-UI-admin-front-end.git
cd SD-UI-admin-front-end
npm install
```

## 실행 방법

```sh
npm run dev
```

> 브라우저에서 [http://localhost:3000](http://localhost:3000) 에 접속하세요.

## 백엔드 연결 (추가 예정)

이 프로젝트는 `SD_UI_PoC` 백엔드를 사용합니다. `.env.local` 파일에서 API 기본 URL을 설정하세요:

```sh
NEXT_PUBLIC_API_BASE_URL=https://github.com/ALBAMONZ-LAB/SD_UI_PoC
```

## CSS in CSS vs. CSS in JS (미정)

### 1. CSS in CSS

- **SASS(전처리기)**: 기존 CSS 문법을 확장하여 변수, 중첩, 믹스인 지원
- **Tailwind CSS**: 유틸리티 기반 스타일링 방식
- 정적인 CSS로 렌더링되어 성능이 안정적임

#### 장단점

- 장점: 기존 CSS 방식 유지, 학습 부담 적음, 성능 안정적
- 단점: 전역 네임스페이스 충돌 가능, Tailwind는 클래스 네이밍 복잡할 수 있음

---

### 2. CSS in JS

- **Styled Components, Emotion, Vanilla Extract** 등으로 JavaScript에서 직접 스타일 정의
- 동적 스타일링과 컴포넌트 단위 스타일 적용 가능

#### 장단점

- 장점: 동적 테마 적용 가능, 전역 스타일 충돌 방지
- 단점: JS 번들 크기 증가 가능, SSR 시 성능 저하 우려

---

### 3. 성능 비교

| 방식       | 초기 로딩 속도  | 스타일 적용 방식     | 유지보수               |
| ---------- | --------------- | -------------------- | ---------------------- |
| CSS in CSS | 빠름            | 정적인 CSS 파일      | 익숙하고 쉬움          |
| CSS in JS  | 상대적으로 느림 | JS 실행 시 동적 적용 | 컴포넌트 단위 스타일링 |

#### 결론

- **CSS in CSS(SASS, Tailwind CSS)**: 정적인 스타일링에 적합
- **CSS in JS(Styled Components 등)**: 동적 스타일 변경이 많은 경우 유리
