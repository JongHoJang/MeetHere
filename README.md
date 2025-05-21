# 🕊️ 여기서 만나

---

<div style="display: flex; justify-content: center;">
<img src="https://github.com/user-attachments/assets/6b31237a-346c-49dd-b830-8ef6b0f83ca8" alt="여기서 만나 커버 이미지" width="50%" />
</div>

> 내가 원하는 소그룹실(미팅룸)에 투표를 하고, 발표일에 당첨자를 발표하는 서비스

‘여기서 만나’는 소그룹실 예약을 보다 효율적이고 공정하게 운영하기 위해 개발된 서비스입니다. <br/>

기존의 **수기 신청 방식에서 발생하던 중복 예약 및 덮어쓰기 문제를 해결**하고자, <br/>
사용자 인증 기반의 자동화된 **추첨 서비스**를 기획하고 개발하게 되었습니다.

특히 이 프로젝트는, 실제로 교회 내 소그룹실 신청 과정에서 반복적으로 불편함을 겪던 저와 <br/>
**같은 문제의식**을 가지고 있던 서버 개발자 친구와 함께 논의 끝에 직접 만들기로 결심한 서비스입니다.

현재는 **매주 약 100명 내외의 사용자들이 실제로 서비스를 이용**하고 있습니다.


---

## 📆 작업 기간

- 2025.02. ~ 2025.05 (약 13주 작업)
- 현재 **운영 중**이며, 기능 개선 및 서비스 고도화를 **지속적으로 진행 중입니다.**

## 🔗 배포 링크

[👉 여기서 만나 바로가기](https://meet-here-mc.vercel.app)

---

## 👥 팀 소개

| 이름  | 역할    | Github                                  | Blog                                       |
|-----|-------|-----------------------------------------|--------------------------------------------|
| 장종호 | 프론트엔드 | [Github](https://github.com/JongHoJang) | [tistory](https://jangjh9414.tistory.com/) |
| 김형근 | 백엔드(서버) | -                                       | -                                          |


---

## 🔍 역할 분담

### 장종호 (FE)
- **프론트엔드 전반 개발 담당**
- UX/UI 설계 및 컴포넌트 구조 설계
- 페이지 라우팅, 소그룹실 신청 로직, 발표 결과 페이지 등 전체 화면 및 로직 구성
- JWT 인증 흐름 (SSR + CSR) 및 쿠키 기반 상태 관리 구현
- 백엔드 API 연동
- Vercel 배포 및 환경별 설정 관리 (운영, 개발)


### 김형근 (BE)
- **백엔드 전반 개발 담당**
- 사용자 인증 API, 예약 신청/발표 API 개발
- DB 설계(MySQL), JPA 기반 CRUD 개발
- AWS Lightsail 배포 및 서버 운영 관리
- 프론트엔드 협업을 위한 API 설계 및 문서화

---

## 🛠 프론트엔드 기술 스택

### ⚙️ 프레임워크 & 라이브러리
- **Next.js**
- **TypeScript**

### 📦 상태 관리
- **Zustand**
- **TanStack Query**

### 🎨 스타일링
- **Tailwind CSS**

### 🚀 배포
- **Vercel**


## 🛜 백엔드 기술 스택

### ⚙️ 언어 & 프레임워크
- **Java**
- **Spring Boot**

### 🗄 데이터베이스 & ORM
- **MySQL**
- **JPA**

### 🚀 배포
- **AWS Lightsail**

---

## 🗂 주요 페이지 (기능)

<details>
<summary><strong>로그인 / 회원가입</strong></summary>

<table style="display: flex; justify-content: center;">
  <tr>
    <td>
      <span>로그인 화면</span>
      <img src="https://github.com/user-attachments/assets/276fcb38-2dcf-45b8-b72e-a4ff8fa198ee" alt="로그인 화면" width="100%" />
    </td>
    <td>
      <span>회원가입 화면</span>
      <img src="https://github.com/user-attachments/assets/5cc24e82-204c-4e2a-bf1b-7352f9066b87" alt="회원가입 화면" width="100%" />
    </td>
  </tr>
</table>

- DB에 사전 등록된 사용자만 회원가입 가능 (예: 리더 대상 사전 등록제)
- JWT + HttpOnly 쿠키 기반 인증 (accessToken, refreshToken 사용)
- SSR, CSR 모든 환경에서도 인증 상태를 유지

</details>

<details>
<summary><strong>메인 페이지</strong></summary>
<table style="display: flex; justify-content: center;">
  <tr>
    <td>
      <span>메인화면</span>
      <img src="https://github.com/user-attachments/assets/d3a37034-3e47-454a-9967-e4b3097f3c78" alt="메인 미신청 화면" width="100%" />
    </td>
    <td>
      <span>메인화면 - 당첨</span>
      <img src="https://github.com/user-attachments/assets/7d79b908-3ca9-4213-9249-e3c1edd9d093" alt="메인 당첨 화면" width="100%" />
    </td>
  </tr>
</table>

- 본인의 예약 현황 및 당첨 여부 확인
- 마감 시간/발표 시간 안내
- 시간, 추첨 여부, 당첨 여부와 같이 여러 상황에 따른 문구, 버튼 등 분기처리

</details>

<details>
<summary><strong>신청 페이지</strong></summary>
<table style="display: flex; justify-content: center;">
  <tr>
    <!-- 첫 번째 이미지 (왼쪽) -->
    <td>
      <span>신청 화면</span>
      <img src="https://github.com/user-attachments/assets/c7c4c93b-5d6d-418e-a1e9-d6d731588a60" alt="신청 화면" width="100%" />
    </td>
    <!-- 두 번째와 세 번째 이미지를 세로로 배치 -->
    <td>
<span>신청 모달</span>
      <img src="https://github.com/user-attachments/assets/1333d013-a446-43e6-b0db-b019df2249c1" alt="신청 모달 화면" width="100%" /><br/>
<span>신청 실패 모달</span>      
<img src="https://github.com/user-attachments/assets/37cf0fe9-0a77-4156-81a7-197d1c23410f" alt="신청 실패 모달 화면" width="100%" />
    </td>
  </tr>
</table>

- 마감시간 전까지만 신청 버튼 활성화
- 중복 신청 방지 및 에러 처리

</details>

<details>
<summary><strong>발표 페이지</strong></summary>
<table style="display: flex; justify-content: center;">
  <tr>
    <td>
      <span>당첨자 확인 화면</span>
      <img src="https://github.com/user-attachments/assets/adb1b256-e820-4339-9509-6aded8e8ecc8" alt="로그인 화면" width="100%" />
    </td>

  </tr>
</table>

- 마감 이후 발표 결과 자동 공개
- 본인이 당첨된 경우 하이라이트 표시 제공

</details>





## 💥 트러블슈팅

- [👉 refresh-token API 요청 시, 401문제 해결 및 리팩토링](https://walnut-hose-a93.notion.site/refresh-token-API-401-1d7ebd82d49180ed9357ed077a639780)
- [👉 Next.js에서 발생한 Hydration 오류 + 헤더 중복 렌더링 이슈 해결](https://walnut-hose-a93.notion.site/Next-js-Hydration-1ddebd82d49180cf8003eac39194126c)
- [👉 Next.js에서 발생한 페이지 이동 시 지연 이슈 해결](https://walnut-hose-a93.notion.site/Next-js-UX-1d9ebd82d49180f2b91efecf42bb4071?pvs=4)
- [👉 useQuer y로 리팩토링한 이유와 장점](https://walnut-hose-a93.notion.site/useQuery-1dfebd82d4918085b07bc7a0c1b4744d?pvs=4)

---

