const Clickbutton = document.querySelectorAll(`.button`)
// Definición de variables
let cart = []
const tbody = document.querySelector('.tbody')

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCartItem)
})

function addToCartItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemName = item.querySelector('.card-title').textContent
    const itemPrice = item.querySelector('.precio').textContent
    const itemImg = item.querySelector('.card-img-top').src

    const newItem = {
        name: itemName,
        price: itemPrice,
        img: itemImg,
        quantity: 1
    }

    addItemToCart(newItem)
}

function addItemToCart(newItem) {
    const alert = document.querySelector('.alert')
    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElement = tbody.getElementsByClassName('input__element')

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name.trim() === newItem.name.trim()) {
            cart[i].quantity++
            const inputValue = InputElement[i]
            inputValue.value++
            CartTotal()
            return null;
        }
    }

    cart.push(newItem)

    renderCart()
}


function renderCart() {
    tbody.innterHTML = ''
    cart.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemToCart')
        const Content = `
        <th scope="row">1</th>
            <td class="table__products">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.name}</h6>
            </td>
            <td class="table__price"><p>${item.price}</p></td>
            <td class="table__quantity">
              <input type="number" min="1" value=${item.quantity} class="input__element">
              <button class="delete btn btn-danger">x</button>
            </td>
            `

        tr.innerHTML = Content
        tbody.append(tr)

        tr.querySelector('.delete').addEventListener('click', removeItemToCart)
        tr.querySelector('.input__element').addEventListener('change', addAmount)
    })
    CartTotal()
}

function CartTotal() {
    let Total = 0
    const itemCartTotal = document.querySelector('.itemCartTotal')
    cart.forEach((item) => {
        const price = Number(item.price.replace('$', ''))
        Total = Total + price * item.quantity
    })
    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemToCart(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest('.ItemToCart')
    const name = tr.querySelector('.title').textContent
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name.trim() === name.trim()) {
            cart.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')
    setTimeout(function () {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    CartTotal()
}

function addAmount(e) {
    const addInput = e.target
    const tr = addInput.closest('.ItemToCart')
    const name = tr.querySelector('.title').textContent
    cart.forEach(item => {
        if (item.name.trim() === name) {
            addInput.value < 1 ? (addInput.value = 1) : addInput.value
            item.quantity = addInput.value
            CartTotal()
        }
    })
}

function addLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('cart'))
    if (storage) {
        cart = storage
        renderCart()
    }
}