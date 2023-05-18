import './controllers/slider-animation.js';
import { card_model, item, slider } from './helpers/card-model.js';
import { Filter } from './views/results.js';
let indexInfo = document.querySelector('.index-info-search');
let li = document.querySelectorAll('li');
li[0].addEventListener('click', () => {
    indexInfo.scrollIntoView({ behavior: "smooth" })
});

class inventoryView {
    constructor(mainView) {
        this.mainView = mainView;
        this.items = document.querySelector('#__items-images');
        this.image_slider = document.querySelector('.image-slider img');
        this.deleteProduct = document.querySelector('#delete-self');
        this.plusButton = document.querySelector('#plus-btn');
        this.substractButton = document.querySelector('#substract-btn');
        this.amount = document.querySelector('#amount-input');
        this.left_arrow = document.querySelector('#left-arrow');
        this.right_arrow = document.querySelector('#right-arrow');
        this.currentProductSelected;
        
        
        this._SlideByArrows();
    }

    DrawInventoryItems(favorites = []) {
        if (!favorites.length > 0) {
            this.items.innerHTML = ``;
            this.image_slider.src = './assets/images/empty-image.png';
            this.currentProductSelected = null;
        }

        else {
            this.items.innerHTML = ``;
            favorites.forEach((obj,index) => {    
                this.items.appendChild(item(obj, this, index));
            });
            this.itemCollection = document.querySelectorAll('.item');
            this.itemCollection[0].click();
        }

    };
    _SlideByArrows(){
        this.left_arrow.addEventListener('click', (e)=>{
            if (!this.currentProductSelected == null) return
            if ((this.currentProductSelected - 1) < 0 ){
                const selector = this.itemCollection.length - 1;
                this.itemCollection[selector].click();
            }
            else{
                const selector = this.currentProductSelected - 1 ;
                this.itemCollection[selector].click();
            }
        })
        this.right_arrow.addEventListener('click', (e)=>{
            if (!this.currentProductSelected == null) return
            if ((this.currentProductSelected + 1) > this.itemCollection.length - 1 ){
                this.itemCollection[0].click();
                
            }
            else{
                const selector = this.currentProductSelected + 1 ;
                this.itemCollection[selector].click();
                
            }
        })


    };

}
class Favorites {
    constructor() {
        this.favorites = [];
        this.dataBase;
    };
    add(product) {
        if (!!this.favorites.find(obj => obj.id == product.id)) {
            this.remove(product);
            return
        }

        const productResult = this.dataBase.find(obj => obj.id == product.id)
        productResult.favorite = true;
        this.favorites.push(productResult);
        this._commit();
        this.controller.view.inventory.DrawInventoryItems(this.favorites)
        this.controller.view.drawModalAdd(product.name, this.favorites.length, 'Agregado');

    };

    remove(product) {
        const productResult = this.dataBase.find(obj => obj.id == product.id)
        productResult.favorite = false;
        this.favorites = this.favorites.filter(obj => obj.id != product.id);
        productResult.amount = 1;
        this._commit();
        this.controller.view.inventory.DrawInventoryItems(this.favorites)
        this.controller.view.drawModalAdd(product.name, this.favorites.length, 'Removido');
    }

    quantityOfProducts(product,amount){
        const productResult = this.dataBase.find(obj => obj.id == product.id);
        productResult.amount = amount;
        this._commit();
    }

    resetViews(){

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
        this.dataBase.forEach(obj => obj.amount = 1);
    }

    _localStorage() {

        if (!localStorage.getItem('database')) return this.getData()


        let data = JSON.parse(localStorage.getItem('database'));
        this.dataBase = data;
        this.dataBase.forEach(obj => {
            if (obj.favorite === true) this.favorites.push(obj)
        })
        this.controller.view.searchListeners(this.dataBase);
        this.controller.view.inventory.DrawInventoryItems(this.favorites)

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
        this.filter = new Filter(this);
        this.inventory = new inventoryView(this);
    }
    fillHeart(element) {

        element.classList.toggle('add-heart');

    }

    searchListeners(data) {
        this.search.addEventListener('click', async () => {
            this.container.innerHTML = "";
            const txt = document.querySelector('#search-txt').value.toLowerCase();
            data.forEach((element) => {
                if (!element.name.toLowerCase().includes(txt.toLowerCase())) return
                this.container.appendChild(card_model(element, this.controller));

            });

        })

        this.filters.forEach(element => {
            element.addEventListener('click', (e) => {
                this.filter.perFavorites()
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
    setController(controller) {
        this.controller = controller;

    }
}



class FavoritesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.setController(this);
        this.model._localStorage();
        this.view.setController(this);
        this.view.filter.perFavorites()
    }

    add(productObject, element) {
        if (element) {
            this.view.fillHeart(element);
        }
        this.model.add(productObject)

    }


}

const favorites = new FavoritesController(new Favorites, new FavoritesView);















