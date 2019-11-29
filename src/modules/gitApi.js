export default class GitApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; 
  }
getCards() {
  this.req = fetch(this.baseUrl)
      .then(res => {
          if (res.ok) {
              return Promise.resolve(res.json());
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  return this.req;
  }  
}