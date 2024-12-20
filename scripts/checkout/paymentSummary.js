import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let TotalItemsPriceCents = 0;
    let shippingAndHandelingCents = 0;


    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        const totalProductPriceCents = product.priceCents * cartItem.quantity;
        TotalItemsPriceCents+=totalProductPriceCents;
        const cartItemDeliveryOption = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(cartItemDeliveryOption);
        let shippingPriceCents = deliveryOption.priceCents;
        shippingAndHandelingCents += Number(shippingPriceCents);
    });

    const TotalBeforeTaxCents = TotalItemsPriceCents + shippingAndHandelingCents;
    const EstimatedTaxCents = TotalBeforeTaxCents * 0.1;
    const OrderTotalCents = TotalBeforeTaxCents + EstimatedTaxCents;

    let CartItems = 0;
    cart.forEach(cartItem=> {
    CartItems += cartItem.quantity;
    });

    const paymentSummaryHtml = `
    <div class="payment-summary">
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${CartItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(TotalItemsPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingAndHandelingCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(TotalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(EstimatedTaxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(OrderTotalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;   

    const paymentSummarySection = document.querySelector('.js-payment-summary');
    paymentSummarySection.innerHTML= paymentSummaryHtml;
}