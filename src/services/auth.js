import { TASK_API } from "../constants/auth";

export const signUp = async ({ email, password }) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(`${TASK_API}/auth/signup`, options);
    const result = await response.json();
    if (result?.status > 200) return false;
    else return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signIn = async ({ email, password }) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(`${TASK_API}/auth/signin`, options);
    const result = await response.json();
    if (result.access_token) return result.access_token;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
