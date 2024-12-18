const menu = document.querySelector(".menu")
const list = document.querySelector("nav .nav__links ul")
const products_sec = document.querySelector(".about-boxes")
const shop_empty = document.querySelector('.shop-empty')

console.log(shop_empty)
menu.addEventListener("click" , ()=>{
    list.classList.toggle("toggle")

})
document.addEventListener('DOMContentLoaded', function () {
    const products_sec_fav = document.querySelector(".about-boxes");
    const shop_empty = document.querySelector('.shop-empty'); // العنصر الخاص بالرسالة الفارغة

    // دالة لعرض المنتجات المفضلة
    function displayFavoriteProducts() {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // إذا لم يكن هناك منتجات مفضلة، اعرض الرسالة
        if (savedFavorites.length === 0) {
            products_sec_fav.innerHTML = ''; // مسح المحتوى داخل "about-boxes"
            shop_empty.style.display = 'flex'; // إظهار قسم "shop-empty"
            return;
        }

        // إخفاء رسالة المفضلة فارغة إذا كانت هناك منتجات مفضلة
        shop_empty.style.display = 'none';

        // إضافة العناصر المفضلة إلى الصفحة
        products_sec_fav.innerHTML = ''; // مسح المحتوى الحالي قبل إضافة العناصر الجديدة
        savedFavorites.forEach((element) => {
            const productBox = document.createElement("div");
            productBox.className = "about-boxes-box";
            productBox.innerHTML = `
                <div class="image">
                    <!-- هنا تم تغيير الأيقونة إلى أيقونة سلة المهملات (remove) -->
                    <div class="image-fav remove-fav" data-id="${element.id}">
                        <i class="fa-solid fa-trash"></i>  <!-- سلة المهملات -->
                    </div>
                    <img src="${element.image}" alt="product image">
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
                <button class="btn">Add To Card</button>
            `;
            products_sec_fav.appendChild(productBox);
        });
    }

    // استدعاء الدالة لعرض المنتجات المفضلة عند تحميل الصفحة
    displayFavoriteProducts();

    // إضافة حدث عند النقر على الأيقونة لإزالة المنتج
    products_sec_fav.addEventListener('click', (event) => {
        const favIcon = event.target.closest('.image-fav'); // تأكد من أنك تلتقط الأيقونة بشكل صحيح
        if (favIcon) {
            const productId = favIcon.dataset.id;

            // إزالة المنتج من المفضلة في الـ localStorage
            removeFromFavorites(productId);

            // إزالة العنصر من الصفحة مباشرة
            favIcon.closest('.about-boxes-box').remove();

            // التحقق إذا كانت المفضلة فارغة بعد الحذف
            const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            if (savedFavorites.length === 0) {
                shop_empty.style.display = 'flex'; // إظهار الرسالة الفارغة
            }
        }
    });

    // دالة لإزالة المنتج من المفضلة وتحديث الـ localStorage
    function removeFromFavorites(productId) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // أولاً: إزالة المنتج من المصفوفة باستخدام الفلترة
        favorites = favorites.filter(fav => fav.id !== productId);

        // ثانياً: تحديث الـ localStorage بعد الحذف
        localStorage.setItem("favorites", JSON.stringify(favorites));

        console.log("Updated Favorites in localStorage:", favorites);
    }
});
