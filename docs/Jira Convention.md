# Jira Convention

------



## Scrum board

*  애자일 소프트웨어 개발 팀에서 주로 사용합니다. 스크럼 보드는 팀이 고정된 기간(종종 2주 "스프린트") 동안 완료하려고 시도할 문제 그룹을 가져옵니다. 스프린트가 완료되면 프로젝트의 다음 문제 배치를 위해 새 스크럼 보드가 생성됩니다.



------



## Create Issue Rule

*  월요일 오전에 고정된 기간내에 해야할 업무를 정리![image-20220215111422633](.\docs_image\Jira Convention\image-20220215111422633.png)

*  정리한 업무를 참고하여 이슈 종류별로 규칙에 맞춰 Issue를 생성한 이후, story point(Estimate) 설정   

   ```html
   1. sub-task 의 estimate는 어딘가에 반영되지 않으므로 
      각 Story의 Story 포인트에서 알아서 분배  
   
   ex>  [회원관리] 회원가입 의 Story point가 5 라면, 
   		     sub-task인 일반 회원가입 엔 2, 구글 Oauth 가입엔 3 할당하는 식   
   
   2. 포인트 1 당 1시간 의미  
   
   3. Story point  
   	1주일(각 스프린트 당) 마다 1인당 최소 40 point 
   
      3-1. 결정 방법 
   		i) 각 스토리 담당자가 내부 사용자 스토리를 사용자 관점에서 기술
   		ii) 개발팀 전체가 모여 각 사용자 스토리에 대한 발표를 듣고 개발 기간 투표 
       iii) 가장 짧은 기간과 긴 기간을 투표한 사람의 의견을 듣고 다시 투표  
       iv) 전체 팀원이 납득할 때 까지 계속 진행
   
   본인의 판단에 따른 업무의 중요도 순서 & 예상 소요 시간 등을 기준으로 개발 기간 선정
   		
   ```

*  Story 는 팀별로 회의 + Sub-task 는 담당자가 본인 판단에 따라 Story point 분배   

   ```html
   각 담당 기능을 Story 로 작성
   
   1. sub-task는 각자 알아서 작성
      => 어차피 Jira 에선 펼치지 않는 이상 Story 별로 구분됨
   
   2. Sub-task 에서의 담당자가 각자 다르다면, Story를 여러 개 만들어서 각자 작성
      => Only My Issues로 내 담당 기능은 필터 가능
   ```

### Issue 작성예시

```json
Epic		[업무 종류] 업무 이름 ex) [기획] 기능 명세서

Story		[업무 이름] 상세 업무 ex) [기능 명세서] 옷 관리

sub-task	상세 업무 구현을 위한 세부 업무 
		ex) 옷 저장, 옷 태그 관리, 세탁 태그 분석
```

#### Issue 공통

-  Priority ⇒ 사용자 가치 기반 + 업무 상 중요도 비중 (얼마나 급한지 등의 시간 중요도 순서)

   -  Highest  (`Right Now`)  : 당장 하지 않으면 프로젝트가 진행되지 않을 정도로 급함
   -  High ( `ASAP`) : 원활한 프로젝트 진행을 위해선 최대한 빨리 진행해야 하는 작업
   -  Medium ( `nomal`) : 보통의 작업
   -  Low ( `optional`) : 있으면 좋은 부가적인 기능
   -  Lowest : 있어도 되고 없어도 되는 작업. 시간 여유가 있다면 하면 좋을지도..?
-  Reporter : 해당 issue 작성자
-  Assignee : 해당 issue 담당자 (실제 업무 처리자)
   -  default = Automatic
   -  Assign to me ⇒ 본인으로 변경

#### Epic

-  EPIC name : [업무 종류] 업무 이름

   `ex>`  `[기획] 기능 명세서` , `[UCC] 영상 제작`, `[FE] 옷장`

   업무 종류 : 기획/FE/BE/배포/UCC/

-  EPIC name == Summary  동일하게 작성

-  Description  : 할 일의 상세 내용 작성

-  Issue : 하위 이슈들이 있다면 추가

   -  Story, Task 등 하위 이슈들을 Epic 없이 추가했었다면, 해당 Epic 에서 하위 이슈 추가 가능 ⇒여러 story들을 하나의 epic으로 묶는 대분류로 사용가능
   
-  Sprint : 현재 진행중인 Sprint 선택

#### 📌Story == Task (팀별 담당 기능 분류)

-  Summary : [업무 이름] 상세 업무 

   `ex> [기능 명세서] 옷 관리 / [회원관리] 회원가입`

-  Description  : 할 일의 상세 내용 작성

-  Epic Link : 해당하는 상위 Epic 선택

   `ex> Story : [기능 명세서] 옷 관리 / Epic : [기획] 기능 명세서`

-  Sprint : 현재 진행 중인 Sprint 선택

#### 📌 Sub-task

-  Summary : 세부 업무 (to-do List)
   -  `sub-task = [기능 명세서] 옷관리` ⇒ `옷 저장`, `옷 태그 관리`, `세탁 태그 분석` 등등 ...
-  Description  : 기능별 요구사항 및 기타 알아야할 내용 작성

### 그루밍

-  스프린트에 들어가기 전, 개발할 기능에 대해 대략적으로 리뷰를 하는 행위
-  스프린트에 대한 가시성 확보 가능
-  사용자 스토리 / UX 프로토타입 리뷰

=> Epic 과 Story 까지는 팀(백, 프론트) 별로 짜되,

각 Story의 담당자가 정해지면 그 내부 사용자 스토리는 담당자가 알아서 사용자 관점에서 기술

```
(직관적으로 이해가 되어야 하며 테스트가 가능해야함)

(분류, 스토리, 설명 형태로 기술하는 것이 좋음)  >> ppt 32페이지
```

### 플래닝 포커

-  개발팀 전체가 모여 각 사용자 스토리에 대해 개발 기간 투표

   => 그 이후 본인이 생각한 사용자 스토리를 설명하면서 개발 기간(Story point) 에 대해 투표

   => 전체 팀원이 ok 할 때까지 계속 진행

   => 점수가 가장 높은 사람과 낮은 사람의 의견을 듣고 다시 투표
   
   

------



## Sprint

-  스크럼 팀이 일련의 문제를 완료하기 위해 작업하는 짧고 고정된 기간

-  주로 1-2주일 정도의 시간을 의미하며, 하나의 스크럼 보드 완료 기간

-  Backlog 에서 현재 진행중인 sprint 정보 확인 가능

   -  sprint가 시작되면, 스프린트 창 옆에 `EPICS` 에서 `+버튼` 으로 바로 `EPIC을 추가`하거나, 특정 EPIC을 선택하여 `Create issue in epic` 버튼으로 `하위 이슈(Story, Task)를 바로 생성` 가능

-  Active Sprint 에서 현재 진행 상황 업데이트 가능 (workflow)

   -  각 sprint 별로 접었다 펼치기가 가능하므로, 종료된 sprint는 접어두는 것을 추천

      → 상단의 `QUICK FILTERS` 에서 `Only My Issues` 로 나의 이슈들만 필터링 체크 및 해제 가능

   -  sprint 가 종료되었는데 아직 해결 못한 issue가 있다면, sprint를 닫을 때 다음 sprint로 이월할 것인지 선택 가능

   -  `TO DO는 앞으로 할 일`,  `IN PROGRESS는 현재 진행중` , `DONE는 완료된 업무`

