# [원티드 프리온보딩 인턴십 - 프론트엔드 사전과제](https://github.com/walking-sunset/selection-task)

- 전유영
- bitterns96@gmail.com
- 2023.06.08 ~ 2023.06.14
- !2023.06.27. 토큰 만료 시 /todo 의 403 오류 처리할 것

## 배포 주소

- [https://mytodolist.kr/](https://mytodolist.kr/)

## 실행 방법

1. 프로젝트를 로컬 저장소에 복제

- 디렉토리로 이동한 후 Git bash 또는 terminal 에서 다음 명령어 실행

```bash
git clone https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend.git
```

2. dependency 설치

- Visual Studio Code terminal 에서 다음 명령어 실행

```bash
npm install
```

3. 로컬 환경에서 프로젝트 실행

```bash
npm start
```

## 영상

### /home

![home](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/711e4f0a-bb6d-4295-a991-808e244dace0)

### /signup

![signup](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/44a267ad-2172-4459-936f-55f641a2e1f2)

### /signin

![signin](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/300732a5-72d8-4ee5-9467-0685e1996884)

### /todo

![todo](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/88f412c6-2e24-42c5-8a40-ce4cff454f22)

### redirection

- 로그인 하지 않은 상태에서 todo => signin 으로 이동
  ![redirect_signin](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/cf9a08a4-c65a-4caa-82dd-c29c1a515a39)
- 로그인 한 상태에서 signin 또는 signup => todo 로 이동
  ![redirect_todo](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/7d5cd4e0-fc62-495b-a4ec-7552cd140bc9)

### responsive

![responsive](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/c2ebda3e-7ea5-4e6b-b69d-a27af85ef7d4)

## 공부

### redirection 오류

_/todo 에서 바로 로그아웃하면 메인 화면이 아닌 로그인 화면으로 redirect_

- `useEffect` 의 동작 방식 때문에 token 없음 => /signin 으로 넘어가며 권한 없음 메시지가 표시되었다.
- 따라서 token 값 뿐만 아니라 다른 조건도 함께 고려해야 한다고 생각했다.
- `const location = useLocation()` 을 사용하여 location 의 key 값을 확인하였다.
- 주소창에 직접 접속했을 때와 다른 페이지에서 이동했을 때 각각 default 와 history 에 따른 위치 고유 문자열을 반환했다.
- `(location?.key === "default" && !token)` 조건이 참일 경우 redirect 되도록 코드를 변경하였다.

### react element 를 props 로 전달

- `render` props 로 element 를 return 하는 함수를 전달

### 상단 navigation 과 측면 sidebar 를 분리할 것

- 부모 요소의 z-index 값은 자식 요소에 영향을 미친다.
- 따라서 만약 nav 가 sidebar 의 부모 요소일 경우, 화면 blocker 가 active 될 때 sidebar 만 blocker 위로 올릴 수 없게 된다.

### 배포 후 문제

- 새로고침 시 404 오류 :

  - [create react app 공식 문서 참조](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing)
  - [index.html](https://github.com/rafgraph/spa-github-pages/blob/gh-pages/index.html#L36-L57)
  - [404.html](https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html#L6-L36)

- local 에서 실행한 것과 달리, github 로 배포할 경우 todo component 가 unmount 될 때 데이터를 반환: fetch 함수가 포함된 useEffect 의 코드를 별도의 함수로 분리하여 선언하였다.
  - 오류 원인 코드
    ```js
    useEffect(() => async () => {...}, [...]);
    ```
  - 수정한 코드
    ```js
    const initData = async () => {...};
    useEffect(() => { initData(); }, [...]);
    ```
