import "./css/index.css";
import NewsApi from './modules/newsApi';
import CardList from './modules/cardList';
import Card from './modules/card';
import Helper from './modules/helper';

const form = document.forms.search;
const loader = document.querySelector('.loader');
const nothing = document.querySelector('.nothing');
const cardBox = document.querySelector('.cards__box');
const moreButton = document.querySelector('.cards__button');
const cardsSection = document.querySelector('.cards');
const serverError = document.querySelector('.server-err');

const news = new NewsApi('https://newsapi.org/v2/everything?');
const cardList = new CardList(cardBox);
const helper = new Helper();
const today = new Date();
const weekAgo = new Date();

form.addEventListener('submit', (event)=> {
  event.preventDefault();
  helper.showElementsFlex(loader);
  helper.hideElements(nothing, cardsSection, moreButton, serverError);
  weekAgo.setDate(today.getDate() - 6);
  cardList.clear();
  news.getCards(weekAgo.toISOString(), today.toISOString(), event.target.elements['search-field'].value)
      .then(res => {
        helper.hideElements(loader);
        localStorage.setItem('res', JSON.stringify(res));
        localStorage.setItem('req', event.target.elements['search-field'].value);

        if (res.totalResults > 0) {
          helper.showElements(cardsSection);
          helper.showElementsGrid(cardBox);
          helper.hideElements(nothing);
          cardList.clear();
          res.articles.forEach(article => {
            let story = new Card(article);
            cardList.allNews.push(story);
          });
          cardList.init();
          if (res.totalResults > 3) {
            helper.showElements(moreButton);
          }
        } else {
            helper.showElementsFlex(nothing);
            helper.hideElements(cardBox);
        }
      })
      .catch((err) => {
        helper.showElementsFlex(serverError);
        helper.hideElements(nothing, cardsSection, moreButton, loader);
      });

});

moreButton.addEventListener('click', (event)=> {
  cardList.showNext();
  if (cardList.lastIndex >= cardList.allNews.length) {
    helper.hideElements(moreButton);
  }
});