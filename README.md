# [원티드 프리온보딩 - 프론트엔드](https://github.com/walking-sunset/selection-task)

- 전유영
- bitterns96@gmail.com

## 실행 방법

```shell
npm install
npm start
```

## 영상

### /home

![home](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/c828ae21-773e-4604-975d-8b4008f56693)

### /signup

![signup](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/acd6e801-1f1d-425a-aa1f-27d1c9c99453)

### /signin

![signin](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/de2a5083-7468-44c5-b867-13067c61b4d9)

### /todo

![todo](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/ecbd31ad-7b8c-4a37-a3fd-f76a090d3bc1)

### redirection

- 로그인 하지 않은 상태에서 todo => signin 으로 이동
  ![redirect_signin](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/801b5628-8160-4455-8016-6a632e8584bf)
- 로그인 한 상태에서 signin 또는 signup => todo 로 이동
  ![redirect_todo](https://github.com/PollyGotACracker/wanted-pre-onboarding-frontend/assets/92136750/82e61a99-78ae-4543-9497-4d0d309c4572)

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

### 배포 후 문제

- 새로고침 시 404 오류 : [create react app 공식 문서 참조](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing)

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
