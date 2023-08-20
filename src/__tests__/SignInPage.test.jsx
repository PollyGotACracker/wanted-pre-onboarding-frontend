import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Route, Router, Routes } from "react-router-dom";

import { authServer } from "../mocks/server";
import TokenStorage from "../utils/tokenStorage";
import HttpClient from "../services/core";
import AuthService from "../services/auth.service";
import { AuthContextProvider } from "../contexts/authContext";
import SignInPage from "../pages/User/SignInPage";
import TodoPage from "../pages/Todo/TodoPage";
import { ERROR_AUTH } from "../constants/message";

describe("signin page", () => {
  let history;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    authServer.listen();
  });

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ["/signin"] });

    const tokenStorage = new TokenStorage();
    const httpClient = new HttpClient(tokenStorage);
    const authService = new AuthService(httpClient, tokenStorage);
    render(
      <AuthContextProvider authService={authService}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    );
  });

  afterEach(() => {
    authServer.resetHandlers();
  });

  afterAll(() => {
    authServer.close();
  });

  const signInHelper = ({ email, password }) => {
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const signinBtn = screen.getByTestId("signin-button");

    fireEvent.change(emailInput, {
      target: { value: email },
    });
    fireEvent.change(passwordInput, { target: { value: password } });
    userEvent.click(signinBtn);
  };

  it("should redirect to the todo page if sign-in was successful", async () => {
    const userData = { email: "polly@polly.com", password: "12341234" };
    signInHelper(userData);

    await waitFor(async () => {
      expect(history.location.pathname).toBe("/todo");
    });
  });

  it("should show an error message if sign-in failed", async () => {
    const userData = { email: "polly@polly.com", password: "43214321" };
    signInHelper(userData);

    await waitFor(async () => {
      expect(screen.getByText(ERROR_AUTH.signIn)).toBeVisible();
    });
  });
});
