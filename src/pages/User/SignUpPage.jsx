import { useNavigate } from "react-router-dom";
import SignForm from "../../components/templates/UserForm";
import { ERROR_AUTH } from "../../constants/error";
import { signUp } from "../../services/auth.service";

const SignUpPage = () => {
  const navigate = useNavigate();

  const onClickSignUp = async ({ email, password }) => {
    const result = await signUp({ email, password });
    if (result) {
      window.alert("환영합니다!");
      navigate("/signin", { replace: true });
    } else {
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
      />
    </main>
  );
};
export default SignUpPage;
