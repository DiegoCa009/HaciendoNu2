import './controllers/input-search.js';
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
            this.remove(product.id);
            return
        }

        this.favorites.push(product);
        this._commit(this.favorites);
        this.controller.linkTodrawModal(product.name, this.favorites.length);
        console.log(this.favorites)
    }
    remove(id) {
        this.favorites = this.favorites.filter(obj => obj.id != id);
        this._commit(this.favorites);
        console.log(this.favorites)

    }

    setController(controller) {
        this.controller = controller

    }

    _commit(obj) {
        localStorage.setItem('database', JSON.stringify(obj));
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

    drawModal(name, amount){
        this.modal_product.innerHTML = `${name} Agregado`;
        this.modal_amount.innerHTML  = `${amount} en Favoritos  <a href="">comprar</a>`
        this.modal.classList.add('faded');
        
    }
}


class FavoritesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.setController(this);
        this.view.drawResults(this.linkToexists)
        
    }

    add(data, id) {
        console.log(id);
        const parse = JSON.parse(data);
        this.view.fillHeart(id);
        this.model.add(parse);
    }
    linkToexists = productID => this.model.exists(productID);
    linkTodrawModal(name,amount) {this.view.drawModal(name,amount)};

}

window.favorites = new FavoritesController(new Favorites, new FavoritesView);













