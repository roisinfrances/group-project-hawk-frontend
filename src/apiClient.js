import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor(tokenProvider,logoutHandler){
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }


  authenticatedCall(method,url,data){
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider
      },
      data,
    }).catch((error) => {
      if(error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject()
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

  login(username,password) {
    return this.apiCall("post",url + "auth/",{username: username, password:password});
  }

  getEvents() {
    return this.authenticatedCall("get", url);
  }

  addEvent(name, location, description, date) {
    return this.authenticatedCall("post", url, { name, location, description, date });
  }

  removeEvent(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateEvent(id, name, location, description, date) {
    return this.authenticatedCall("put", `${url}${id}`, { name, location, description, date});
  }
}
