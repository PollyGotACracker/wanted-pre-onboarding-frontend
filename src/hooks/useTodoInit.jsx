import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useTodoContext } from "../contexts/todoContext";
import useRouter from "./useRouter";

const useTodoInit = () => {
  const { signOut } = useAuthContext();
  const { data, setData, getTodos } = useTodoContext();
  const [isLoading, setIsLoading] = useState(true);
  const { replaceTo } = useRouter();

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
        replaceTo("/");
      }
    })();
  }, [data.length, getTodos, setData, signOut, replaceTo]);

  return { isLoading };
};

export default useTodoInit;
