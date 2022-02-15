# Git Convention

------



## branch 작명

```
${작성자}_${추가 분기(필요한 경우)}
```



------



## Commit 규칙

*  1개 commit에는 1가지 기능





## Commit 구조

```
keyword : subject 

body (상세 설명이 필요한 경우 작성)
```

![image-20220215091421590](.\docs_image\Git Convention\image-20220215091421590.png)

### keyword - 필수

-  `feat` : 새로운 기능 추가
-  `fix` : 버그 수정, 기능 변경
-  `docs` : 문서 수정
-  `style` : 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우
-  `refactor` : 코드 리팩토링
-  `test` : 테스트 코드, 리팽토링 테스트 코드 추가
-  `chore` : 빌드 업무 수정, 패키지 매니저 수정

### subject - 필수

*  3글자 이상 64글자 이하
*  한 줄 작성
*  개조식으로 작성
*  끝에 `.` 금지

### body - 선택

*  작업에 설명이 필요한 경우
*  양에 구애 받지 않고 최대한 상세히 작성
*  subject와 body는 한 줄 띄워 분리
*  `어떻게` 보다 `무엇`, `왜`에 맞춰서 작성



------



## Merge

*  Merge Request 생성 후 각 팀의 나머지 인원이 코드 리뷰를 수행
*  코드를 확인한 사람은 Approve 클릭
*  마지막에 리뷰한 사람은 Approve & Merge 클릭

![image-20220215092043150](.\docs_image\Git Convention\image-20220215092043150.png)