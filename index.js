// const menu = document.querySelector(".menu")
// const list = document.querySelector("nav .nav__links ul")
// const products_sec = document.querySelector(".about-boxes")

// menu.addEventListener("click" , ()=>{
//     list.classList.toggle("toggle")

// })
// const BASE_URL= "http://localhost:3000"
// async function getAllProducts(){
//     const res = await fetch(`${BASE_URL}/products`)
//     const finalRes =await res.json()
//     // console.log(finalRes)
//     disPlayProducts(finalRes)
// }

// function disPlayProducts(products){
//     products.forEach(element => {
//         console.log(element.image)
//         products_sec.innerHTML += ` <div class="about-boxes-box">
//                 <div class="image">
//                     <div class="image-fav" onclick="addToFav()"><i class="fa-solid fa-heart"></i></div>
//                     <img src=${element.image} alt="">
//                 </div>
//                 <div class="price-rate">
//                     <span class="price">${element.price} </span>
//                     <span class="rate" ><i class="fa-solid fa-star"></i> ${element.rating}</span>
//                 </div>
//                 <div class="txt">
//                     <h3>${element.title}</h3>
//                     <span><i class="fa-solid fa-check"></i>${element.pieces} pieces</span>
//                     <span><i class="fa-solid fa-check"></i>Spicy Sauce ${element.spicy_sauce}</span>
//                 </div>
//                 <button class="btn">Add To Card</button>
//             </div> `
        
//     });

// }
// const image_fav_icon = document.querySelector('.image-fav');
// if (image_fav_icon) {
//   image_fav_icon.addEventListener('click', () => {
//     console.log('Favorite icon clicked!');
//   });
// } else {
//   console.error('Element with class "image-fav" not found');
// }
// function addToFav(){
//     image_fav_icon.classList.toggle("active")
//     console.log('add')
// }

// getAllProducts()
// image_fav_icon.addEventListener("click" , addToFav)
const menu = document.querySelector(".menu");
const list = document.querySelector("nav .nav__links ul");
const products_sec = document.querySelector(".about-boxes");
// const btnToCard = document.querySelector(".txt .btn")
// console.log(btnToCard)

menu.addEventListener("click", () => {
  list.classList.toggle("toggle");
});

const BASE_URL = "http://localhost:3000";

async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const finalRes = await res.json();
  disPlayProducts(finalRes);
}

function disPlayProducts(products) {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || []; // استرجاع المفضلة
  const savedCards = JSON.parse(localStorage.getItem("myCards")) || []; // استرجاع الكاردز

  products_sec.innerHTML = ""; 
  products.forEach((element) => {
    const isFavorite = savedFavorites.some(fav => fav.id === element.id); // التحقق إذا كان المنتج مفضلًا
    const isAdd = savedCards.some(add => add.id === element.id); // التحقق إذا كان المنتج في الكاردز

    const productBox = document.createElement("div");
    productBox.className = "about-boxes-box";
    productBox.innerHTML = `
      <div class="image">
        <div class="image-fav ${isFavorite ? "active" : ""}" data-id="${element.id}" data-title="${element.title}" data-price="${element.price}" data-image="${element.image}" data-rating="${element.rating}" data-pieces="${element.pieces}" data-spicy_sauce="${element.spicy_sauce}">
          <i class="fa-solid fa-heart"></i>
        </div>
        <img src="${element.image}" alt="">
      </div>
      <div class="price-rate">
        <span class="price">${element.price} </span>
        <span class="rate"><i class="fa-solid fa-star"></i> ${element.rating}</span>
      </div>
      <div class="txt">
        <h3>${element.title}</h3>
        <span><i class="fa-solid fa-check"></i>${element.pieces} pieces</span>
        <span><i class="fa-solid fa-check"></i>Spicy Sauce ${element.spicy_sauce}</span>
      </div>
      <button class="btn ${isAdd ? "active" : ""}" data-id="${element.id}" data-title="${element.title}" data-price="${element.price}" data-image="${element.image}" data-rating="${element.rating}" data-pieces="${element.pieces}" data-spicy_sauce="${element.spicy_sauce}">Add To Card</button>
    `;
    products_sec.appendChild(productBox);
  });
}

// Event Delegation for dynamically added card elements
products_sec.addEventListener('click', (event) => {
  if (event.target.closest('.btn')) {
    const btnAddToCard = event.target.closest(".btn");

    const id = btnAddToCard.dataset.id; // لاحظ استخدام id هنا
    const title = btnAddToCard.dataset.title;
    const price = btnAddToCard.dataset.price;
    const image = btnAddToCard.dataset.image;
    const rating = btnAddToCard.dataset.rating;
    const pieces = btnAddToCard.dataset.pieces;
    const spicy_sauce = btnAddToCard.dataset.spicy_sauce;

    // تحديث الكارد في localStorage
    upadteAddToCard({ id, title, price, image, rating, pieces, spicy_sauce }, btnAddToCard.classList.contains("active"));

    // تغيير حالة الزر
    btnAddToCard.classList.toggle('active');
  }
});

// Event Delegation for dynamically added fav elements
products_sec.addEventListener('click', (event) => {
  if (event.target.closest('.image-fav')) {
    const favIcon = event.target.closest('.image-fav');
    favIcon.classList.toggle('active');
    const id = favIcon.dataset.id; // لاحظ استخدام id هنا
    const title = favIcon.dataset.title;
    const price = favIcon.dataset.price;
    const image = favIcon.dataset.image;
    const rating = favIcon.dataset.rating;
    const pieces = favIcon.dataset.pieces;
    const spicy_sauce = favIcon.dataset.spicy_sauce;

    // تحديث المفضلة في localStorage
    updateFavorites({ id, title, price, image, rating, pieces, spicy_sauce }, favIcon.classList.contains("active"));
  }
});

// تحديث الكارد في localStorage
function upadteAddToCard(product, isAdd) {
  let myCards = JSON.parse(localStorage.getItem("myCards")) || [];

  if (isAdd) {
    myCards.push(product); // إضافة المنتج إلى الكارد
  } else {
    myCards = myCards.filter(add => add.id !== product.id); // إزالة المنتج من الكارد
  }

  localStorage.setItem("myCards", JSON.stringify(myCards)); // تحديث localStorage
  console.log("myCards Updated:", myCards);
}

// تحديث المفضلة في localStorage
function updateFavorites(product, isFavorite) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (isFavorite) {
    favorites.push(product); // إضافة المنتج إلى المفضلة
  } else {
    favorites = favorites.filter(fav => fav.id !== product.id); // إزالة المنتج من المفضلة
  }

  localStorage.setItem("favorites", JSON.stringify(favorites)); // تحديث localStorage
  console.log("Favorites Updated:", favorites);
}

getAllProducts();
