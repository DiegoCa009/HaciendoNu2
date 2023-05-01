import './controllers/slider-animation.js';
import { card_model, item } from './helpers/card-model.js';
import { Filter } from './views/results.js';
let indexInfo = document.querySelector('.index-info-search');
let li = document.querySelectorAll('li');
li[0].addEventListener('click', () => {
    indexInfo.scrollIntoView({ behavior: "smooth" })

});

class inventoryView{
    constructor(){
         this.items = document.querySelector('#__items-images');
         this.image_slider = document.querySelector('.image-slider')
    }
    DrawInventoryItems(favorites = []){
        this.items.innerHTML = ``;
        favorites.forEach((obj)=>{
            this.items.innerHTML += item(obj.image)
        })
    }
}

class Favorites {
    constructor() {
        this.favorites = [];
        this.dataBase;

    }
    add(product) {
        if (!!this.favorites.find(obj => obj.id == product.id)) {
            this.remove(product);
            return
        }

        const index = this.dataBase.findIndex(obj => obj.id == product.id)
        this.dataBase[index].favorite = true;
        this.favorites.push(this.dataBase[index]);
        this._commit();
        this.controller.view.inventory.DrawInventoryItems(this.favorites)
        this.controller.view.drawModalAdd(product.name, this.favorites.length, 'Agregado');

    }
    remove(product) {
        const index = this.favorites.findIndex(ob => ob.id === Number(product.id))
        this.favorites[index].favorite = false;
        this.favorites = this.favorites.filter(obj => obj.id != product.id);
        this._commit();
        this.controller.view.inventory.DrawInventoryItems(this.favorites)
        this.controller.view.drawModalAdd(product.name, this.favorites.length, 'Removido');

    }

    setController(controller) {
        this.controller = controller

    }

    _commit() {
        localStorage.setItem('database', JSON.stringify(this.dataBase));
    }




    async getData() {

        fetch('../data/products.json')
            .then((data) => data.json())
            .then((data) => {
                this.dataBase = data;
                this._modifyData();
                this.controller.view.searchListeners(this.dataBase);
            }
            )
            .catch(error => console.log(`${this.getData.name} => ${error}`))

    }
    _modifyData() {
        this.dataBase.forEach(obj => obj.favorite = false);
    }

    _localStorage() {

        if (!localStorage.getItem('database')) return this.getData()


        let data = JSON.parse(localStorage.getItem('database'));
        this.dataBase = data;
        this.dataBase.forEach(obj => {
            if (obj.favorite === true) this.favorites.push(obj)
        })
        this.controller.view.searchListeners(this.dataBase);
    }

}

class FavoritesView {
    constructor() {
        this.container = document.querySelector('#container');
        this.search = document.querySelector('#search-btn');
        this.filters = document.querySelectorAll('.index-info-search ._search-info-header ul li');
        this.modal = document.querySelector('#modal-favorites');
        this.modal_product = document.querySelector('#modal-favorites #modal_center h4');
        this.modal_amount = document.querySelector('#modal-favorites #modal_center p');
        this.filter = new Filter(this.container);
        this.inventory = new inventoryView();
    }
    fillHeart(element) {

        element.classList.toggle('add-heart');

    }

    searchListeners(data) {
        this.search.addEventListener('click', async () => {
            let arr = [];
            this.container.innerHTML = "";
            const txt = document.querySelector('#search-txt').value.toLowerCase();
            data.forEach((element) => {

                if (!element.name.toLowerCase().includes(txt.toLowerCase())) return
                container.innerHTML += card_model(element);
            })
        })
        
        this.filters.forEach(element =>{
            element.addEventListener('click',(e)=>{
                this.filter.perFavorites(data)
            })
        })
    }

    drawModalAdd(name, amount, action) {
        this.modal_product.innerHTML = `${action} <span class='highlight'>${name}</span>`;
        const modal_message = amount > 0 ?
            `${amount} en Favoritos  <a href="#">comprar</a>` :
            `<p>No tienes nada en tu lista :(</p>`
        this.modal_amount.innerHTML = modal_message;


        this.modal.addEventListener('animationstart', (e) => {
            switch (e.animationName) {
                case 'pop':

                    break;
            }
        })

        this.modal.addEventListener('animationend', (e) => {
            switch (e.animationName) {
                case 'appear':
                    this.modal.style.visibility = 'visible';
                    this.modal.style.animation = 'fade-out 0.2s ease-in 5s forwards';

                    break;

                case 'fade-out':
                    this.modal.style.visibility = 'hidden';
                    break;

                default:
                    break;
            }

        })


        const { animationName } = getComputedStyle(this.modal);

        if (animationName != 'appear') {
            this.modal.style.animation = 'appear 0.2s forwards';
            return
        }

    }

    // _listeners(){ 
    //     this.modal.addEventListener('mouseover',(e)=>{

    //         e.target.style.animationPlayState = 'paused';
    //      })

    //      this.modal.addEventListener('mouseout',(e)=>{
    //         e.target.style.animationPlayState = 'running';
    //      }) 
    // }
}



class FavoritesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.setController(this);
        this.model._localStorage();
    }

    add(data, element) {
        const parse = JSON.parse(data);
        this.view.fillHeart(element);
        this.model.add(parse);
    }


}

window.favorites = new FavoritesController(new Favorites, new FavoritesView);















