import { cart, RemoveFromCart, CartitemsNumber} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

let cartSuammaryHTML = '';
cart.forEach( cartItem => {
    const cartItemId = cartItem.productId;
    let matchingProduct;
    products.forEach(product => {
        if(product.id === cartItemId)
        {
            matchingProduct = product;
        }
    });
    const itemDeliveryOption = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id === itemDeliveryOption)
      {
        deliveryOption = option;
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');
    

    cartSuammaryHTML +=  `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity update-link-${matchingProduct.id}" 
                   data-product-id ="${matchingProduct.id}">
                    Update
                  </span>
                   <input class="quantity-input  js-quantity-input-${matchingProduct.id}">
                   <span class="save-quantity-link link-primary js-save-quantity" 
                   data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-product-id ="${matchingProduct.id}"">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
});

const itemsListContainer = document.querySelector('.js-order-summary');
itemsListContainer.innerHTML = cartSuammaryHTML;

const deleteLinks = document.querySelectorAll('.js-delete-quantity-link'); 
deleteLinks.forEach(link => {
    link.addEventListener('click',()=>{
        const {productId} = link.dataset;
        RemoveFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    })
});


CartitemsNumber();

function deliveryOptionsHtml(matchingProduct, cartItem)
{
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' :
     `$${formatCurrency(deliveryOption.priceCents)} - `;
     const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
           
            <div class="delivery-option">
              <input
                type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
              />
              <div>
                <div class="delivery-option-date">${dateString}</div>
                <div class="delivery-option-price">${priceString} Shipping</div>
              </div>
              </div>
          `
  });
  return html;
}





















const quantityLabel = document.querySelector('.quantity-label');
const updateBtns = document.querySelectorAll('.js-update-quantity');

updateBtns.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add('is-editing-quantity');
    link.classList.add('update-quantity-remove');
    quantityLabel.classList.add('update-quantity-remove');
  });
  });


const saveBtnsList = document.querySelectorAll('.js-save-quantity');
saveBtnsList.forEach((saveBtn) => {
  saveBtn.addEventListener('click', ()=>{
    const productId = saveBtn.dataset.productId;
    const itemInputPlace = document.querySelector(`.js-quantity-input-${productId}`)
    cart.forEach((cartItem)=>{
      const QuantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const QuantityInputValue =Number(QuantityInput.value);
      const itemUpdateLink = document.querySelector(`.update-link-${productId}`);
      if(cartItem.productId === productId)
      {
        cartItem.quantity = QuantityInputValue;
        quantityLabel.innerHTML = QuantityInputValue;
        quantityLabel.classList.remove('update-quantity-remove');
        itemUpdateLink.classList.remove('update-quantity-remove');
        saveBtn.classList.add('update-quantity-remove');
 
      }
    });

  });

});


