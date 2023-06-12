# [원티드 프리온보딩 - 프론트엔드](https://github.com/walking-sunset/selection-task)

- 전유영
- bitterns96@gmail.com

## 실행 방법

```shell
npm install
npm start
```

## 공부

### redirection 오류

_/todo 에서 바로 로그아웃하면 메인 화면이 아닌 로그인 화면으로 redirect_

- `useEffect` 의 동작 방식 때문에 token 없음 => /signin 으로 넘어가며 권한 없음 메시지가 표시되었다.
- 따라서 token 값 뿐만 아니라 다른 조건도 함께 고려해야 한다고 생각했다.
- `const location = useLocation()` 을 사용하여 location 의 key 값을 확인하였다.
- 주소창에 직접 접속했을 때와 다른 페이지에서 이동했을 때 각각 default 와 history 에 따른 위치 고유 문자열을 반환했다.
- `(location?.key === "default" && !token)` 조건이 참일 경우 redirect 되도록 코드를 변경하였다.

## react element 를 props 로 전달

- `render` props 로 element 를 return 하는 함수를 전달
