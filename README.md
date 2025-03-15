# SD-UI Admin Front End

이 프로젝트는 **SD-UI**의 이벤트를 관리하는 관리자 대시보드입니다. [SD_UI_PoC](https://github.com/ALBAMONZ-LAB/SD_UI_PoC) 백엔드와 연결되며, 이벤트 페이지 생성, 조회 및 관리를 제공합니다.

## CI/CD 파이프라인 (Jenkins)

**Jenkins를 사용한 자동 배포 파이프라인**을 구축(테스트중),  
GitHub에 코드 푸시 시 EC2에서 자동으로 빌드 및 배포.

### 배포된 EC2 서버

🔗 **http://3.36.185.81/**

### 배포 프로세스

**브랜치 전략**

1. `main` → 안정적인 배포 브랜치
2. `develop` → 개발 브랜치 (테스트 및 QA)
3. `feature/*` → 기능 단위 개발 브랜치

**작업 순서**

1. `develop`에서 `feature/기능명` 브랜치 생성
2. 기능 개발 후 `develop` 브랜치로 병합 (PR 요청 후 코드 리뷰 진행)
3. 기능 테스트 완료 후 `main`으로 배포 진행

### **CI/CD**

1. **GitHub에 코드 푸시** → Jenkins Webhook 트리거
2. **Jenkins에서 최신 코드 Pull**
3. **Docker 이미지 빌드 (`sd-ui-admin-front-images:latest`)**
4. **기존 컨테이너 중지 후 새 컨테이너 실행 (`sd-ui-admin-front-container`)**
5. **EC2에서 자동 배포 완료**
6. **브라우저에서 http://3.36.185.81/ 접속하여 최신 버전 반영 확인**

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
 ┣ 📂 styles/                  # 스타일 파일 (Vanilla Extract)
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

## 백엔드 연결 (EC2 배포 완료)

이 프로젝트는 `SD_UI_PoC` 백엔드를 사용합니다. `.env.local` 파일에서 API 기본 URL을 설정하세요:

```sh
NEXT_PUBLIC_API_BASE_URL=api_base_url
```

## 스타일링 방식 (Vanilla Extract 적용)

### **Vanilla Extract 적용 이유**

- **정적 스타일 지원**: 빌드 타임에 스타일이 생성되어 성능 최적화
- **타입 안전성**: TypeScript와 완벽한 호환
- **모듈화**: CSS 클래스를 TypeScript 코드에서 안전하게 관리 가능
- **테마 지원**: 글로벌 테마 변수 설정 가능
- **CSS in CSS와 유사한 빌드 적용 방식**: 다른 CSS-in-JS 라이브러리는 런타임에서 스타일을 생성하는 반면, Vanilla Extract는 빌드 시점에 스타일을 생성하여 성능 이점이 있음

### **Vanilla Extract 사용 예시**

```tsx
import { style } from '@vanilla-extract/css';

export const button = style({
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
});
```

```tsx
import { button } from './styles.css';

export default function MyComponent() {
  return <button className={button}>Click Me</button>;
}
```
