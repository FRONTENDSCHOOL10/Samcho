<div align="center">
<h2><img src="https://velog.velcdn.com/images/zidoopal/post/aee398fb-c463-4b1c-8347-9767d0e39ba7/image.png" alt="하루몽 로고"> <img src="https://velog.velcdn.com/images/zidoopal/post/f46dac17-2b58-4bae-a81a-5bcf92b08911/image.png" alt="하루몽 캐릭터"></h2>
<p>멋쟁이 사자처럼 프론트엔드 스쿨 10기&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;3조 <strong>삼초고려</strong></p>
</div>

<br>

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [프로젝트 기능 소개](#프로젝트-기능-소개)
- [개발 환경 및 기술 스택](#개발-환경-및-기술-스택)
- [팀원 소개](#팀원-소개)

<br>

### 프로젝트 소개

<table align="center" style="width: 70%">
<tr><th style="text-align: center">하루몽 소개</th></tr>
<tr><td>

- 프로젝트 이름 : **하루몽**
- 개발 기간: 2024.08.26 ~ 2024.09.25
- 배포 주소: https://harumong.netlify.app (가입 후 이용 가능)

</td></tr>
<tr><th style="text-align: center">프로젝트 주제</th></tr>
<tr><td>

- 감정 기반 일기 웹 애플리케이션

</td></tr>
<tr><th style="text-align: center">프로젝트 목표</th></tr>
<tr><td>

- 요즘 SNS에서는 많은 사람들이 좋은 모습만을 보여주기 위해 나의 감정을 숨기거나 속이고, 과시하는 경우를 어렵지 않게 볼 수 있습니다. 하루몽에서 쓰는 일기 안에서만큼은 소박하지만 꾸밈없고, 진솔한 나의 마음과 감정을 기록하고 돌아볼 수 있는 공간을 제공하고자 합니다.

</td></tr>

<tr><th style="text-align: center">프로젝트 기대 효과</th></tr>
<tr><td>

- **감정 기반 일기 애플리케이션의 기대효과**
  - 일기 작성을 통해 자신의 감정을 기록하고, 시각화된 데이터를 통해 감정 패턴을 파악할 수 있음
  - 매일 감정과 생각을 기록함으로써 자기 성찰과 발전을 돕는 중요한 도구가 될 수 있음
  - 유저가 원할 경우 선택적으로 감정을 공유하는 '교환일기' 기능을 통해 진정성 있는 관계 형성이 가능함
- **프로젝트를 통한 개발 역량 강화**
  - 컴포넌트 구조 설계, 상태 관리, 데이터 흐름 제어 등 리액트의 핵심 개념을 실제 프로젝트에 적용해보며 역량 강화
  - 프로젝트 과정에서 발생하는 다양한 기술적 문제들을 해결하며 문제 해결 능력을 배양하고 기술을 습득할 수 있음
  </td></tr>
  </table>

<br>

### 프로젝트 기능 소개

<table align="center" style="width: 100%">
<tr><th style="text-align:center">주요 기능</th></tr>
<tr><td>

- 📝 일기 작성
- 📊 일기 통계
- 👩🏾‍🤝‍🧑🏼 단짝 기능
- 🤝 일기 교환
- 📬 우편함
- 🔎 일기 검색
</td></tr>

<tr><th style="text-align:center">기능 상세 설명</th></tr>
<tr><th style="text-align:center">회원가입 및 로그인</th></tr>
<tr><td>

- 회원가입

  - 아이디는 영문 숫자를 포함하여 최소 4자리 이상 입력 가능
  - 닉네임은 특수문자를 제외하고 최소 2자리 이상 입력 가능
  - 아이디 / 이메일 / 닉네임 중복 확인 기능 구현
  - 비밀번호는 영문, 숫자, 특수문자를 포함하여 최소 8자리 이상 입력 가능
  - 비밀번호 확인 기능 및 비밀번호 감추기 기능 구현
  - 회원가입 완료 시 입력한 이메일로 인증 메일 전송

- 로그인
  - 인증 메일 인증 완료 후 로그인 가능

</td></tr>
<tr><th style="text-align:center">일기 작성</th></tr>
<tr><td>

- 하루에 최대 1번 일기 작성 가능
- 오늘 하루의 기분(행복, 기쁨, 보통, 나쁨, 슬픔 중 선택)
- 감정 선택 (긍정적 감정 10가지, 부정적 감정 10가지 중 최소 1개, 최대 5개)
- 날씨 선택 (최소 1개, 최대 2개 선택)
- 한줄일기 작성 (최대 200자, 공백 제외)
- 사진 1장 첨부 가능(선택 사항)
- 일기 작성 후 해당 날짜에 기분 이모티콘이 캘린더에 표시됨
</td></tr>
<tr><th style="text-align:center">일기 상세</th></tr>
<tr><td>

- 작성한 일기의 상세 내용 확인 가능
- 일기 수정 및 삭제 가능
- '단짝'과 일기 교환 기능 제공
</td></tr>
<tr><th style="text-align:center">단짝 기능</th></tr>
<tr><td>

- 아이디 또는 닉네임 검색을 통한 유저 검색 후 단짝 신청 가능
- 단짝 신청 수락 및 거절 가능
- 단짝 관계가 맺어지면 일기 교환 가능
- 단짝과의 관계를 관리할 수 있으며, 단짝 해제(절교) 기능 제공
</td></tr>
<tr><th style="text-align:center">일기 교환</th></tr>
<tr><td>

- 단짝과 1:1 일기 교환 가능
- 교환된 일기는 우편함에서 확인 가능
- 교환된 일기는 24시간 뒤 자동으로 삭제
- 교환된 일기가 몇 시간이 경과했는지 우편함에서 확인 가능
</td></tr>
<tr><th style="text-align:center">기분 필터링 및 검색</th></tr>
<tr><td>

- 일기 작성 시 선택한 기분에 따라 필터링 가능
- 선택한 기분의 일기만 캘린더에 표시
- 일기 기록이 없는 날은 다른 색으로 표시되어 일기가 기록되지 않았음을 시각적으로 알림
- 한줄일기의 내용을 기반으로 일기 검색 가능
- 검색 기록은 로컬스토리지에 저장되며, 유저별로 관리 가능
</td></tr>
<tr><th style="text-align:center">월별 분석 보고서</th></tr>
<tr><td>

- 월별 감정 패턴 분석 제공
- 선택한 기분의 분포도와 감정 랭킹 제공
- 감정 차트와 분포도를 통해 자신의 감정 상태를 분석하고 성찰할 수 있음
</td></tr>
<tr><th style="text-align:center">캘린더</th></tr>
<tr><td>

- 작성된 일기를 날짜별로 확인 가능
- 캘린더에서 날짜를 선택하여 바로 일기 작성 가능
- 한 달간의 일기를 한눈에 볼 수 있는 캘린더 뷰 제공
- 한 달간의 일기를 피드 형식으로 확인할 수 있는 리스트 뷰 제공
</td></tr>
<tr><th style="text-align:center">마이페이지</th></tr>
<tr><td>

- 닉네임 변경 및 회원 탈퇴 기능 제공
- 기록한 일기와 사진 갯수 확인 가능
- 기록한 사진 모아보기 기능 제공
- 단짝 관리 기능: 단짝 관계의 유지 기간 확인 및 단짝 해제 가능
</td></tr>

</th></tr>
</table>

<br>

### 개발 환경 및 기술 스택

<table align="center"  style="width: 70%">
<tr><th>카테고리</th><th style="width: 400px">사용 기술</th></tr>

<tr><td><strong>🌞 프론트엔드</strong></td>
<td>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>  
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Zustand-181717?style=for-the-badge&logo=&logoColor=white" alt="Zustand"/>
</td></tr>

<tr><td><strong>🌚 백엔드</strong></td>
<td>
  <img src="https://img.shields.io/badge/PocketBase-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=white" alt="PocketBase"/>
</td></tr>

<tr><td><strong>📚 버전 컨트롤</strong></td>
<td>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</td></tr>

<tr><td><strong>🧱 빌드 도구</strong></td>
<td>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</td></tr>
<tr><td><strong>🎨 디자인 & 개발 환경(IDE)</strong></td>
<td>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma"/>
  <img src="https://img.shields.io/badge/Visual Studio Code-5C2D91?style=for-the-badge&logoColor=white" alt="Visual Studio Code"/>
</td></tr>

<tr><td><strong>🌍 호스팅</strong></td>
<td>
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify"/>
</td></tr>

</table>

<br>

### 팀원 소개

<table align="center">
<tr>
<td>
  <a href="https://github.com/devHyeon99">
    <img src="https://velog.velcdn.com/images/zidoopal/post/d7e8a34f-eac8-4050-a598-c0f21024e012/image.webp" alt="엄현호 프로필"  style="width: 200px; height: 200px; object-fit: cover"/>
  </a>
</td>

<td>
  <a href="https://github.com/paintover">
    <img src="https://avatars.githubusercontent.com/u/109131616?v=4" alt="이서연 프로필"  style="width: 200px; height: 200px; object-fit: cover"/>
  </a>
</td>

<td align="center">
  <a href="https://github.com/gmlyb1">
    <img src="https://avatars.githubusercontent.com/u/77711043?v=4" alt="이영빈 프로필"  style="width: 200px; height: 200px; object-fit: cover"/>
  </a>
</td>

<td align="center">
  <a href="https://github.com/heydoopal">
    <img src="https://avatars.githubusercontent.com/u/167097136?v=4" alt="지유진 프로필"  style="width: 200px; height: 200px; object-fit: cover"/>
  </a>
</td>
</tr>

<tr align="center">
<td>
  <img src="https://img.shields.io/badge/👑 EOM HEYONHO-FF9800?style=for-the-badge&logo=&logoColor=white"alt="엄현호 이름 라벨" />
</td>

<td>
  <img src="https://img.shields.io/badge/LEE SEOYEON-4AB367?style=for-the-badge&logoColor=white"alt="이서연 이름 라벨" />
</td>

<td>
  <img src="https://img.shields.io/badge/LEE YOUNGBIN-31A8FF?style=for-the-badge&logoColor=white" alt="이영빈 이름 라벨" />
</td>

<td>
  <img src="https://img.shields.io/badge/📝 JI YUJIN-41454A?style=for-the-badge&logoColor=white" alt="지유진 이름 라벨" />
</td>
</tr>

</table>
