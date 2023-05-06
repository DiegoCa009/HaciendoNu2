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
                this.mainView.container.appendChild(card_model(element));
            });

            this.EventOverResults()
    }
   EventOverResults(){
        const {length} = this.mainView.container.children;
        const data = this.mainView.controller.model.dataBase;
        for(let i = 0; i < length;i++){
            this.mainView.container.children[i].firstElementChild.firstElementChild
                    .onclick = (e)=>{
                        this.mainView.controller.add(data[i],e.target);
                    }
        }
    }
 
}


export {Filter}


