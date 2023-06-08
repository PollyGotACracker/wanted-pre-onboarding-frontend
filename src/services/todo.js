import { TASK_API } from "../constants/auth";

export const createTodo = async ({ token, todo }) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo }),
  };
  try {
    const response = await fetch(`${TASK_API}/todos`, options);
    const result = await response.json();
    if (result?.status > 200) return false;
    else return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};
