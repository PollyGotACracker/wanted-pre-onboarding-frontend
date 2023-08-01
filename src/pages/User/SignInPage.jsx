import { useLocation } from "react-router";
import Main from "../../components/atoms/Main";
import UserForm from "../../components/templates/UserForm";
import useSignIn from "../../hooks/useSignIn";

const SignInPage = () => {
  const { submitForm, isLoading } = useSignIn();
  const location = useLocation();

  return (
    <Main className={"sign-in"} color={"point"}>
      <UserForm
        type={"signIn"}
        onClickSubmit={submitForm}
        isLoading={isLoading}
        message={location?.state?.message || ""}
      />
    </Main>
  );
};
export default SignInPage;
