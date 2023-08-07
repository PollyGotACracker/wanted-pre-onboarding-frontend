import { useCallback, useRef, useState } from "react";
import Headline from "../atoms/Headline";
import Button from "../atoms/Button";
import Spinner from "../atoms/Spinner";
import Alert from "../molecules/Alert";
import Form from "../molecules/Form";
import UserInput from "../organisms/UserInput";

const UserForm = ({ type, onClickSubmit, isLoading, message = "" }) => {
  const [signMessage, setSignMessage] = useState(message);
  const [isInvalid, setIsInvalid] = useState(true);
  const valueRef = useRef({ email: "", password: "" });

  const TEXT_DATA = {
    signUp: { header: "Sign Up", dataset: "signup-button", text: "회원가입" },
    signIn: { header: "Sign In", dataset: "signin-button", text: "로그인" },
  };

  const onClickButton = useCallback(async () => {
    const result = await onClickSubmit({
      email: valueRef.current.email,
      password: valueRef.current.password,
    });
    if (result) setSignMessage(result);
  }, [onClickSubmit]);

  return (
    <>
      <Alert text={signMessage} />
      <Form className={"column default composite"}>
        <Headline text={TEXT_DATA[type].header} />
        <UserInput valueRef={valueRef} setIsInvalid={setIsInvalid} />
        <Button
          className={"primary large"}
          dataset={TEXT_DATA[type].dataset}
          onClick={onClickButton}
          disabled={isInvalid}
          text={
            isLoading ? (
              <Spinner loading={isLoading} size={"1rem"} color={"white"} />
            ) : (
              TEXT_DATA[type].text
            )
          }
        />
      </Form>
    </>
  );
};

export default UserForm;
