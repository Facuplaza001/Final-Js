document.querySelector(".menu").addEventListener("click", animateBars);

let linea1 = document.querySelector(".linea1");
let linea2 = document.querySelector(".linea2");
let linea3 = document.querySelector(".linea3");

function animateBars() {
  linea1.classList.toggle("activa-linea1");
  linea2.classList.toggle("activa-linea2");
  linea3.classList.toggle("activa-linea3");
}

const iconoMenu = document.querySelector("#iconoMenu"),
  menu = document.querySelector("#menuActive");

iconoMenu.addEventListener("click", (e) => {
  menu.classList.toggle("active-menu");
});

const shopContent = document.querySelector(".productos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderProduct = (product) => {
  const { img, nombre, cantidad, precio } = product;

  return `
    <div class="card">
      <img src="${img}" class="img">
      <h2 class="texto-descript">${nombre}</h2>
      <p>Cantidad: ${cantidad}</p>
      <p>Precio: $${precio}</p>
      <button class="comprar">Agregar al carrito</button>
    </div>
  `;
};

const renderProducts = (category = undefined) => {
  if (!category) {
    renderPopularProducts();
    return;
  }
  renderFilteredProducts(category);
};

const renderPopularProducts = () => {
  shopContent.innerHTML += mostPopularProducts().map(renderProduct).join("");
};

//renderizar productos filtrados
const renderFilteredProducts = (category) => {
  const productsList = products.filter(
    (product) => product.category === category
  );
  shopContent.innerHTML = productsList.map(renderProduct).join("");
};

//Filtros
const categoriesList = document.querySelectorAll(".marcas");

let selectedCategory = null;
const changeFilterState = (e) => {
  const category = e.target.dataset.category;

  if (selectedCategory === category) {
    window.location.reload();
    selectedCategory = null; // Si la categoría seleccionada es la misma, la desactivamos
  } else {
    selectedCategory = category; // Establecemos la nueva categoría seleccionada
  }

  changeBtnActiveState(selectedCategory);
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];

  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("activados");
      return;
    }
    categoryBtn.classList.add("activados");
  });
};

const applyFilter = (e) => {
  console.log(e.target.dataset);
  if (!e.target.matches(".marcas, .card__name")) return;
  changeFilterState(e);

  if (!e.target.dataset.category) {
    shopContent.innerHTML = "";
    console.log(e.target.dataset);
    renderProducts();
  } else {
    renderProducts(e.target.dataset.category);
    console.log(e.target.dataset);
  }
  if (shopContent.innerHTML == "") {
    shopContent.innerHTML = "<p class='out-stock'>Sin Stock</p>";
    console.log(e.target.dataset);
  }
};

////////
verCarrito.addEventListener("click", () => {
  modalContainer.innerHTML = "";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-titulo">CARRITO</h1>

    `;

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
                <img src="${product.img}">
                <h3>${product.nombre}</h3>
                <p>${product.cantidad}</p>
                <p> $${product.precio} </p>
                `;

    modalContainer.append(carritoContent);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio, 0);

  const totalCompra = document.createElement("div");
  totalCompra.className = "total-compra";
  totalCompra.innerHTML = `Total a pagar: $${total}`;
  modalContainer.append(totalCompra);
});

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

///////filtrado//////////

const btnOpenCart = document.getElementById("verCarrito");

document.addEventListener("DOMContentLoaded", () => {
  btnOpenCart.addEventListener("click", () => {
    modalContainer.classList.toggle("is-active");
  });
});
const categories = document.querySelector(".filtrado");
const init = () => {
  renderProducts();
  categories.addEventListener("click", applyFilter);
};

init();



