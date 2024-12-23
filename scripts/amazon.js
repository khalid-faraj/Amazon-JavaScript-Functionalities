import { cart, AddItemToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(randerProductsGrid);

function randerProductsGrid(){
const url = new URL(window.location.href);
const search = url.searchParams.get('search');

let filteredProducts = products;

// If a search exists in the URL parameters,
// filter the products that match the search.
if (search) {
  filteredProducts = products.filter((product) => {
    return product.name.includes(search);
  });
}  
const productContent = document.querySelector('.products-grid'); 
filteredProducts.forEach((product)=>{
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
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           ${product.getPrice()}
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
          ${product.extraInfoHTML()}
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
    calculateCartQuantity();

    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
};
