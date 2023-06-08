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

export const getTodos = async ({ token }) => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
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

export const updateTodo = async ({ token, item }) => {
  const { id, todo, isCompleted } = item;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    Body: { todo, isCompleted },
  };
  try {
    const response = await fetch(`${TASK_API}/todos/${id}`, options);
    const result = await response.json();
    if (result?.status > 200) return false;
    else return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteTodo = async ({ token, id }) => {
  const options = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await fetch(`${TASK_API}/todos/${id}`, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
    return false;
  }
};
