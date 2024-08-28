# Docker CLI 방식

# 어떤 환경에서 도커 이미지를 만들지?
FROM node:14-slim

# 도커 컨테이너 내부의 작업 디렉토리 결정
WORKDIR /usr/src/app

# 외부 패키지 설치를 위해 package.json과 package-lock.json 복사
COPY package.json .
COPY package-lock.json .

# 패키지 설치
RUN npm install

# 나머지 모두 복사
COPY . .

# 도커 컨테이너에 접근할 수 있도록 포트 열기
EXPOSE 3000

# 앱 실행
CMD ["npm", "run", "dev"]



# 도커파일을 이용해 이미지 만들 때: 터미널에
# docker build . -t node_app
# 여기서 -t는 태그를 지정한다는 뜻. 지정하지 않으면 이름이 NONE으로 정된다.

# 빌드된 이미지 확인
# docker images

# 빌드된 이미지 실행
# docker run -p 3000:3000 node_app

# 실행중인 컨테이너 목록 확인
# docker ps -a

# 컨테이너 삭제
# docker rm -f CONTAINER_ID