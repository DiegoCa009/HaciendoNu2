const card_model = (element,controller) => {
    const cardContent = document.createElement('div');
    cardContent.classList = 'container-results animate__animated animate__fadeIn';
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('_image-container');
    const heartIcon = document.createElement('img');
    heartIcon.onclick = (e)=>{
        controller.add(element,e.target);
    }
    heartIcon.classList = `${element.favorite ? "add-heart" : ''}`
    heartIcon.src = './assets/images/icons/heart.png'
    const productImage = document.createElement('img');
    productImage.src = element.image;
    productImage.alt = element.name;
    imageContainer.appendChild(heartIcon);
    imageContainer.appendChild(productImage);

    const productDescription = document.createElement('div');
    productDescription.classList.add('_results-product-header')
    const h1 = document.createElement('h1');
    h1.classList.add('product-title');
    h1.textContent = element.name;
    const p = document.createElement('p');
    p.classList.add('product-description');
    p.textContent = element.description;
    productDescription.appendChild(h1);
    productDescription.appendChild(p);

    const buyInformation = document.createElement('div');
    buyInformation.classList.add('box-help--flex-row');
    const textForBuy = document.createElement('p');
    textForBuy.classList.add('product-price');
    textForBuy.textContent = `${element.price} MXN`;
    const buyButton = document.createElement('button');
    buyButton.classList.add('buy-button');
    buyButton.textContent = 'Comprar';

    cardContent.appendChild(imageContainer);
    cardContent.appendChild(productDescription);
    cardContent.appendChild(buyInformation);

    return cardContent;
}

const item = (product,controller) => {
    
    const itemImage = document.createElement('img');
    itemImage.src = product.image;
    itemImage.classList.add('item');
    itemImage.onclick = (e) =>{
        controller.image_slider.src = product.image;
        controller.deleteProduct.onclick = ()=>{
            controller.mainView.controller.add(product);
            controller.mainView.filter.perFavorites();
        }
    }
    return itemImage;
    
}

const slider = (imageURL) => {
    return (`
        <img class="" src="${imageURL}" alt="">
    `)
}

export { card_model, item, slider };
