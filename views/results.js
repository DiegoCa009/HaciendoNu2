import { card_model } from "../helpers/card-model.js"

class Filter{
    constructor(mainView){
        this.mainView = mainView;
        
    }
    perFavorites(){
       const data = this.mainView.controller.model.dataBase;
        this.mainView.container.innerHTML = "";
            data.forEach((element) => {
                if (!element.favorite) return
                this.mainView.container.appendChild(card_model(element,this.mainView.controller));
            });

            
    }
 
}


export {Filter}


