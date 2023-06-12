import Main from "../components/atoms/Main";
import Status from "../components/templates/Status";

const NotFound = () => {
  return (
    <Main className={"not-found"}>
      <Status
        num={"404"}
        title={"Not Found"}
        desc={"요청한 URL 페이지를 찾을 수 없습니다."}
      />
    </Main>
  );
};

export default NotFound;
