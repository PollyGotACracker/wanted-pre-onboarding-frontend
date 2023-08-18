import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/authContext";
import { ERROR_AUTH } from "../constants/message";

const useSignIn = () => {
  const { signIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async ({ email, password }) => {
    setIsLoading(true);
    const token = await signIn({ email, password });
    if (token) {
      navigate("/todo", { replace: true });
    } else {
      setIsLoading(false);
      return ERROR_AUTH.signIn;
    }
  };

  return { submitForm, isLoading };
};

export default useSignIn;
