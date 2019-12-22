import "./about-project.css";
import "../../vendor/flickity.css";
import GitApi from '../../modules/gitApi';
import Helper from '../../modules/helper';

const Flickity = require('flickity');
const flkty = new Flickity('.flickity', {
    cellAlign: 'left',
    contain: true,
    freeScroll: true,
    wrapAround: true,
    setGallerySize: false,
    
});
const gitApi = new GitApi('https://api.github.com/repos/Kventista/NewsAnalyzer/commits');
const serverError = document.querySelector('.server-err');
const section = document.querySelector('.history');
const loader = document.querySelector('.loader');

function makeCommitCell(item) {
  const carousel = document.createElement('div');
  carousel.classList.add('carousel');
 
  const cell = document.createElement('div');
  cell.classList.add('carousel-cell');
  carousel.appendChild(cell);

  const cellBox = document.createElement('div');
  cellBox.classList.add('carousel-cell__box');
  cell.appendChild(cellBox);

  const dateP = document.createElement('p');
  dateP.textContent = item.commit.committer.date.split('T')[0].split("-").reverse().join(".");
  cellBox.appendChild(dateP);

  const cellInfo = document.createElement('div');
  cellInfo.classList.add('carousel-cell__info');
  cellBox.appendChild(cellInfo);

  const avatar = document.createElement('img');
  avatar.src = item.committer.avatar_url;
  avatar.classList.add('carousel-cell__avatar');
  cellInfo.appendChild(avatar);

  const cellUser = document.createElement('div');
  cellUser.classList.add('carousel-cell__user');
  cellInfo.appendChild(cellUser);

  const userText = document.createElement('h2');
  userText.classList.add('carousel-cell__title');
  userText.textContent = item.committer.login;
  cellUser.appendChild(userText);

  const mailText = document.createElement('p');
  mailText.classList.add('carousel-cell__mail');
  mailText.textContent = item.commit.committer.email;
  cellUser.appendChild(mailText);

  const cellText = document.createElement('p');
  cellText.classList.add('carousel-cell__text');
  cellText.textContent = item.commit.message;
  cellBox.appendChild(cellText);
  return carousel;
}

Helper.showElementsFlex(loader);
Helper.hideElements(serverError);
gitApi.getCards()
        .then(res => {
          const cells = [];
          Helper.hideElements(loader);
          Helper.showElements(section);
          res.forEach(commit => {
            cells.push(makeCommitCell(commit));
          });
          flkty.append(cells);
        })      
        .catch((err) => {
          Helper.hideElements(section);
          Helper.showElementsFlex(serverError);
        });
