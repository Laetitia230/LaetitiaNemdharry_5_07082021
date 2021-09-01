//Mise à jour du basketPreview
basketPreview();
// récupération de l'id du produit
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("_id");

//modification de l'adresse d'appel à l'API
const newUrl = `http://localhost:3000/api/teddies/${newId}`;

fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        addCard(data);
        const btnAddBasket = document.getElementById("btnAddBasket");
btnAddBasket.addEventListener("click", (e) => {
    e.preventDefault();
    const list = document.getElementById("option");
    const quantity = document.getElementById("quantity");
    // création de la class produit
    class Product {
        constructor(id, name, description, price, option, imgurl) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.option = option;
            this.imgurl = imgurl;
        }
    }
    // créer un nouveau produit
    let objectProduct = new Product(
        newId,
        product.name,
        product.description,
        product.price,
        product.colors,
        product.imageUrl,
        product.quantity,
    );
    // vérifie s'il est déja présent
    // si oui, dejaPresent en true et sauvegarde sa place dans le localStorage
    let isAlreadyPresent = false;
    let indexModification;
    for (products of basket) {
        switch (products.id) {
            case objectProduct.id:
                isAlreadyPresent = true;
                indexModification = basket.indexOf(products);
        }
    }

    // si déjaPresent incrémente seulement la quantité
    addQuantity(product);
    if (isAlreadyPresent) {
        localStorage.getItem("teddies", JSON.stringify(quantity));
        basket[indexModification].quantity += basket[indexModification].quantity ;
        localStorage.setItem("teddies", JSON.stringify(basket));
        //console.log("TOTO",basket[indexModification].quantity);
        // si non, ajoute le produit au localStorage
    } else {
        basket.push(objectProduct);
        localStorage.setItem("teddies", JSON.stringify(basket));
    }

});
    });
// fonction pour la création de la card de la page produit
function addCard(product) {
    // insertion des information de la card du produit
    const selectionProductImage = document.getElementById("productImage");
    selectionProductImage.innerHTML += `
      <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">
      `;
    const selectionProductName = document.getElementById("productName");
    selectionProductName.innerHTML += `
      <h1 class="display-5 fw-bolder">${product.name}</h1>
      `;
    const selectionProductPrice = document.getElementById("productPrice");
    selectionProductPrice.innerHTML += `
       <span>${convertPrice(product.price)}</span>
      `;
    const selectionProductDescription = document.getElementById("productDescription");
    selectionProductDescription.innerHTML += `
      <p class="lead">${product.description}</p>
      `;
    const selectionProductQuantity = document.getElementById("quantity");
    selectionProductQuantity.innerHTML += `
      <p class="lead">${product.quantity}</p>
      `;
    addColors(product);
}
function addColors(product) {
    const versionChoice = document.getElementById("option");
    for (let colors of product.colors) {
        versionChoice.innerHTML += `<option value="${colors}">${colors}</option>`;
    }
    document.getElementById('option').addEventListener('change', function() {
        console.log('You selected: ', this.value);
      });
console.log(product);

}
function addQuantity(product) {
    const versionChoice = document.getElementById("quantity");
    const quantities = [1, 2, 3, 4, 5];
   
    for (let quantity of quantities) {
        versionChoice.innerHTML += `<option value="${quantity}">${quantity}</option>`;
    }
    document.getElementById('quantity').addEventListener('change', function() {
        versionChoice.value = this.value;
        console.log('You selected: ', this.value);
      });   
    console.log(versionChoice.value);
    localStorage.setItem("teddies", JSON.stringify(quantity));
    console.log(product);
}


