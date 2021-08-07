///Mise à jour du basketPreview
basketPreview();

//fetch de l'URL
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        addCards(data);
    })
    .catch((erreur) => console.log("erreur : " + erreur));

// fonction pour la création des cards de la page d'accueil
function addCards(data) {
    //boucle pour chaque iteration d'un produit
    for (produit of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById("liste");
        //convertit le prix
        const price = convertPrice(produit.price);
        card.innerHTML += `
        <div class="col mb-5">
        <div class="card h-100">
            <!-- Product image-->
            <a href="produit.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${produit.name}</h5>
                    <!-- Product price-->
                    <span>${price}</span>
                    
                </div>
                <p class="card-text text-truncate">${produit.description}</p>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"id="btnAddBasket"><a class="btn btn-outline-dark mt-auto" href="produit.html?_id=${produit._id}">Acheter ce produit</a></div>
            </div>
        </div>
    </div>`;
}
}