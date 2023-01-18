// ITERATION 1

function updateSubtotal(products) {
  let productsArr = [...products];
  for (let i = 0; i < productsArr.length; i++) {
    let price = [...document.querySelectorAll(".price span")][i].innerText;

    if (price[0] === "$") {
      price = price.substring(1);
    }
    const quantity = [...document.querySelectorAll(".quantity input")][i].value;
    const subtotalElement = [...document.querySelectorAll(".subtotal span")][i];
    const subtotal = parseFloat(price * quantity).toFixed(2);  
    
    if (i > 0) {
      subtotalElement.innerHTML = "$" + subtotal;
    } else {
      subtotalElement.innerHTML = subtotal;
    }
  }
}

function calculateAll() {
  // ITERATION 1 & 2
  const productsInCart = document.querySelectorAll('.product');
  updateSubtotal(productsInCart);

  // ITERATION 3
  const totalValueElement = document.getElementById("total-value").querySelector("span");
  let totalValue = 0;
  productsInCartArr = [...productsInCart]

  for (let i = 0; i < productsInCartArr.length; i++) {
    if ([...document.querySelectorAll(".subtotal span")][i].innerText[0] === "$") {
      totalValue += parseInt(([...document.querySelectorAll(".subtotal span")][i].innerText).substring(1));
    } else {
      totalValue += parseInt([...document.querySelectorAll(".subtotal span")][i].innerText);
    }
  }

  totalValueElement.innerText = parseFloat(totalValue).toFixed(2);
  
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  const productParent = target.parentNode.parentNode;
  const cartParent = productParent.parentNode;

  cartParent.removeChild(productParent);

  calculateAll();
}

// ITERATION 5

function createProduct() {
  const footerInputs = [...document.querySelectorAll(".create-product input")]
  const productName = footerInputs[0].value;
  const productPrice = footerInputs[1].value;

  const manualProduct = [
    productName,
    productPrice,
    "",
    "0.00",
    "",
  ]
  
  if (productName === "") {
    alert("Please specify a product name!");
  } else if (productPrice === "") {
    alert("Please specify a product price!");
  } else {
    footerInputs[0].value = "";
    footerInputs[1].value = "0.00";
    addProduct(manualProduct);
  }
}

const embeddedProductObject = [
  "Ironhack Umbrella",
  "30.00", 
  `<input type="number" value="0" min="0" placeholder="Quantity" />`,
  "0.00",
  `<button class="btn btn-remove">${"Remove"}</button>`,
  // index 2 and 4 do not work as intended
]

function addUmbrella() {
  addProduct(embeddedProductObject);
}

function addProduct(product) {
  const newTr = document.getElementById("cart").querySelector("tbody").appendChild(document.createElement("tr"));
  newTr.setAttribute("class", "product");
  for (let i = 0; i < 5; i++) {
    const newTd = newTr.appendChild(document.createElement("td"))
    const newSpan = newTd.appendChild(document.createElement("span"));
    switch (i) {
      case 0:
        newTd.setAttribute("class", "name");
        newSpan.innerText = product[i];
        break;
      case 1:
        newTd.setAttribute("class", "price");
        newSpan.innerText = "$" + product[i];
        break;
      case 2:
        newTd.setAttribute("class", "quantity");
        const newInput = newTd.appendChild(document.createElement("INPUT"));
        newInput.setAttribute("type", "number");
        newInput.setAttribute("value", "0");
        newInput.setAttribute("min", "0");
        newInput.setAttribute("placeholder", "Quantity");
        break;
      case 3:
        newTd.setAttribute("class", "subtotal");
        newSpan.innerText = "$" + product[i];
        break;
      case 4:
        newTd.setAttribute("class", "action");
        const newButton = newTd.appendChild(document.createElement("BUTTON"));
        newButton.setAttribute("class", "btn btn-remove");
        newButton.innerText = "Remove";
    }
  }
  addRemoveButtonEvent()
}

function addRemoveButtonEvent() {
  const removeBtn = document.querySelectorAll(".btn.btn-remove");
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener("click", removeProduct)
  }

}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  const addProductBtn = document.getElementById("add-umbrella");
  addProductBtn.addEventListener("click", addUmbrella);
  const createProductBtn = document.getElementById("create");
  createProductBtn.addEventListener("click", createProduct);
  
  addRemoveButtonEvent();
});