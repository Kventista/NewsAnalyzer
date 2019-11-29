export default class NewsApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
     this.token = 'b4311048808a4f1f9e06934c2bf1b51c';
  }
  getCards(from, to, query) {
    this.url = `${this.baseUrl}q=${query}&from=${from}&to=${to}&pageSize=100&apiKey=${this.token}&language=ru`;
    this.req = fetch(this.url)
                .then(res => {
                    if (res.ok) {
                      return Promise.resolve(res.json());
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
                return this.req;
  }
}