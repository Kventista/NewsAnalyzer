export default class GitApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl; 
  }
getCards() {
  this.request = fetch(this._baseUrl)
      .then(res => {
          if (res.ok) {
              return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  return this.request;
  }  
}