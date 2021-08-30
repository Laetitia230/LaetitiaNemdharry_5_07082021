const orderForm = document.getElementById("orderForm");
const emptyBasket = document.getElementById("emptyBasket");
const quantity = document.getElementById("quantity");
const basket = JSON.parse(localStorage.getItem("teddies")) || [];
basketPreview();
// calcul du basketPreview
console.log(basket);
function basketPreview() {   
    if (basket.length == 0){      
    } else {
        let calculBasketPreview = 0;
        for (product of basket) {
            calculBasketPreview += product.quantity;   
            console.log(quantity);
     } 
        basketPreview.innerHTML += `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto">${calculBasketPreview}</span>`;
    }  
}
console.log(basketPreview);
// indique que le panier est vide
if (basket.length < 1) {
    orderForm.classList.add("d-none");
    // sinon affiche le tableau avec les produits
} else {
    orderForm.classList.add("d-none");
    emptyBasket.classList.add("container-fluid");
    const fullBasket = document.getElementById("basket");
    fullBasket.classList.toggle("d-none");
    for (product of basket) {
        displayProductListTable(product);
    }

    // ajouter produit
    function addProduct(event) {
        const index = event.target.getAttribute("data-index");
        basket[index].quantity++;
        console.log(quantity);
        localStorage.setItem("teddies", JSON.stringify(basket));
        location.reload();
        console.log(basket);
        
    }

    const buttonAdd = document.getElementsByClassName("plus");
    for (add of buttonAdd) {
        add.addEventListener("click", addProduct);
    }

    //supprimer un produit
    function minusProduct(event) {
        const index = event.target.getAttribute("data-index");
        if (basket[index].quantity > 1) {
            basket[index].quantity--;
        } else {
            basket.splice(index, 1);
        }
        localStorage.setItem("teddies", JSON.stringify(basket));
        location.reload();
    }

    const buttonMinus = document.getElementsByClassName("minus");
    for (minus of buttonMinus) {
        minus.addEventListener("click", minusProduct);
    }

    //affiche le prix total
    totalPrice();

    //affiche le formulaire et cache les boutons valider/supprimer panier
    const validationBasket = document.getElementById("validationBasket");
    const cacheButton = document.getElementById("cacheButton");
    validationBasket.addEventListener("click", () => {
        orderForm.classList.toggle("d-none");
        cacheButton.classList.add("d-none");
    });

    //vide le panier
    const buttonClearBASKET = document.getElementById("clearBasket");
    buttonClearBASKET.addEventListener("click", () => {
        clearBasket();
        location.reload();
    });

    //validation du formulaire et envoie en POST
    const order = document.getElementById("order");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    const checkBox = document.getElementById("invalidCheck2");

    order.addEventListener("click", (event) => {
        // on prépare les infos pour l'envoie en POST
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };
        // on valide que le formulaire soit correctement rempli
        if (
            (regexMail.test(contact.email) == true) &
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true) &
            (checkBox.checked == true)
        ) {
            event.preventDefault();
            // on envoie en POST
            fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contact, products }),
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("order", JSON.stringify(data));
                    document.location.href = "order.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        } else {
            alert(
                "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
            );
        }
    });
}