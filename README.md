### 목차
 1. [프로젝트 소개](#프로젝트-소개)
 2. [사용한 기술 스택](#사용한-기술-스택)
 3. [요구사항 및 구현목록](#요구사항-및-구현목록)
 4. [UI 화면](#UI-화면(핵심기능))
 5. 연동 API 문서 
 6. 개발자 정보
<hr />

### 프로젝트 소개
<hr />

### 사용한 기술 스택
#### IDE

  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>

#### Front-End Programming Languages

  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/SASS(SCSS)-CC6699?style=flat&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript(ES8)-F7DF1E?style=flat&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/BootStrap-7952B3?style=flat&logo=bootstrap&logoColor=white"/>
  
#### 소프트웨어
  
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
 
#### 형상관리
  
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>
 
#### 클라우드
  
  <img src="https://img.shields.io/badge/Amazon aws-232F3E?style=flat&logo=Amazon aws&logoColor=white"/>

#### State Management

  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/ReduxSaga-999999?style=flat&logo=Redux-Saga&logoColor=white"/>
  
#### 라이브러리
  * axios : 0.27.2
  * react-bootstrap : 2.5.0
  * Data-fns : 2.29.3
  * immer : 9.0.15
  * Immutable : 4.1.0
  * jwt-decode : 3.1.2
  * moment : 2.29.4
  * React-datepicker : 4.8.0
  * React-daum-postcode : 3.1.1
  * react-grid-dnd : 2.1.2
  * react-intersection-observer : 9.4.0
  * React-icons : 4.4.0
  * React-kakao-login : 2.1.1
  * React-kakao-maps-sdk : 1.1.3
  * React-login-by-naver : 0.1.8
  * react-router-dom : 6.3.0
  * react-redux : 8.0.2
  * redux :4.2.0
  * redux-saga : 1.2.1
  * @react-oauth/google : 0.2.8
<hr />

### 요구사항 및 구현목록
#### [사업자(호텔)]
<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 메인 : 보유한 호텔 정보 리스트   노출 구현완료(페이징 : Infinity Scroll)

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 호텔관리 :호텔관리(등록,수정,삭제), 객실관리(등록,수정,삭제) 기능 구현완료

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 호텔 등록 : 신규 호텔 등록하기
* 호텔 주소 검색 기능 구현완료 - 카카오(Daum) 주소 찾기 API 사용
* 성수기 Input 추가, 삭제 구현완료
* 제공되는 호텔 서비스 CheckBox 구현완료 (ex - 24시 데스크, 주차장)
* 호텔 이미지 등록, 수정, 개별삭제, 일괄삭제, 순서 바꾸기(react-grid-dnd 사용) 기능 구현완료

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 호텔 수정 : 조회된 호텔 정보 노출 후 호텔등록과 같은 기능 구현완료

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 호텔 삭제 : 삭제 사유 필수 작성 후 삭제완료 기능 구현완료

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 객실 관리 : 객실 등록, 수정, 삭제 기능 구현 및 객실 리스트 노출 구현완료(페이징 : Infinity Scroll)

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 객실 등록 : 해당 호텔에 객실 등록하기
* 객실명 중복확인 기능 구현 완료
* 객실 이미지 등록, 수정, 개별삭제, 일괄삭제, 순서 바꾸기(react-grid-dnd 사용) 기능 구현완료
* 호실 등록, 호실 별 이용불가 일자 선택 기능 구현완료
* 제공되는 객실 서비스 CheckBox 구현완료 (ex - 금연객실, 오션뷰)  

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 객실 수정 : 조회된 객실 정보 노출 후 객실등록과 같은 기능 구현완료

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 객실 삭제 : 객실 일괄삭제, 호실 개별삭제 기능 구현 완료
* 예약된 내역이 있을 시 마지막 예약일 이후 객실 삭제

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png"/> 예약 관리 : 예약리스트 노출 기능 구현중
* 1Depth : Tab 메뉴(전체, 예약확정, 예약취소, 이용완료)
* 2Depth : SelectBox(보유한 호텔명)
* 3Depth : SelectBox(고객명, 예약번호, 핸드폰번호, 예약일자) + Text Input

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png"/> 예약 취소 : 예약내역 정보 노출 , 취소사유 필수 작성 후 예약취소 기능 구현중

#### [사업자(호텔)]
<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png"/> 소셜로그인 기능 구현 중(카카오, 네이버, 구글)

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 메인페이지 : 검색 바 및 지역별 호텔 수 정보 노출 기능 구현완료
* 검색바(호텔명 or 지역명 자동완성, 체크인/체크아웃 날짜, 객실 수, 인원 수)

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 검색 상세 페이지 : 검색 바, 사이드필터 바의 조건에 맞는 호텔 정보 노출 기능 구현완료
* 사이드 필터 (지도로 검색, 호텔등급, 부가시설, 객실 시설, 가격)
* 지도로 검색 시 - KakaoMap 마커 노출, 마커 클릭 시 호텔 정보 인포윈도우 노출, 객실 선택 시 호텔 상세 페이지 이동


<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 호텔 상세 페이지 : 호텔 정보와 예약 객실 정보 리스트 노출 기능 구현완료
* 호텔 이미지와 객실 이미지 선택 시 확대된 이미지 슬라이드로 구현완료
* 예약하기 누를 시 미로그인일 경우 로그인 유도 모달 구현완료(비회원예약도 가능해야한다)

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png" /> 예약페이지 : 선택된 객실 정보와 호텔정보 노출 기능 구현중
* 로그인 고객일 경우 회원정보로 예약자명과 휴대폰번호 자동입력 기능 구현완료(수정이 가능해야 한다.)
* 비회원 고객일 경우 핸드폰번호로 예약정보 발송 기능 구현중

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png" /> 예약내역페이지 : 로그인 고객일 경우 예약내역 리스트 노출, 비회원일 경우 단일 예약내역 노출 기능 구현 중
* Tab(전체, 예약확정, 예약취소, 이용완료) + 예약일자(defalut:오늘 날짜 기준으로 한달 전) 선택 시 조건에 맞는 예약 정보 노출 
* 비회원일 경우 예약자명, 핸드폰 번호, 예약번호로 조회

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png"/> 예약 취소 : 예약내역 정보 노출 , 취소사유 필수 작성 후 예약취소 기능 구현중


#### [공통]
<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png"/> 로그인 페이지 : 로그인&자동 로그인 기능 구현 중
* 리프레쉬,액세스 토큰을 활용하여 사용자 인증을 진행

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png"/> 회원가입 페이지 : 회원가입 기능 구현 중
* 휴대폰인증(문자메세지) 기능 구현완료
* 사업자일 경우 사업자 진위여부 확인 기능 구현완료

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 회원정보 수정 : 조회된 회원 정보 노출 후 회원가입과 같은 기능 구현완료 

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 아이디 찾기 : 이름, 휴대폰 인증을 통해 조회된 email 마스킹 처리하여 노출 기능 구현 완료

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480731-ecbb80d8-2af7-4c9d-82af-995aa5e71086.png" /> 비밀번호 찾기 : email, 이름, 휴대폰 인증 성공 시 해당 email로 비밀번호 재설정 URL+인증코드 발송 기능 구현 중

<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 비밀번호 변경 : 기존 비밀번호가 일치할 시 변경비밀번호로 변경 기능 구현 완료
<img width="15px" src="https://user-images.githubusercontent.com/48265181/197480734-de78051d-c41e-467f-9505-55913c160ff9.png" /> 회원탈퇴 : 회원탈퇴 사유 선택 후 탈퇴 기능 구현완료

<hr />

### UI 화면(핵심기능)
1. 고객 & 사업자 회원가입
 <img width="50%" src="https://user-images.githubusercontent.com/48265181/197475530-5738675d-ea98-48ed-8fea-ee0cfc002c0b.gif" />
 
2. 고객 로그인 & 사업자 로그인
 <img width="50%" src="https://user-images.githubusercontent.com/48265181/197472389-1e3bbbef-cbe0-4c12-98ec-62caa37ba808.gif" />
 
3. 로그인 고객 & 비로그인 고객 & 사업자 메인페이지

|로그인 고객|비회원 고객|사업자|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/48265181/197466752-b1512c48-f3e7-4546-b305-f2ca0385562b.png" />|<img src="https://user-images.githubusercontent.com/48265181/197473633-ea3e7ebf-8382-4ce7-a911-bcea7f797e01.png" />|<img src="https://user-images.githubusercontent.com/48265181/197473882-66df162b-9b76-4e5d-a30f-60b0631bfee7.png" />

4. 예약가능한 호텔 리스트

|테이블로 보기|지도로 보기|마커(인포윈도우)|
|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/48265181/197476805-0c9f1f71-19b8-4e4f-9eb2-fdd98a593200.png" />|<img src="https://user-images.githubusercontent.com/48265181/197476811-9dff4182-9ba6-413e-9f65-403d31f2593c.png" />|<img src="https://user-images.githubusercontent.com/48265181/197476820-0d84031b-7340-4a25-8830-a1214228f77d.png" />

5. 선택한 호텔 상세페이지
<img width="50%" src="https://user-images.githubusercontent.com/48265181/197479105-3ccddf58-4219-45a8-bf53-4854b017410e.gif" />

6. 호텔 예약페이지
<img width="50%" src="https://user-images.githubusercontent.com/48265181/197478033-732a865b-93ba-481b-a4f1-68fb297c5bd2.gif" />

7. 사업자(호텔) 객실 등록하기 - 이미지 등록&변경&일괄삭제&개별삭제&순서바꾸기
<img width="50%" src="https://user-images.githubusercontent.com/48265181/197477991-767d4d68-bc5c-4810-8b33-31bd54714a34.gif" />
