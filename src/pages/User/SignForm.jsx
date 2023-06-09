import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../services/auth.service";
import { useAuthContext } from "../../contexts/authContext";
import { ERROR_AUTH } from "../../constants/error";

const SignForm = () => {
  const { pathname: path } = useLocation();
  const { setToken, userSignIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [signMessage, setSignMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const navigate = useNavigate();

  const BUTTON = {
    "/signin": {
      dataset: "signin-button",
      text: "로그인",
      click: async () => {
        const token = await signIn({ email, password });
        if (token) {
          setToken({ token, email });
          userSignIn(email);
          navigate("/todo", { replace: true });
        } else {
          setSignMessage(ERROR_AUTH.signIn);
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
          setSignMessage(ERROR_AUTH.signUp);
        }
      },
    },
  };

  const PASSWORD = {
    password: { click: () => setPasswordType("text"), text: "비밀번호 표시" },
    text: { click: () => setPasswordType("password"), text: "비밀번호 숨기기" },
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
        placeholder="이메일"
        spellCheck="false"
        value={email}
        onChange={onChangeInput}
      />
      <input
        data-testid="password-input"
        name="password"
        placeholder="비밀번호"
        type={passwordType}
        spellCheck="false"
        value={password}
        onChange={onChangeInput}
      />
      <button type="button" onClick={PASSWORD[passwordType].click}>
        {PASSWORD[passwordType].text}
      </button>
      <button
        type="button"
        data-testid={BUTTON[path].dataset}
        onClick={BUTTON[path].click}
        disabled={isInvalid}
      >
        {BUTTON[path].text}
      </button>
      <div>{signMessage}</div>
    </form>
  );
};

export default SignForm;
