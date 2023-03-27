import './controllers/slider-animation.js';

let indexInfo = document.querySelector('.index-info-search');
let li = document.querySelectorAll('li');



li[0].addEventListener('click', () => {
    indexInfo.scrollIntoView({ behavior: "smooth" })

});

class Favorites {
    constructor() {
        this.favorites = [];

    }
    add(product) {
        if (!!this.favorites.find(obj => obj.id == product.id)) {
            this.remove(product);
            return
        }

        this.favorites.push(product);
        this._commit(this.favorites);
        this.controller.view.drawModalAdd(product.name, this.favorites.length, 'Agregado');
        
    }
    remove(product) {
        this.favorites = this.favorites.filter(obj => obj.id != product.id);
        this._commit(this.favorites);
        this.controller.view.drawModalAdd(product.name, this.favorites.length, 'Removido');
        
        

    }

    setController(controller) {
        this.controller = controller

    }

    _commit(obj) {
        localStorage.setItem('database', JSON.stringify(obj));
    }
    _localStorage(){
        
        let data = JSON.parse(localStorage.getItem('database'));
        this.favorites = data || [];
        console.log(data, this._localStorage.name);
    }

    exists(productID) {

        return !!this.favorites.find(obj => obj.id == productID)
    }







}




class FavoritesView {
    constructor() {
        this.search = document.querySelector('#search-btn');
        this.modal = document.querySelector('#modal-favorites');
        this.modal_product = document.querySelector('#modal-favorites #modal_center h4');
        this.modal_amount = document.querySelector('#modal-favorites #modal_center p');
        this._listeners();
    }
    fillHeart(id) {
        this.results = document.querySelectorAll('._image-container');
        this.results[id].childNodes[1].classList.toggle('add-heart');

    }
    emptyHeart(id) {
        this.results[id].childNodes[1].classList.toggle('add-heart');
    }
    drawResults(callback) {
        

        this.search.addEventListener('click', async () => {
            let arr = [];
            const container = document.querySelector('#container');
            container.innerHTML = "";
            const txt = document.querySelector('#search-txt').value.toLowerCase();


            const data = await fetch('../data/products.json')
                .then((data) => data.json())
                .then((data) => data.forEach((element, i) => {
                    if (!`${element.name}`.toLowerCase().includes(txt)) return

                    container.innerHTML += `
                <div class="container-results">
                        <div class="_image-container">
                            <img class="${callback(element.id) ? "add-heart" : ''}" src="./assets/images/icons/heart.png" alt="" onclick="favorites.add(JSON.stringify(
                                {
                                    name: '${element.name}', 
                                    id: '${element.id}',
                                    price: '${element.price}',
                                    description: '${element.description}',
                                    image: '${element.image}',
                                    
        
                                }),${i})">
                            <img src="${element.image}" alt="Image 1">  
                        </div>
                        <div class="_results-product-header">
                            <h1 class="product-title">${element.name}</h1>
                            <p class="product-description">${element.description}</p>
                        </div>
                        <div class="box-help--flex-row">
                            <p class="product-price">$${element.price} MXN</p>
                            <button>Comprar</button>
                        </div>
                        
                    </div>
                `
                }));


        })
    }

    drawModalAdd(name, amount, action){
        this.modal_product.innerHTML = `${action} <span class='highlight'>${name}</span>`;
        this.modal_amount.innerHTML  = `${amount} en Favoritos  <a href="">comprar</a>`
        

        this.modal.addEventListener('animationstart',(e)=>{
            switch (e.animationName) {
                // case 'pop':
                //     // this.modal.classList.remove('fade-out');
                //     break;
            }
        })

        this.modal.addEventListener('animationend',(e)=>{
            switch (e.animationName) {
                case 'appear':
                    this.modal.style.visibility = 'visible';   
                    this.modal.classList.add('fade-out');
                break;
                
                case 'fade-out':
                    this.modal.classList.remove('fade-out'); 
                    this.modal.classList.remove('appear'); 
                    this.modal.style.visibility = 'hidden';    
                break;
            
                default:
                    break;
            }
            
        })

      if (!this.modal.classList.contains('appear')) return this.modal.classList.add('appear');

    }

    _listeners(){ 
        this.modal.addEventListener('mouseover',(e)=>{
            e.target.style.animationPlayState = 'paused';
         })

         this.modal.addEventListener('mouseout',(e)=>{
            e.target.style.animationPlayState = 'running';
         }) 
    }
}


class FavoritesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.setController(this);
        this.model._localStorage();
        this.view.drawResults(this.linkToexists)
        
        
    }

    add(data, id) {
        const parse = JSON.parse(data);
        this.view.fillHeart(id);
        this.model.add(parse);
    }
    linkToexists = productID => this.model.exists(productID);

}

window.favorites = new FavoritesController(new Favorites, new FavoritesView);













