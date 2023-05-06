const card_model = (element) => {
    const div = document.createElement('div');
    div.classList = 'container-results animate__animated animate__fadeIn';
    div.innerHTML = 
    `
                        <div class="_image-container">
                            <img class="${element.favorite ? "add-heart" : ''} heart-event" src="./assets/images/icons/heart.png" alt="">
                            <img src="${element.image}" alt="Image 1">  
                        </div>
                        <div class="_results-product-header">
                            <h1 class="product-title">${element.name}</h1>
                            <p class="product-description">${element.description}</p>
                        </div>
                        <div class="box-help--flex-row">
                            <p class="product-price">$${element.price} MXN</p>
                            <button class="buy-button">Comprar</button>
                        </div>           
                `
                return div;
}

const item = (imageURL) => {
    return (`
        <img class="item" src="${imageURL.image}" alt="">
    `)
}

const slider = (imageURL) => {
    return (`
        <img class="" src="${imageURL}" alt="">
    `)
}

export { card_model, item, slider };
