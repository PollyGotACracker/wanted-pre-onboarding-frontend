import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Route, Router, Routes } from "react-router-dom";

import SignInPage from "../pages/User/SignInPage";
import TodoPage from "../pages/Todo/TodoPage";
import TokenStorage from "../utils/tokenStorage";
import HttpClient from "../services/core";
import AuthService from "../services/auth.service";
import { AuthContextProvider } from "../contexts/authContext";
import { ERROR_AUTH } from "../constants/message";

// nock 라이브러리 사용 시 timeout 오류 발생
// testTimeout 옵션을 설정해도 해결되지 않음
describe("signin page", () => {
  let originalFetch;
  let history;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    originalFetch = global.fetch;
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
    global.fetch = originalFetch;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const signInHelper = ({ email, password }) => {
    const emailInput = screen.queryByTestId("email-input");
    const passwordInput = screen.queryByTestId("password-input");

    fireEvent.change(emailInput, {
      target: { value: email },
    });
    fireEvent.change(passwordInput, { target: { value: password } });

    act(() => {
      const signinBtn = screen.queryByTestId("signin-button");
      userEvent.click(signinBtn);
    });
  };

  const fetchHelper = async ({ body, data }) => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );
    global.fetch = mockFetch;

    const baseURL = "https://www.pre-onboarding-selection-task.shop";
    await fetch(`${baseURL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    expect(mockFetch).toHaveBeenCalled();
  };

  it("should redirect to the todo page if sign-in was successful", async () => {
    const userData = { email: "polly@polly.com", password: "12341234" };
    const data = {
      status: 200,
      ok: true,
      access_token: "access_token",
    };

    signInHelper(userData);
    await fetchHelper({ body: userData, data: data });

    await waitFor(async () => {
      expect(history.location.pathname).toBe("/todo");
    });
  });

  it("should show an error message if sign-in failed", async () => {
    const userData = { email: "polly@polly.com", password: "43214321" };
    const data = {
      status: 401,
      ok: false,
    };

    signInHelper(userData);
    await fetchHelper({ body: userData, data: data });

    await waitFor(async () => {
      const errorMessage = await screen.findByText(ERROR_AUTH.signIn);
      expect(errorMessage).toBeVisible();
    });
  });
});
