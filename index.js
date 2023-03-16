import './controllers/input-search.js';
import './controllers/slider-animation.js';

let indexInfo = document.querySelector('.index-info-search');
let li = document.querySelectorAll('li');
const heart_animation = document.getElementById('container');
console.log(heart_animation.childNodes[1].childNodes[1].childNodes);


li[0].addEventListener('click',()=>{
    indexInfo.scrollIntoView({behavior: "smooth"})
    
});


window.addFavorites = (data)=>{
    console.log(JSON.parse(data));
}








