document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".shop-item .items");
    const shopEmptySection = document.querySelector(".shop-empty");
    const totalSection = document.querySelector(".total");
  
    // دالة لعرض عناصر الكارت
    function displayCartItems() {
      const cartItems = JSON.parse(localStorage.getItem("myCards")) || []; // استرجاع البيانات من LocalStorage
      cartItemsContainer.innerHTML = ""; // مسح محتوى الكارت
  
      if (cartItems.length === 0) {
        shopEmptySection.style.display = "flex"; // إظهار رسالة الكارت الفارغ
        cartItemsContainer.style.display = "none"; // إخفاء محتويات الكارت
        totalSection.style.display = "none"; // إخفاء قسم الإجمالي
        return;
      } else {
        shopEmptySection.style.display = "none"; // إخفاء رسالة الكارت الفارغ
        cartItemsContainer.style.display = "block"; // إظهار محتويات الكارت
        totalSection.style.display = "block"; // إظهار قسم الإجمالي
      }
  
      let total = 0; // إجمالي السعر
  
      cartItems.forEach((item) => {
        // إزالة "EG" من السعر وتحويله إلى عدد عشري
        let price = item.price;
        if (price && price.includes("EG")) {
          price = price.replace(" EG", "0").trim(); // إزالة "EG" من السعر
        }
  
        // تحويل السعر إلى عدد عشري
        price = parseFloat(price);
  
        // تحويل الكمية إلى عدد صحيح
        const quantity = parseInt(item.quantity);
  
        // التحقق من أن السعر والكمية صالحة
        // if (isNaN(price) || isNaN(quantity)) {
        //   console.error("Invalid price or quantity for item:", item);
        //   return; // لا تتابع العملية إذا كانت هناك قيم غير صحيحة
        // }
  
        total += price * quantity; // حساب إجمالي السعر
  
        const cartItem = document.createElement("div");
        cartItem.className = "item";
        cartItem.innerHTML = `
          <div class="image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="text">
            <h4>${item.title}</h4>
            <p>${item.price}</p>
            <div>
              <span>${item.pieces} Pieces</span>
              <span>${item.spicy_sauce === "true" ? "Spicy Sauce" : "No Sauce"}</span>
            </div>
          </div>
          <div class="icons">
            <i class="fa-solid fa-plus" data-id="${item.productId}"></i>
            <span>${item.quantity}</span>
            <i class="fa-solid fa-minus" data-id="${item.productId}"></i>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem); // إضافة العنصر إلى الكارت
      });
  
      // عرض الإجمالي
      const totalElement = document.querySelector(".total-txt h4:last-child");
      if (totalElement) {
        totalElement.textContent = `${total} EG`; // عرض الإجمالي في العنصر
      } else {
        console.error("Total element not found!"); // في حال عدم وجود العنصر
      }
    }
  
    displayCartItems(); // استدعاء الدالة عند تحميل الصفحة
  });
  