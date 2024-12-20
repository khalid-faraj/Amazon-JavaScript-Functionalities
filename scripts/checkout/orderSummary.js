import { cart, RemoveFromCart, CartitemsNumber, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary()
{
let cartSuammaryHTML = '';
cart.forEach( cartItem => {
    const cartItemId = cartItem.productId;
    const matchingProduct = getProduct(cartItemId);
    const itemDeliveryOption = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(itemDeliveryOption)
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
                  <span> Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> </span>
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
        renderPaymentSummary();
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
           
            <div class="delivery-option js-delivery-option" 
            data-product-id = "${matchingProduct.id}"
            data-delivery-option = "${deliveryOption.id}">
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
    link.classList.add('update-quantity-link');
    quantityLabel.classList.add('quantity-label');
  });
  });




function SaveLinkActions(productId)
{
  const quantityUserInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityUserInput.value);
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }
    const productUpdateLink = document.querySelector(`.update-link-${productId}`);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');
    updateQuantity(productId, newQuantity);
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;
    quantityLabel.classList.remove('quantity-label');
    productUpdateLink.classList.remove('update-quantity-link');
    CartitemsNumber()
}

const saveBtnsList = document.querySelectorAll('.js-save-quantity');
saveBtnsList.forEach((saveBtn) => {
  saveBtn.addEventListener('click', ()=>{
    const productId = saveBtn.dataset.productId;
    SaveLinkActions(productId);
    renderPaymentSummary();
  });
});


const deliveryOptionsList = document.querySelectorAll('.js-delivery-option');
deliveryOptionsList.forEach((option)=>{
  option.addEventListener('click', ()=>{
    const {productId,deliveryOption} = option.dataset;
    updateDeliveryOption(productId, deliveryOption);
    renderOrderSummary();
    renderPaymentSummary();
  })

});
};

