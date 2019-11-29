export default class CardList {
  constructor(cardsBox) {
      this.cardsBox = cardsBox;
      this.displayedData = [];
      this.allNews = [];
      this.lastIndex = 0;      
  }

  init () {
    this.lastIndex=0;
    for (let i = 0; i < Math.min(3, this.allNews.length); i++) { 
      this.cardsBox.appendChild(this.allNews[i].Element);
      this.lastIndex++;
    }
  }

  showNext(){
    let indexBefore = this.lastIndex;
    for (let i = this.lastIndex; i < Math.min(indexBefore+3, this.allNews.length, 100); i++) { 
      this.cardsBox.appendChild(this.allNews[i].Element);
      this.lastIndex++;
    }

  }

  clear(){
    while (this.cardsBox.firstChild) {
      this.cardsBox.removeChild(this.cardsBox.firstChild);
    }
    
    this.displayedData.forEach((item) => {
        item.delete();
    }
    );
    this.allNews = [];
  }  
}