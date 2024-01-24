const getProducts = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  let products = await response.json();

  getCategories();
  addProductsToHtml(products);
};

const addProductsToHtml = (products) => {
  products = products.slice(1, products.length - 1);
  products = products.filter((product, index) => index < 4);

  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productArticle = document.createElement("article");
    const productImage = document.createElement("img");
    const productName = document.createElement("p");
    const productPrice = document.createElement("p");

    productImage.setAttribute("src", product.images[0]);
    productName.innerHTML = product.title;
    productPrice.innerHTML = `$${product.price}`;

    productName.classList.add("product-name");
    productPrice.classList.add("product-price");

    productArticle.appendChild(productImage);
    productArticle.appendChild(productName);
    productArticle.appendChild(productPrice);

    productsContainer.appendChild(productArticle);
  });
};

const getCategories = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  let categories = await response.json();

  categories = categories.filter((category) =>
    category.image.includes("https")
  );
  categories = categories.filter((category, index) => index < 4);
  document.getElementsByClassName("loader-container")[0].style.display = "none";
  addCategoriesToHtml(categories);
};

const addCategoriesToHtml = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    const categoryArticle = document.createElement("article");
    const categoryImage = document.createElement("img");
    const categoryName = document.createElement("p");

    categoryImage.setAttribute("src", category.image);
    categoryName.innerHTML = category.name;

    categoryName.classList.add("category-name");

    categoryArticle.appendChild(categoryImage);
    categoryArticle.appendChild(categoryName);

    categoriesContainer.appendChild(categoryArticle);
  });
};

getProducts();
