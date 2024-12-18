const menu = document.querySelector(".menu")
const list = document.querySelector("nav .nav__links ul")
const products_sec = document.querySelector(".about-boxes")
const categories_sec = document.querySelector(".shop-circles")

menu.addEventListener("click" , ()=>{
    list.classList.toggle("toggle")

})
const BASE_URL= "http://localhost:3000"
async function getAllProducts(){
    const res = await fetch(`${BASE_URL}/products`)
    const finalRes =await res.json()
    // console.log(finalRes)
    disPlayProducts(finalRes)
}
async function getAllCategories() {
    const res = await fetch(`${BASE_URL}/categories`)
    const finalRes = await res.json()
    console.log(finalRes)
    disPlayCategories(finalRes)
    
}

function disPlayCategories(categories){
    categories.forEach(element=>{
        categories_sec.innerHTML += `<div class="shop-circles-circle">
                <div class="image">
                    <img src=${element.image} alt="">
                </div>
                <h3>${element.title}</h3>
            </div>`
    })
}
function disPlayProducts(products){
    products.forEach(element => {
        // console.log(element.image)
        products_sec.innerHTML += ` <div class="about-boxes-box">
                <div class="image">
                    <img src=${element.image} alt="">
                </div>
                <div class="price-rate">
                    <span class="price">${element.price} </span>
                    <span class="rate" ><i class="fa-solid fa-star"></i> ${element.rating}</span>
                </div>
                <div class="txt">
                    <h3>${element.title}</h3>
                    <span><i class="fa-solid fa-check"></i>${element.pieces} pieces</span>
                    <span><i class="fa-solid fa-check"></i>Spicy Sauce ${element.spicy_sauce}</span>
                </div>
                <button class="btn">Add To Card</button>
            </div> `
        
    });

}
getAllProducts()
getAllCategories()
