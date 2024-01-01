import { menuArray } from '/data.js'

const itemsContainer = document.querySelector('.items-container')
const preCheckoutState = document.querySelector('.pre-checkout-state')
const preCheckoutStateContainer = document.querySelector('.pre-checkout-state-container')
const cartTotalEl = document.querySelector('.cart-total')
const completeOrderBtn = document.querySelector('.complete-order-btn')

let cartTotal = 0
let html = ''

// render entire menu on screen 

function renderMenuItems() {
    for (let menuItem of menuArray) {
        html += 
        `<div class="item-container">
                <div class="item-graphic">${menuItem.emoji}</div>
                <div>
                    <p class="item-title">${menuItem.name}</p>
                    <p class="item-description">${menuItem.ingredients}</p>
                    <p class="item-price">$${menuItem.price}</p>
                </div>
                <div>
                    <button class="add-to-cart-btn" data-${menuItem.name.toLowerCase()}=${menuItem.id}>+</button>
                </div>
            </div>
            `  
    }
    itemsContainer.innerHTML = html
    
}

renderMenuItems();

// add event listener for each menu item

document.addEventListener('click', function(e) {
    if(e.target.dataset.pizza) {
        addToCart(e.target.dataset.pizza)
    } else if (e.target.dataset.hamburger) {
       addToCart(e.target.dataset.hamburger)
    } else if (e.target.dataset.beer) {
      addToCart(e.target.dataset.beer)  
    }
})

function addToCart(itemID) {
    for (let menuItem of menuArray) {
        if (menuItem.id === Number(itemID)) {
            preCheckoutState.innerHTML += `
            <div class="order-item-info-container">
                <p>${menuItem.name}
                    <span class="remove">
                        remove
                    </span>
                </p>
                <p>$${menuItem.price}</p>
            </div>`
            preCheckoutStateContainer
                .style.display = "inline-block"
            cartTotal += menuItem.price
            updateCartDisplay()
            
        } 
    } 
}

preCheckoutState.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove')) {
        const checkoutItem = e.target.closest('.order-item-info-container')
        const removedItemPrice = parseFloat(checkoutItem.querySelector('p:last-child').textContent.replace('$', ''));
        cartTotal -= removedItemPrice
        checkoutItem.remove()
        updateCartDisplay();
        if (cartTotal === 0) {
            preCheckoutStateContainer
                .style.display = "none" 
        }      
    }
})

function updateCartDisplay() {
    cartTotalEl.innerHTML = `
    <p class="cart-total">
        Total Price:
    </p>
    <p>
        $${cartTotal}
    </p>
    `
}


completeOrderBtn.addEventListener('click', function() {
    document.querySelector('.checkout-payment-module-container')
        .style.display = 'block'
})

document.querySelector('.pay-button').addEventListener('click', function(e) {
    e.preventDefault()
    document.querySelector('.checkout-payment-module-container')
        .style.display = 'none'
    preCheckoutStateContainer
        .style.display = "none" 
    document.querySelector('.confirmation-page')
        .style.display = 'block'
    const fullValue = document.querySelector('.name-field').value
    const nameParts = fullValue.split(' ');
    const firstName = nameParts[0];
    document.querySelector('.confirmation-page').innerHTML = `<p class="thank-you">Thanks, ${firstName}.  Your order is on its way!</p>`
})