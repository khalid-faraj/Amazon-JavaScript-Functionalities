export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart)
{
cart = [];
}

function SaveToStorage()
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function AddItemToCart(productId)
  {
    const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);

    let matchingItem;
    
    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId)
      {
        matchingItem = cartItem;
      }
    });

    if(matchingItem)
    {
      matchingItem.quantity += 1;
    }
    else{
        cart.push({
          productId,
          quantity: Number(selectElement.value),
          deliveryOptionId: '1'
        });
      }

      SaveToStorage();
  }

  export function RemoveFromCart(productId)
  {
      const newCart = [];
      cart.forEach(cartItem => {
        if(cartItem.productId !== productId)
          {
            newCart.push(cartItem);
          }
      });
      cart = newCart;
      CartitemsNumber();
      SaveToStorage();
  }


export function CartitemsNumber()
{
let zNumberOfItemsInCart = 0;
cart.forEach(item=> {
  zNumberOfItemsInCart += item.quantity;
});
const numberOfItems = document.querySelector('.js-cart-items');
numberOfItems.innerHTML = `${zNumberOfItemsInCart} Items`;
}


export function calculateCartQuantity()
{
  let quantityNumber = 0;
  cart.forEach((cartItem) => {
    quantityNumber += cartItem.quantity;
  })
   const ProductsQuantityNumber = document.querySelector(".js-cart-quantity");
   ProductsQuantityNumber.innerHTML = quantityNumber;
   return quantityNumber;
}

export function updateQuantity(productId, newQuantity)
{
 
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  
    SaveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId)
{
  let matchingItem;
    
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId)
    {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  SaveToStorage();
}