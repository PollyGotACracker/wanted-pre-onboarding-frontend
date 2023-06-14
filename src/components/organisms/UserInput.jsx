import { memo, useCallback, useEffect, useState } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import WrapInput from "../molecules/WrapInput";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const TodoInput = memo(({ valueRef, setIsInvalid }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

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

  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "email") {
        setEmail(value);
        valueRef.current.email = value;
      }
      if (name === "password") {
        setPassword(value);
        valueRef.current.password = value;
      }
    },
    [valueRef]
  );

  useEffect(() => {
    const isValidEmail = new RegExp(/^[^@]+@[^@]+$/).test(email);
    const isValidPassword = password.length >= 8;
    const disabled = isValidEmail && isValidPassword ? false : true;
    setIsInvalid(disabled);
  }, [email, password, setIsInvalid]);

  return (
    <>
      <WrapInput>
        <Label htmlFor={"email"} icon={<MdAlternateEmail />} />
        <Input
          dataset={"email-input"}
          id={"email"}
          className={"full"}
          name={"email"}
          placeholder={"user@email.com"}
          type={"email"}
          value={email}
          onChange={onChangeInput}
        />
      </WrapInput>
      <WrapInput>
        <Label htmlFor={"password"} icon={<MdLock />} />
        <Input
          dataset={"password-input"}
          id={"password"}
          className={"full"}
          name={"password"}
          placeholder={"••••••••"}
          type={passwordType}
          value={password}
          onChange={onChangeInput}
        />
      </WrapInput>
      <Button
        className={"small"}
        onClick={PASSWORD[passwordType].click}
        icon={PASSWORD[passwordType].icon}
        text={PASSWORD[passwordType].text}
      />
    </>
  );
});

export default TodoInput;
