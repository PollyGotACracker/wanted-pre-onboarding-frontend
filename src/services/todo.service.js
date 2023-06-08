import { TASK_API } from "../constants/api";

export const getTodos = async ({ token }) => {
  const url = `${TASK_API}/todos`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (response?.ok) return result;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createTodo = async ({ token, todo }) => {
  const url = `${TASK_API}/todos`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (response?.ok) return result;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateTodo = async ({ token, item }) => {
  const { id, todo, isCompleted } = item;
  const url = `${TASK_API}/todos/${id}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo, isCompleted }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (response?.ok) return result;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteTodo = async ({ token, id }) => {
  const url = `${TASK_API}/todos/${id}`;
  const options = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await fetch(url, options);
    if (response?.ok) return true;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
