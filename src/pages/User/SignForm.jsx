import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../services/auth";
import { useAuthContext } from "../../contexts/authContext";

const SignForm = () => {
  const { pathname: path } = useLocation();
  const { getToken } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const navigate = useNavigate();

  const BUTTON = {
    "/signin": {
      dataset: "signin-button",
      text: "로그인",
      click: async () => {
        const result = await signIn({ email, password });
        if (result) {
          getToken(email);
          navigate("/todo", { replace: true });
        } else {
          window.alert("오류");
        }
      },
    },
    "/signup": {
      dataset: "signup-button",
      text: "회원가입",
      click: async () => {
        const result = await signUp({ email, password });
        if (result) {
          window.alert("환영합니다!");
          navigate("/signin", { replace: true });
        } else {
          window.alert("오류");
        }
      },
    },
  };

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }, []);

  useEffect(() => {
    const isValidEmail = new RegExp(/^[^@]+@[^@]+$/).test(email);
    const isValidPassword = password.length >= 8;
    const disabled = isValidEmail && isValidPassword ? false : true;
    setIsInvalid(disabled);
  }, [email, password]);

  return (
    <form>
      <input
        data-testid="email-input"
        name="email"
        spellCheck="false"
        value={email}
        onChange={onChangeInput}
      />
      <input
        data-testid="password-input"
        name="password"
        spellCheck="false"
        value={password}
        onChange={onChangeInput}
      />
      <button
        type="button"
        data-testid={BUTTON[path].dataset}
        onClick={BUTTON[path].click}
        disabled={isInvalid}
      >
        {BUTTON[path].text}
      </button>
    </form>
  );
};

export default SignForm;
