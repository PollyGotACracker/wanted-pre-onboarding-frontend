import { ERROR_TODO } from "../constants/message";

class TodoService {
  endPoint = "/todos";

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getTodos() {
    const options = {
      method: "GET",
    };
    try {
      const response = await this.httpClient.fetch(this.endPoint, options);
      const result = await response.json();
      if (response?.ok) return result;
      else window.alert(ERROR_TODO.get);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTodo(todo) {
    const options = {
      method: "POST",
      body: JSON.stringify({ todo }),
    };
    try {
      const response = await this.httpClient.fetch(this.endPoint, options);
      const result = await response.json();
      if (response?.ok) return result;
      else window.alert(ERROR_TODO.create);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTodo(item) {
    const { id, todo, isCompleted } = item;
    const url = `${this.endPoint}/${id}`;
    const options = {
      method: "PUT",
      body: JSON.stringify({ todo, isCompleted }),
    };
    try {
      const response = await this.httpClient.fetch(url, options);
      const result = await response.json();
      if (response?.ok) return result;
      else window.alert(ERROR_TODO.update);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTodo(id) {
    const url = `${this.endPoint}/${id}`;
    const options = {
      method: "DELETE",
    };
    try {
      const response = await this.httpClient.fetch(url, options);
      if (response?.ok) return response.ok;
      else window.alert(ERROR_TODO.delete);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TodoService;
