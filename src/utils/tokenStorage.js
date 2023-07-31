import emailStorage from "./emailStorage";

class TokenStorage {
  #TOKEN_NAME = "access_token";
  emailStorage = emailStorage;

  get() {
    return localStorage.getItem(this.#TOKEN_NAME);
  }

  set(token, email) {
    localStorage.setItem(this.#TOKEN_NAME, token);
    this.emailStorage.set(email);
  }

  remove() {
    localStorage.removeItem(this.#TOKEN_NAME);
    this.emailStorage.remove();
  }
}

export default TokenStorage;
