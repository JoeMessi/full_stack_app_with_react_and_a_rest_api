// Data is a helper class that provides utility methods
// to allow the React client to talk to the Express server

import config from './config';

export default class Data {
  // api is a method used to make the GET and POST request to the REST API
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // url variable configures the request path using the   base URL defined config.js
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // "Accept": "application/json",
      },
    };
    // if body given add it to the options obj
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {
      // encode the username and password credentials passed to the api() method
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      // set the Authorization Headers in the option obj
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // makes a GET request to the '/users' endpoint
  // and returns a json obj with users credentials
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // makes a POST request to '/users' sending new user data
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
