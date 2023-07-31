class AuthService {
  endPoint = "/auth";

  constructor(httpClient, tokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }

  async signUp({ email, password }) {
    const url = `${this.endPoint}/signup`;
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
    };
    try {
      const response = await this.httpClient.fetch(url, options);
      if (response?.ok) return response.ok;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signIn({ email, password }) {
    const url = `${this.endPoint}/signin`;
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
    };
    try {
      const response = await this.httpClient.fetch(url, options);
      const result = await response.json();
      if (result.access_token) {
        this.tokenStorage.set(result.access_token, email);
        return response.ok;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async signOut() {
    this.tokenStorage.remove();
  }
}

export default AuthService;
