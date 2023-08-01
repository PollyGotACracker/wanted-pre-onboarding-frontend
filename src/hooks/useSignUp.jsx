import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/authContext";
import { ALERT_AUTH, ERROR_AUTH } from "../constants/message";

const useSignUp = () => {
  const { signUp } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async ({ email, password }) => {
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

  return { submitForm, isLoading };
};

export default useSignUp;
