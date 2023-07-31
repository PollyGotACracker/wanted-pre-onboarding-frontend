import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Main from "../../components/atoms/Main";
import UserForm from "../../components/templates/UserForm";
import { ERROR_AUTH } from "../../constants/message";
import { useAuthContext } from "../../contexts/authContext";

const SignInPage = () => {
  const { signIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onClickSubmit = useCallback(
    async ({ email, password }) => {
      setIsLoading(true);
      const token = await signIn({ email, password });
      if (token) {
        navigate("/todo", { replace: true });
      } else {
        setIsLoading(false);
        return ERROR_AUTH.signIn;
      }
    },
    [signIn, navigate]
  );

  return (
    <Main className={"sign-in"} color={"point"}>
      <UserForm
        type={"signIn"}
        onClickSubmit={onClickSubmit}
        isLoading={isLoading}
        message={location?.state?.message || ""}
      />
    </Main>
  );
};
export default SignInPage;
