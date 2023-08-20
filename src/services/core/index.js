class HttpClient {
  constructor(tokenStorage) {
    this.baseURL = "https://www.pre-onboarding-selection-task.shop";
    this.tokenStorage = tokenStorage;
  }

  async fetch(endPoint, options) {
    const result = await window.fetch(`${this.baseURL}${endPoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": this.baseURL,
        Authorization: "Bearer " + this.tokenStorage.get(),
        ...options?.headers,
      },
    });
    return result;
  }
}

export default HttpClient;
