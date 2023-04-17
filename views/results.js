import { card_model } from "../helpers/card-model.js"

class Filter{
    constructor(container = HTMLElement){
        this.container = container;
    }
    perFilter(data,filter){
        this._clearContainer()
        data.forEach((element)=>{
            if(!element.tags.includes(filter)) return
            container.innerHTML += card_model(element)
        })
    }
    perFavorites(data){
        this._clearContainer()
        data.forEach((element)=>{
            if(!element.favorite === true) return
            container.innerHTML += card_model(element);
        })
    }
    _clearContainer(){
        this.container.innerHTML = ``
    }
}


export {Filter}


