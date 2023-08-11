function fetchData() {
  const req = new Request();
  return req.fetchData("/data.json").then((data) => data);
}

function generateFilterOptions(data, attributeKey) {
  const values = new Set(data?.map((item) => item?.attributes[attributeKey]));
  const filterHtml = `<select class="filter-option" data-attribute="${attributeKey}"><option default>${attributeKey}</option>${[
    ...values,
  ]
    .map((value) => `<option value='${value}'>${value}</option>`)
    .join("")}</select>`;
  return filterHtml;
}

function generateProductCard(item) {
  return `<div class="product_card">
                <div class="product_header">
                    <img src="https://www.mediabd.it/storage-foto/prod/m/${item?.pictures[0]?.url}" id="" />
                </div>
                <div class="product_body">
                    <p class="product_title">${item.name}</p>
                    <p class="product_code">${item.code}</p>
                    <p class="product_availability">Availability: ${item.availability}</p>
                </div>
            </div>`;
}

// async function render(filters=undefined) {
//   const productWrapper = document.querySelector(".products_wrapper");
//   const filterWrapper = document.querySelector(".filter_products");

//   try {
//     const res = await fetchData("data.json");
//     const products = res?.items;

//     // Generate filter options
//     ["category", "subcategory", "brand", "gender", "season"].forEach(
//       (attribute) => {
//         const filterHtml = generateFilterOptions(products, attribute);
//         filterWrapper.insertAdjacentHTML("beforeend", filterHtml);
//       }
//     );

//     // Generate product cards

//     const productCards = products.map(generateProductCard);

//     productWrapper.innerHTML = productCards.join("");

//     // Add event listeners to filter options
//     const filterOptions = document.querySelectorAll(".filter-option");
//     filterOptions.forEach((option) => {
//       option.addEventListener("change", applyFilters);
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// function applyFilters() {
//   const selectedFilters = {};
//   const filterOptions = document.querySelectorAll(".filter-option");

//   filterOptions.forEach((option) => {
//     const attribute = option.dataset.attribute;
//     const value = option.value;
//     if (value !== attribute) {
//       selectedFilters[attribute] = value;
//     }
//   });

//   console.log(selectedFilters);
// }

// function init() {
//   render();
// }

// init();

async function renderFilterOptions(products) {
  const filterWrapper = document.querySelector(".filter_products");

  ["category", "subcategory", "brand", "gender", "season"].forEach(
    (attribute) => {
      const filterHtml = generateFilterOptions(products, attribute);
      filterWrapper.insertAdjacentHTML("beforeend", filterHtml);
    }
  );
}

function renderProductCards(products) {
  const productWrapper = document.querySelector(".products_wrapper");
  const productCards = products.map(generateProductCard);
  productWrapper.innerHTML = productCards.join("");
}

async function render() {
  try {
    const res = await fetchData();
    const products = res?.items;

    renderFilterOptions(products);
    renderProductCards(products);

    const filterOptions = document.querySelectorAll(".filter-option");
    filterOptions.forEach((option) => {
      option.addEventListener("change", applyFilters);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function applyFilters() {
    const selectedFilters = {};
    const filterOptions = document.querySelectorAll(".filter-option");
  
    filterOptions.forEach((option) => {
      const attribute = option.dataset.attribute;
      const value = option.value;
      if (value !== attribute) {
        selectedFilters[attribute] = value;
      }
    });
  
    // Call a function to filter and update product cards based on selectedFilters
    updateFilteredProductCards(selectedFilters);
  }
  
  async function updateFilteredProductCards(filters) {
    // Get the original products data (you might need to store it globally)
    const res = await fetchData().then(data=>data);
    const products = res?.items;
    const filteredProducts = products.filter((product) => {
      for (const attribute in filters) {
        if (product.attributes[attribute] !== filters[attribute]) {
          return false;
        }
      }
      return true;
    });
  
    // Render filtered product cards
    renderProductCards(filteredProducts);
  }
  

function init() {
  render();
}

init();
