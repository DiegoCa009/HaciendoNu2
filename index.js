import './controllers/input-search.js';
import './controllers/slider-animation.js';

let indexInfo = document.querySelector('.index-info-search');
let li = document.querySelectorAll('li');



li[0].addEventListener('click',()=>{
    indexInfo.scrollIntoView({behavior: "smooth"})
    
});

class FavoritesList{
    constructor(){
        this.favorites = [];   
        console.log(this.FavoritesList)
    }
    addProduct(product){
        
        this.favorites.push(product)
        console.log(this.favorites);
    }
}

const a = new FavoritesList();

window.addFavorites = (data)=>{
    a.addProduct(JSON.parse(data));
}







