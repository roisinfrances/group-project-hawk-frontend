import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }

  authenticatedCall(method, url, data) {
    console.log(data);
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider,
      },
      data,
    }).catch((error) => {
      if (error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject();
      } else {
        throw error;
      }
    });
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  login(username, password) {
    return this.apiCall("post", url + "auth/", {
      username: username,
      password: password,
    });
  }

  getQuotes() {
    return this.authenticatedCall("get", url);
  }

  addQuote(rooms, areas, jobDescription, productsRequired, cost, date) {
    console.log("Add quote api called");
    return this.authenticatedCall("post", url, {
      rooms,
      areas,
      jobDescription,
      productsRequired,
      cost,
      date,
    });
  }

  removeQuote(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateQuote(id, rooms, areas, jobDescription, productsRequired, cost, date) {
    return this.authenticatedCall("put", `${url}${id}`, {
      rooms,
      areas,
      jobDescription,
      productsRequired,
      cost,
      date,
    });
  }

// start job function // adds date 

  startJob(id) {
    return this.authenticatedCall("put", `${url}${id}`,{
      started: new Date().toISOString()
    })
  }
}
