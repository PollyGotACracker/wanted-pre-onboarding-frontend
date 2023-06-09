import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signUp, signIn } from "../../services/auth.service";
import { useAuthContext } from "../../contexts/authContext";
import { ERROR_AUTH } from "../../constants/error";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import FormContainer from "../modules/FormContainer";

const SignForm = () => {
  const { pathname: path } = useLocation();
  const { setToken, userSignIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [signMessage, setSignMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const navigate = useNavigate();

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }, []);

  const onClickSignIn = async () => {
    const token = await signIn({ email, password });
    if (token) {
      setToken({ token, email });
      userSignIn(email);
      navigate("/todo", { replace: true });
    } else {
      setSignMessage(ERROR_AUTH.signIn);
    }
  };

  const onClickSignUp = async () => {
    const result = await signUp({ email, password });
    if (result) {
      window.alert("환영합니다!");
      navigate("/signin", { replace: true });
    } else {
      setSignMessage(ERROR_AUTH.signUp);
    }
  };

  const BUTTON = {
    "/signin": {
      dataset: "signin-button",
      text: "로그인",
      click: onClickSignIn,
    },
    "/signup": {
      dataset: "signup-button",
      text: "회원가입",
      click: onClickSignUp,
    },
  };

  const PASSWORD = {
    password: { click: () => setPasswordType("text"), text: <AiOutlineEye /> },
    text: {
      click: () => setPasswordType("password"),
      text: <AiOutlineEyeInvisible />,
    },
  };

  useEffect(() => {
    const isValidEmail = new RegExp(/^[^@]+@[^@]+$/).test(email);
    const isValidPassword = password.length >= 8;
    const disabled = isValidEmail && isValidPassword ? false : true;
    setIsInvalid(disabled);
  }, [email, password]);

  return (
    <FormContainer direction={"column"}>
      <Input
        dataset={"email-input"}
        name={"email"}
        placeholder={"이메일"}
        autoComplete={"true"}
        value={email}
        onChange={onChangeInput}
      />
      <Input
        dataset={"password-input"}
        name={"password"}
        placeholder={"비밀번호"}
        autoComplete={"false"}
        type={passwordType}
        value={password}
        onChange={onChangeInput}
      />
      <Button
        className={"secondary"}
        onClick={PASSWORD[passwordType].click}
        text={PASSWORD[passwordType].text}
      />
      <Button
        className={"primary"}
        dataset={BUTTON[path].dataset}
        onClick={BUTTON[path].click}
        disabled={isInvalid}
        text={BUTTON[path].text}
      />
      <div>{signMessage}</div>
    </FormContainer>
  );
};

export default SignForm;
