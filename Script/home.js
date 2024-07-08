let renderData = document.getElementById("renderdata");
let dynamicCount = document.querySelector(".dynamic-count");
const searchInputEl = document.getElementById("search-input");

let arr = localStorage.getItem("cartData")
  ? JSON.parse(localStorage.getItem("cartData"))
  : [];

// Update the cart count initially
dynamicCount.textContent = arr.length;
let allProducts = [];

async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProducts = data; // Store all products globally, share data ko globally store kar re hai allproducts me.
    console.log(allProducts);

    renderProducts(allProducts);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

function renderProducts(data) {
  renderData.innerHTML = ""; // Clear previous content
  data.forEach((product) => {
    let productMainDiv = document.createElement("div");
    productMainDiv.className = "box-main";

    let createImage = document.createElement("img");
    createImage.src = product.image;

    let createTitle = document.createElement("p");
    createTitle.textContent = `${product.title.slice(0, 30)}...`;
    createTitle.className = "addTitle"; // Add class to title


    let createDescription = document.createElement("p");
    createDescription.textContent = `${product.description.slice(0, 32)}...`;
    createDescription.className = "addDecription "; // Add class to description


    let createPrice = document.createElement("p");
    createPrice.textContent = `₹${product.price.toFixed(2)}`;
    createPrice.className = "addPrice"; // Add class to price

    let addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.className = "addButton"; // Add class to button

    addButton.addEventListener("click", () => {
      addToCart(product);
    });

    productMainDiv.append(createImage, createTitle, createDescription, createPrice, addButton);
    renderData.appendChild(productMainDiv);
  });
}

function addToCart(product) {
  const isItemExist = arr.find((item) => item.id === product.id);
  if (isItemExist) {
    alert("Product Already Added");
    window.location.href = "cart.html"
    return;
  }
  arr.push(product);
  localStorage.setItem("cartData", JSON.stringify(arr));
  alert("Product Added");
  dynamicCount.textContent = arr.length; // Update the cart count dynamically.
}

function filterProducts(searchText) {
  console.log("Search Text:", searchText);
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log("Filtered Products:", filteredProducts);
  renderProducts(filteredProducts);
}

// Use 'input' event instead of 'keyup' for real-time filtering
searchInputEl.addEventListener("input", (event) => {
  filterProducts(event.target.value.trim()); // Trim whitespace for accurate filtering
});


getData();


