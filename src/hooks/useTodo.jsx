import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { useTodoContext } from "../contexts/todoContext";

const useTodo = () => {
  const { signOut } = useAuthContext();
  const { data, setData, getTodos } = useTodoContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (data.length > 0) return;
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

export default useTodo;
