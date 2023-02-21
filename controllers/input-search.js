const search = document.querySelector('#search-btn');

search.addEventListener('click', async()=>{
    let arr = [];
    const container = document.querySelector('.container');
    container.innerHTML = "";
    const txt = document.querySelector('#search-txt').value;
     

    const data = await fetch('../data/products.json')
    .then((data) => data.json())
    .then((data) => data.forEach((element, i)=>{
        if (!`${element.name}`.toLowerCase().includes(txt)) return 
        
        container.innerHTML += `
        <div class="container-results">
                <div class="_image-container">
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

   console.log(arr);
})
