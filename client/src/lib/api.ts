import { endpoint } from "../constants";

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
