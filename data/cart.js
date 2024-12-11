export const cart = [];

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
          quantity: Number(selectElement.value)
        });
      }
    }