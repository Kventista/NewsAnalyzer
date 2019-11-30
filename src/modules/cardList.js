export default class CardList {
  constructor(cardsBox) {
      this._cardsBox = cardsBox;
      this.allNews = [];
      this.lastIndex = 0;      
  }

  init () {
    this.lastIndex=0;
    for (let i = 0; i < Math.min(3, this.allNews.length); i++) { 
      this._cardsBox.appendChild(this.allNews[i].element);
      this.lastIndex++;
    }
  }

  showNext(){
    const indexBefore = this.lastIndex;
    for (let i = this.lastIndex; i < Math.min(indexBefore+3, this.allNews.length, 100); i++) { 
      this._cardsBox.appendChild(this.allNews[i].element);
      this.lastIndex++;
    }
  }

  clear(){
    while (this._cardsBox.firstChild) {
      this._cardsBox.removeChild(this._cardsBox.firstChild);
    }
    this.allNews = [];
  }  
}