import { useCallback, useEffect, useState } from "react";
import Header from "../atoms/Header";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import AlertContainer from "../modules/AlertContainer";
import FormContainer from "../modules/FormContainer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import LabelForContainer from "../modules/LabelForContainer";

const SignForm = ({ header, dataset, text, onClick, message = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [signMessage, setSignMessage] = useState("");
  const [authMessage] = useState(message);
  const [isInvalid, setIsInvalid] = useState(true);

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }, []);

  const PASSWORD = {
    password: {
      click: () => {
        setPasswordType("text");
      },
      icon: <AiOutlineEye />,
      text: "비밀번호 표시",
    },
    text: {
      click: () => setPasswordType("password"),
      icon: <AiOutlineEyeInvisible />,
      text: "비밀번호 숨김",
    },
  };

  useEffect(() => {
    const isValidEmail = new RegExp(/^[^@]+@[^@]+$/).test(email);
    const isValidPassword = password.length >= 8;
    const disabled = isValidEmail && isValidPassword ? false : true;
    setIsInvalid(disabled);
  }, [email, password]);

  return (
    <>
      <AlertContainer text={authMessage ? authMessage : signMessage} />
      <FormContainer className={"column default composite"}>
        <Header text={header} />
        <LabelForContainer>
          <Label htmlFor={"email"} icon={<MdAlternateEmail />} />
          <Input
            dataset={"email-input"}
            id={"email"}
            className={"full"}
            name={"email"}
            placeholder={"이메일"}
            type={"email"}
            value={email}
            onChange={onChangeInput}
          />
        </LabelForContainer>
        <LabelForContainer>
          <Label htmlFor={"password"} icon={<MdLock />} />
          <Input
            dataset={"password-input"}
            id={"password"}
            className={"full"}
            name={"password"}
            placeholder={"비밀번호"}
            type={passwordType}
            value={password}
            onChange={onChangeInput}
          />
        </LabelForContainer>
        <Button
          className={"secondary"}
          onClick={PASSWORD[passwordType].click}
          icon={PASSWORD[passwordType].icon}
          text={PASSWORD[passwordType].text}
        />
        <Button
          className={"primary full"}
          dataset={dataset}
          onClick={async () => {
            const result = await onClick({ email, password });
            if (result) setSignMessage(result);
          }}
          disabled={isInvalid}
          text={text}
        />
      </FormContainer>
    </>
  );
};

export default SignForm;
