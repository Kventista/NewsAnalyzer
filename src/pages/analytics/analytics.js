import "./analytics.css";
import Helper from '../../modules/helper';


const title = document.querySelector('.analytics__title');
const monthlyNews = document.querySelector('.monthly');
const weeklyNews = document.querySelector('.weekly');
const resp = JSON.parse(localStorage.getItem('res'));
const request = localStorage.getItem('request');
const dates = document.querySelectorAll('.chart__grid-date');
const bars = document.querySelectorAll('.chart__grid-column');
const analytics = document.querySelector('.analytics');
const chart = document.querySelector('.chart');
const errorMsg = document.querySelector('.server-err');

if (resp != null) {
  Helper.showElements(analytics, chart);
  Helper.hideElements(errorMsg);
  title.textContent = 'Вы спросили «' + request + '»';
  monthlyNews.textContent = resp.articles.length;

  let weeklyMentions = 0;
  let dateMentions = {};
  resp.articles.forEach(item => {
    let totalMentions = 0;
    if (item.title)
    {
      weeklyMentions += item.title.toLowerCase().split(request.toLowerCase()).length - 1;
      totalMentions +=item.title.toLowerCase().split(request.toLowerCase()).length - 1;
    }
    if (item.description) {
      totalMentions += item.description.toLowerCase().split(request.toLowerCase()).length - 1;
    }
    const dateStr = item.publishedAt.split('T')[0];
    if (dateStr in dateMentions) {
      dateMentions[dateStr]+= totalMentions;
    }
    else {
      dateMentions[dateStr] = totalMentions;
    }
  });
  weeklyNews.textContent = weeklyMentions;

  const sorted = [];
  for (const key in dateMentions) {
    sorted[sorted.length] = key;
  }
  sorted.sort();

  for (let i=0; i<7; i++) {
    dates[i].textContent = sorted[i];
    bars[i].textContent = dateMentions[sorted[i]];
    bars[i].style = 'width: '+ dateMentions[sorted[i]] + '%';
  }
}
else {
  Helper.hideElements(analytics, chart);
  Helper.showElements(errorMsg);
}


