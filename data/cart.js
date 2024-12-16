export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart)
{
cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 1,
  deliveryOptionId: '1'
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'
}];
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
}
