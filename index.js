import './controllers/input-search.js';
import './controllers/slider-animation.js';

let indexInfo = document.querySelector('.index-info-search');
let li = document.querySelectorAll('li');

li[0].addEventListener('click',()=>{
    indexInfo.scrollIntoView({behavior: "smooth"})
    
});



