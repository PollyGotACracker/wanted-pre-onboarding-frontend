class EmailStorage {
  get() {
    return localStorage.getItem("email");
  }

  set(email) {
    localStorage.setItem("email", email);
  }

  remove() {
    localStorage.removeItem("email");
  }
}

const emailStorage = new EmailStorage();

export default emailStorage;
