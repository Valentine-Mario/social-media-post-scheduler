import { endpoint } from "../constants";
import { Response } from "../types";

export const fetchData = <T>(path: String): Promise<T> => {
  return new Promise((res, rej) => {
    var myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(endpoint + path, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        res(result);
      })
      .catch((error) => rej(error));
  });
};

export const postData = (url: String, data: object): Promise<Response> => {
  return new Promise((res, rej) => {
    var myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(endpoint + url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        res(result);
      })
      .catch((error) => rej(error));
  });
};
