export class Api {

  makeRequest(endpoint: string) {
    return fetch(endpoint)
    .then(data => data.json())
    .catch(err => console.log(err));
  }
}