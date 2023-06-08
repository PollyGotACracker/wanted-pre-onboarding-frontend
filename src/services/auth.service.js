import { TASK_API } from "../constants/api";

export const signUp = async ({ email, password }) => {
  const url = `${TASK_API}/auth/signup`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
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

export const signIn = async ({ email, password }) => {
  const url = `${TASK_API}/auth/signin`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.access_token) return result.access_token;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
