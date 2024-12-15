import { cart, AddItemToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
const productContent = document.querySelector('.products-grid'); 
products.forEach((product)=>{
   productContent.innerHTML += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-${product.id}-added">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
   ` 
})


const Add2CartButtons = document.querySelectorAll(".js-add-to-cart");
Add2CartButtons.forEach((button)=> {
  let timeoutID;
  button.addEventListener("click", ()=>{
    const {productId} = button.dataset;
    AddItemToCart(productId); // Update cart array.
    calculateCartQuantity();   //Update Cart element in amazon.html.
    //Added Item to Cart Apperance.
    const AddedMsg = document.querySelector(`.js-${productId}-added`);
    AddedMsg.classList.add('addedMsgOpacity');
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
    AddedMsg.classList.remove('addedMsgOpacity');
  }, 2000);
  })
});

window.addEventListener('DOMContentLoaded',()=>{ calculateCartQuantity();});



