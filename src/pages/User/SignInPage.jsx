import { useState } from "react";
import Main from "../../components/atoms/Main";
import { useLocation, useNavigate } from "react-router-dom";
import SignForm from "../../components/templates/UserForm";
import { ERROR_AUTH } from "../../constants/message";
import { useAuthContext } from "../../contexts/authContext";
import { signIn } from "../../services/auth.service";

const SignInPage = () => {
  const { setToken, userSignIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onClickSignIn = async ({ email, password }) => {
    setIsLoading(true);
    const token = await signIn({ email, password });
    if (token) {
      setToken({ token, email });
      userSignIn(email);
      navigate("/todo", { replace: true });
    } else {
      setIsLoading(false);
      return ERROR_AUTH.signIn;
    }
  };

  return (
    <Main className={"sign-in"} color={"point"}>
      <SignForm
        header={"Sign In"}
        dataset={"signin-button"}
        text={"로그인"}
        onClick={onClickSignIn}
        isLoading={isLoading}
        message={location?.state?.message || ""}
      />
    </Main>
  );
};
export default SignInPage;
