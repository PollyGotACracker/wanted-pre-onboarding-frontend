import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { useTodoContext } from "../contexts/todoContext";

const useTodoInit = () => {
  const { signOut } = useAuthContext();
  const { data, setData, getTodos } = useTodoContext();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (data.length > 0) return false;
      const result = await getTodos();
      if (result) {
        const data = [...result].reverse();
        setData(data);
        setTimeout(() => setIsLoading(false), 500);
      } else {
        signOut();
        navigate("/", { replace: true });
      }
    })();
  }, [data.length, getTodos, navigate, setData, signOut]);

  return { isLoading };
};

export default useTodoInit;
