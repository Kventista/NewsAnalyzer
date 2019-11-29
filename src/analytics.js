import "./css/analytics.css";


const title = document.querySelector('.analytics__title');
const monthlyNews = document.querySelector('.monthly');
const weeklyNews = document.querySelector('.weekly');
const resp = JSON.parse(localStorage.getItem('res'));
const req = localStorage.getItem('req');
const dates = document.querySelectorAll('.chart__grid-date');
const bars = document.querySelectorAll('.chart__grid-graph');

title.textContent = 'Вы спросили «' + req + '»';
monthlyNews.textContent = resp.articles.length;

let weeklyMentions = 0;
let dateMentions = {};
resp.articles.forEach(item => {
  weeklyMentions+=item.title.toLowerCase().split(req.toLowerCase()).length - 1;
  let totalMentions = item.title.toLowerCase().split(req.toLowerCase()).length - 1;
  if (item.description) {
    totalMentions += item.description.toLowerCase().split(req.toLowerCase()).length - 1;
  }
  let dateStr = item.publishedAt.split('T')[0];
  if (dateStr in dateMentions) {
    dateMentions[dateStr]+= totalMentions;
  }
  else {
    dateMentions[dateStr] = totalMentions;
  }
});
weeklyNews.textContent = weeklyMentions;

let sorted = [];
for (let key in dateMentions) {
  sorted[sorted.length] = key;
}
sorted.sort();

for (let i=0; i<7; i++) {
  dates[i].textContent = sorted[i];
  bars[i].textContent = dateMentions[sorted[i]];
  bars[i].style = 'width: '+ dateMentions[sorted[i]] + '%';
}



