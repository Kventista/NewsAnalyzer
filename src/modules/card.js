export default class Card {
  constructor(newsItem) {
    this.Element = this.createElement(newsItem);
  }

  createElement(newsItem) {

    const newsCardLink = document.createElement('a');
    newsCardLink.classList.add('cards__item');
    newsCardLink.href  = newsItem.url;
  
    const cardResult = document.createElement('div');
    cardResult.classList.add('cards__result');
    newsCardLink.appendChild(cardResult);
  
    const cardResWrap = document.createElement('div');
    cardResWrap.classList.add('cards__result-wrap');
    cardResult.appendChild(cardResWrap);
    
    const img = document.createElement('img');
    img.src = newsItem.urlToImage;
    img.classList.add('cards__result-image');
    cardResWrap.appendChild(img);
  
    const cardResBox = document.createElement('div');
    cardResBox.classList.add('cards__result-box');
    cardResult.appendChild(cardResBox);
    
    const dateP = document.createElement('p');
    dateP.classList.add('cards__date');
    dateP.textContent = newsItem.publishedAt.split('T')[0].split("-").reverse().join(".");
    cardResBox.appendChild(dateP);

    const cardSubtitle = document.createElement('h3');
    cardSubtitle.classList.add('cards__subtitle');
    cardSubtitle.textContent = newsItem.title;
    cardResBox.appendChild(cardSubtitle);

    const descP = document.createElement('p');
    descP.classList.add('cards__description');
    descP.textContent = newsItem.description;
    cardResBox.appendChild(descP);

    const cardSrc = document.createElement('div');
    cardSrc.classList.add('cards__source');
    cardSrc.textContent = newsItem.source.name;
    cardResBox.appendChild(cardSrc);
    return newsCardLink;
  }
}
