import { useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useTodoContext } from "../contexts/todoContext";
import useRouter from "./useRouter";

const useTodoInit = () => {
  const { signOut } = useAuthContext();
  const { data, setData, getTodos } = useTodoContext();
  const { replaceTo } = useRouter();

  useEffect(() => {
    (async () => {
      if (data.length > 0) return false;
      const result = await getTodos();
      if (result) {
        const data = [...result].reverse();
        setData(data);
      } else {
        signOut();
        replaceTo("/");
      }
    })();
  }, [data.length, getTodos, setData, signOut, replaceTo]);
};

export default useTodoInit;
