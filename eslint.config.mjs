import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// 현재 파일(`eslint.config.mjs`)의 절대 경로를 얻음
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat 인스턴스를 생성하여 기존 ESLint 설정을 Next.js 15 스타일로 변환
const compat = new FlatCompat({
  baseDirectory: __dirname, // 현재 파일의 디렉토리를 기준으로 ESLint 설정을 로드
});

// ESLint 설정 배열 (기존의 `.eslintrc` 스타일을 변환하여 사용)
const eslintConfig = [
  // Next.js 추천 ESLint 설정을 확장
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 프로젝트 전반에 적용할 추가 규칙 설정
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // 적용할 파일 확장자 지정
    ignores: ['node_modules/', 'dist/'], // ESLint가 무시할 디렉토리

    rules: {
      // React 관련 경고 제거 (Next.js에서는 자동으로 React import 처리)
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      // TypeScript 관련 규칙 추가
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default eslintConfig;
