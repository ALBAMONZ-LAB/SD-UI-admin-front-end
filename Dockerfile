# Node.js 18 기반의 경량 Alpine Linux 이미지 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Next.js 실행 포트
EXPOSE 3000

# ec2 성능 이슈로 pnpm 불가(비동기라)
CMD ["npm", "run", "start"]