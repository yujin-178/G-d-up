# 공통 프로젝트 G'd up

<br/>

# 목차

[프로젝트 소개](#G'd-up)

[기능](#기능)

[사용 방법](#사용-방법)

[기술 스택](#기술-스택)

[배포](#배포)

[프로젝트 일정](#프로젝트-일정)

[팀원](#팀원과-역할-분담)

[후기](#배운-점,-느낀-점)


</br>

# G'd up
G'd up은 사용자가 옷을 쉽게 관리하고 코디 스타일링을 해볼 수 있는 웹 사이트 입니다.

👉 http://i6b108.p.ssafy.io/


</br>
</br>

# 기능

1. 옷을 등록할 때 AI가 카테고리, 색깔, 소재 등을 분석해서 자동으로 태그를 달아줍니다. 추가적으로 사용자가 계절감과 세탁 태그를 입력할 수 있습니다.

<br/>

2. 등록한 옷으로 코디 프리셋을 생성할 수 있습니다.

<br/>

3. 팔로우 한 유저의 옷장와 코디 갤러리에 놀러갈 수 있습니다. 비공개 설정한 코디를 제외하고 자유롭게 열람이 가능합니다.

</br>
</br>

# 사용 방법

### 1. 드레스룸
- 로그인 후에 ```Go to get dressed up!``` 버튼을 눌러주세요.
- 왼쪽 하단의 사람 모양 아이콘을 누르면 추천 친구 목록과 팔로우/팔로잉하고 있는 유저 목록을 볼 수 있습니다.
- 팔로우하고 있는 유저 이름을 누르면 해당 유저의 드레스 룸으로 이동합니다.
- 오른쪽에 있는 ```옷장 가기``` 버튼을 누르면 옷을 등록하고 관리할 수 있는 옷장 페이지가 나옵니다.
- 왼쪽에 있는 ```코디 목록으로``` 버튼을 누르면 코디를 생성하고 관리할 수 있는 코디 페이지가 나옵니다.

<br />

### 2. 옷장
- 옷 목록 하단의 ```+``` 버튼을 누르면 옷을 생성할 수 있는 모달 창이 나타납니다.
- 사진을 업로드하면 AI가 옷의 종류, 색깔, 소재 등의 특성을 파악해서 자동으로 태그를 생성해줍니다. 추가적으로 사용자가 계절감과 세탁 태그를 입력할 수 있습니다.
- 추가한 옷들은 옷장 리스트에 나타납니다. 상단의 navbar와 sidebar를 통해 원하는 옷을 필터링해서 찾을 수 있습니다.

<br/>

### 3. 코디
- 코디 첫 화면에는 등록된 코디들이 최신순으로 캐러셀 형식으로 보여집니다.
- 하단의 Gallery 버튼을 누르면 코디들을 카드 형식으로 볼 수 있습니다. 태그 입력 창에서 태그를 검색해 원하는 코디를 찾을 수 있습니다.
- 오른쪽 상단의 create 버튼을 누르면 코디를 생성할 수 있는 폼이 나타납니다. 내가 등록한 옷을 클릭해서 canvas에 추가한 다음 자유롭게 배치하고 사이즈를 조정할 수 있습니다. 아이템을 더블 클릭하면 해당 옷이 canvas 내에서 삭제됩니다.

</br>
</br>

# 기술 스택
### Frontend
- ES2015+
- React
- Redux-toolkit
- Emotion/react
- Jest
- Enzyme

<br/>

### Backend
- Spring Boot
- maria DB
- JPA
- AWS
- NGINX

</br>
</br>

# 배포

</br>
</br>

# 프로젝트 일정
### 전체 기간 2022. 01. 10 ~ 2022. 02. 18

<br/>

#### `1주차 - 기획(2022. 01. 10 ~ 2022. 01. 14)`

- 기획 및 사전 학습

#### `2주차 - 아이디어 확정 및 1차 발표 준비(2022. 01. 17 ~ 2022. 01. 21)`

- 아이디어 확정 + 기술(AI) 검토

#### `3주차 - 와이어프레임과 DB 설계, API 문서 작성(2022. 01. 24 ~ 2022. 01. 28)`

- [Figma를 통한 Mockup 작업](https://www.figma.com/file/YmNhJgGO7TcAfJ4fpw4sLz/SSAFY-%EA%B3%B5%ED%86%B5-PJT?node-id=160%3A13057)
- [ERD 활용한 DB설계](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4a8d45d1-a7d5-44be-86a0-6f4936c54884/22%EB%85%8402%EC%9B%9408%EC%9D%BC_ERD.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220217T093404Z&X-Amz-Expires=86400&X-Amz-Signature=510a9531fb8b712d71cea33ad06e8d55667032cab110862c9a45bf1d57c5d85d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2222%25EB%2585%258402%25EC%259B%259408%25EC%259D%25BC%2520ERD.png%22&x-id=GetObject)

#### `4 ~ 5주차 - 개발, 배포, 발표 준비(2022. 02. 03 ~ 2022. 02. 18)`

<br/>
<br/>

# 팀원

김유진 (팀장, 백엔드)
determination9212@gmail.com

김태호(프론트엔드)
thkim2017@gmail.com

오서하(백엔드)
seoha8952@gmail.com

윤지영(프론트엔드)
wldud2287@gmail.com

이지순(백엔드)
jisoon806@gmail.com

한우리(프론트엔드)
wrh95222@gmail.com

<br/>
<br/>

# 후기
