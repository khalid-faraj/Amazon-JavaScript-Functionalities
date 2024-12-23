import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { orders, addOrder } from "../../data/order.js";


export function renderPlaceOrderBtn(){
    const placeOrderBTN = 
    ` 
        <button class="place-order-button button-primary js-place-order-btn-checkout">
          Place your order
        </button>
    `;

document.querySelector('.place-order-btn').innerHTML = placeOrderBTN;
const placeOrderBtnCheckout = document.querySelector('.js-place-order-btn-checkout');
placeOrderBtnCheckout.addEventListener('click', async () =>
    {
      try{
     const response = await fetch('https://supersimplebackend.dev/orders', 
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({cart: cart})
        }
      )

      const order = await response.json();
      addOrder(order);
    }catch(error)
    {
      console.log('Unexpected error. please try again later.');
    }
    window.location.href = 'orders.html';
    });
}