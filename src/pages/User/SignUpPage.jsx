import Main from "../../components/atoms/Main";
import UserForm from "../../components/templates/UserForm";
import useSignUp from "../../hooks/useSignUp";

const SignUpPage = () => {
  const { submitForm, isLoading } = useSignUp();

  return (
    <Main className={"sign-up"} color={"point"}>
      <UserForm
        type={"signUp"}
        onClickSubmit={submitForm}
        isLoading={isLoading}
      />
    </Main>
  );
};
export default SignUpPage;
