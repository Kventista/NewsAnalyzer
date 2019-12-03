import "./index.css";
import NewsApi from '../../modules/newsApi';
import CardList from '../../modules/cardList';
import Card from '../../modules/card';
import Helper from '../../modules/helper';

const form = document.forms.search;
const loader = document.querySelector('.loader');
const nothing = document.querySelector('.nothing');
const cardBox = document.querySelector('.cards__box');
const moreButton = document.querySelector('.cards__button');
const cardsSection = document.querySelector('.cards');
const serverError = document.querySelector('.server-err');
const searchField = document.querySelector('.search__field');

const newsApiToken = 'b4311048808a4f1f9e06934c2bf1b51c';
const news = new NewsApi('https://newsapi.org/v2/everything?', newsApiToken);
const cardList = new CardList(cardBox);
const today = new Date();
const milisecondsInWeek = 60*60*24*7*1000;
const weekAgo = new Date(today.getTime()-milisecondsInWeek);
const resultsPerLine = 3;


function showNews(res) {
  Helper.showElements(cardsSection);
  Helper.showElementsGrid(cardBox);
  Helper.hideElements(nothing);
  cardList.clear();
  res.articles.forEach(article => {
    const story = new Card(article);
    cardList.allNews.push(story);
  });
  cardList.init();
  if (res.totalResults > resultsPerLine) {
    Helper.showElements(moreButton);
  }
}

if (localStorage.getItem('res') != null && JSON.parse(localStorage.getItem('res')).totalResults > 0)
{
  const res =  JSON.parse(localStorage.getItem('res'));
  showNews(res);
}

form.addEventListener('submit', (event)=> {
  event.preventDefault();
  Helper.showElementsFlex(loader);
  Helper.hideElements(nothing, cardsSection, moreButton, serverError);
  Helper.disableFields(searchField);
  cardList.clear();

  news.getCards(weekAgo.toISOString(), today.toISOString(), searchField.value)
      .then(res => {
        Helper.enableFields(searchField);
        Helper.hideElements(loader);
        localStorage.setItem('res', JSON.stringify(res));
        localStorage.setItem('request', searchField.value);
        if (res.totalResults > 0) {
          showNews(res);
        } else {
          Helper.showElementsFlex(nothing);
          Helper.hideElements(cardBox);
        }
      })
      .catch((err) => {
         console.log(err);
         Helper.enableFields(searchField);
         Helper.showElementsFlex(serverError);
         Helper.hideElements(nothing, cardsSection, moreButton, loader);
      });

});

moreButton.addEventListener('click', (event)=> {
  cardList.showNext();
  if (cardList.lastIndex >= cardList.allNews.length) {
    Helper.hideElements(moreButton);
  }
});