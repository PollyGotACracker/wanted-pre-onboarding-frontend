import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Route, Router, Routes } from "react-router-dom";

import { todoServer } from "../mocks/server";
import TokenStorage from "../utils/tokenStorage";
import HttpClient from "../services/core";
import AuthService from "../services/auth.service";
import TodoService from "../services/todo.service";
import { AuthContextProvider } from "../contexts/authContext";
import { TodoContextProvider } from "../contexts/todoContext";
import TodoPage from "../pages/Todo/TodoPage";

describe("todo page", () => {
  let history;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    todoServer.listen();
  });

  beforeEach(() => {
    const tokenStorage = new TokenStorage();
    const httpClient = new HttpClient(tokenStorage);
    const authService = new AuthService(httpClient, tokenStorage);
    const todoService = new TodoService(httpClient);

    history = createMemoryHistory({ initialEntries: ["/todo"] });
    render(
      <AuthContextProvider authService={authService}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/todo"
              element={
                <TodoContextProvider todoService={todoService}>
                  <TodoPage />
                </TodoContextProvider>
              }
            />
          </Routes>
        </Router>
      </AuthContextProvider>
    );
  });

  afterEach(() => {
    todoServer.resetHandlers();
  });

  afterAll(() => {
    todoServer.close();
  });

  it("should show todo data when todo page is loaded", async () => {
    // `isLoader` state 변수를 사용했을 경우,
    // 테스트에서 fetch 에 성공해도 DOM tree에서 loader 가 사라지지 않는 문제 발생
    waitForElementToBeRemoved(() => screen.getByTestId("loader"));
    await waitFor(async () => {
      expect(screen.getByText("test1")).toBeVisible();
    });
  });

  it("should show the new todo item", async () => {
    const newTodoInput = screen.getByTestId("new-todo-input");
    const newTodoAddButton = screen.getByTestId("new-todo-add-button");

    fireEvent.change(newTodoInput, {
      target: { value: "test5" },
    });
    userEvent.click(newTodoAddButton);

    await waitFor(async () => {
      expect(screen.getByText("test1")).toBeVisible();
      expect(screen.getByText("test5")).toBeVisible();
    });
  });

  it("should update the todo item", async () => {
    await waitFor(async () => {
      const modifyButtons = screen.getAllByTestId("modify-button");
      const modifyButton = modifyButtons[modifyButtons.length - 1];
      userEvent.click(modifyButton);

      const modifyInputs = screen.getAllByTestId("modify-input");
      const modifyInput = modifyInputs[modifyInputs.length - 1];
      fireEvent.change(modifyInput, {
        target: { value: "test" },
      });

      const submitButtons = screen.getAllByTestId("submit-button");
      const submitButton = submitButtons[submitButtons.length - 1];
      userEvent.click(submitButton);

      expect(screen.getByText("test")).toBeVisible();
    });
  });

  // Error: TypeError: Cannot read properties of null (reading '_location')
  // https://github.com/search?q=repo%3Ajsdom%2Fjsdom+Cannot+read+property+%27_location%27+of+null&type=Issues
  it("should delete the todo item", async () => {
    await waitFor(async () => {
      const deleteButtons = screen.getAllByTestId("delete-button");
      const deleteButton = deleteButtons[deleteButtons.length - 1];
      userEvent.click(deleteButton);
    });

    waitForElementToBeRemoved(() => screen.findByTestId("test"));
  });
});
