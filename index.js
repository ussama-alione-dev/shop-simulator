const prompt = require("prompt-sync")();

let produits = [];

let panier = [];

const afficherProduits = () => {
  console.table(produits);
};

const ajouterAuPanier = () => {
  const id = prompt("entrer id du produit: ");

  const produit = produits.find((prod) => prod.productId === id);

  if (!produit) {
    console.log("ce produit n'existe pas !");
    return;
  }
  const quantity = Number(
    prompt("Indique la quantité que tu veux de ce produit ")
  );

  if (produit.quantity < quantity) {
    console.log("Ce produit n'a plus la quantité que tu souhaites");
    return;
  }

  panier.push({
    productId: produit.productId,
    quantity,
    price: produit.price,
  });
};

const afficherPanier = () => {
  console.table(panier);
};

const suprimmerDuPanier = () => {
  const id = prompt("entrer id du produit : ");

  const produit = produits.find((prod) => prod.productId === id);
  if (!produit) {
    console.log("ce produit n'existe pas !");
  } else {
    panier = panier.filter((prod) => prod.productId !== id);
  }
};

const passerCommande = () => {
  for (let ndx = 0; ndx < produits.length; ndx++) {
    for (let j = 0; j < panier.length; j++) {
      if (produits[ndx].productId === panier[j].productId) {
        console.log(produits[ndx]);
        produits[ndx].quantity -= panier[ndx].quantity;
      }
    }
  }

  const total = panier.reduce((acc, curr) => acc + curr.price, 0);
  console.log(total);
  const totalWithTva = total + total * 0.2;

  console.log(`
      --- --- --- --- recu ! --- --- --- ---
      |                                       
      |    total HT : ${total} $    
      |--------------------------------------          
      |    tva (20%) : ${total * 0.2} $      
      |-------------------------------------- 
      |    total TTC : ${totalWithTva} $     
      |-------------------------------------- 
      |    Merci pour votre achat !           
      |                                       
      --- --- --- --- --- --- --- --- --- ---
      `);
  panier = [];
};

const ajouterProduit = () => {
  const name = prompt("entrer le nom dy produit : ");
  const quantity = Number(prompt("entrer la  quantity du produit : "));
  const price = Number(prompt("entrer le prix du produits : "));

  if (!name || quantity <= 0 || price <= 0) {
    console.log("Les champs doivent être valides ");
  } else {
    produits.push({ name, quantity, price, productId: crypto.randomUUID() });
  }
};

const menu1 = `
<<<<<<<<<<<< 🔒 >>>>>>>>>>>>>
    admin : entrer "admin"
    user  : entrer "user"

    entrer 0 pour quitter !
`;
const menu2 = `
<<<<<<<<<<<< 🛒 >>>>>>>>>>>>>


  * Opérations sur les livres :
    1  ○ afficherProduits 
    2  ○ ajouterAuPanier
    3  ○ afficherPanier
    4  ○ supprimerDuPanier
    5  ○ passerCommande

  0 -> quitter 
`;

while (true) {
  console.log(menu1);
  const role = prompt("entrer votre role ! ( user | admin ) : ");
  if (role == 0) break;
  if (role === "admin") {
    ajouterProduit();
  }

  if (role === "user") {
    while (true) {
      console.log(menu2);
      const operation = Number(prompt("choisi une operation !"));
      if (operation === 0) {
        break;
      }
      switch (operation) {
        case 1:
          afficherProduits();
          break;
        case 2:
          ajouterAuPanier();
          break;
        case 3:
          afficherPanier();
          break;
        case 4:
          suprimmerDuPanier();
          break;
        case 5:
          passerCommande();
          break;
        default:
          console.log("operation non valide !");
          break;
      }
    }
  }
}
