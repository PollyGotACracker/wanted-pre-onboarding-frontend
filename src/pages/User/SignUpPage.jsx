import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignForm from "../../components/templates/UserForm";
import { ALERT_AUTH, ERROR_AUTH } from "../../constants/message";
import { signUp } from "../../services/auth.service";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onClickSignUp = async ({ email, password }) => {
    setIsLoading(true);
    const result = await signUp({ email, password });
    if (result) {
      window.alert(ALERT_AUTH.signUp);
      navigate("/signin", { replace: true });
    } else {
      setIsLoading(false);
      return ERROR_AUTH.signUp;
    }
  };

  return (
    <main className="signUp">
      <SignForm
        header={"Sign Up"}
        dataset={"signup-button"}
        text={"회원가입"}
        onClick={onClickSignUp}
        isLoading={isLoading}
      />
    </main>
  );
};
export default SignUpPage;
