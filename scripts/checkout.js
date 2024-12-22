import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
//import '../data/cart-class.js';
//import '../backend/backend-practice.js';

async function  loadPage() {
  try{
    await loadProductsFetch();
  }
  catch(error)
  {
    console.log('Unexpected error. please try again later.');
  }
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
/*
loadProductsFetch()
.then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
  */

/*loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});*/
