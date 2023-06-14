import { memo, useCallback, useEffect, useState } from "react";
import Header from "../atoms/Header";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Spinner from "../atoms/Spinner";
import Alert from "../molecules/Alert";
import Form from "../molecules/Form";
import WrapInput from "../molecules/WrapInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail, MdLock } from "react-icons/md";

const SignForm = memo(
  ({ header, dataset, text, onClick, isLoading, message = "" }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [signMessage, setSignMessage] = useState(message);
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
        <Alert text={signMessage} />
        <Form className={"column default composite"}>
          <Header text={header} />
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
          <Button
            className={"primary large"}
            dataset={dataset}
            onClick={async () => {
              const result = await onClick({ email, password });
              if (result) setSignMessage(result);
            }}
            disabled={isInvalid}
            text={
              isLoading ? (
                <Spinner loading={isLoading} size={"1rem"} color={"white"} />
              ) : (
                text
              )
            }
          />
        </Form>
      </>
    );
  }
);

export default SignForm;
