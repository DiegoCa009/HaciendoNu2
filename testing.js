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
                                    
        
                                }),this)">
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