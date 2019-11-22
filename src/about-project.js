import "./css/about-project.css";
import "./vendor/flickity.css"


const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';

let Flickity = require('flickity');
let flkty = new Flickity('.flickity', {
    // options
    cellAlign: 'left',
    contain: true,
    freeScroll: true,
    wrapAround: true
});