function Render(){
     /* section inject products*/
     const productWrapper = document.querySelector(".products_wrapper");
     const filterWrapper = document.querySelector(".filter_products");

     /* Creating Request Object */
     const req = new Request();

     /* using data generating html string*/
     req.fetchData('data.json').then(res=>{

         /* Storing Response Data Into Varibale*/
         const products = res?.items;
         console.log(products)

         /* Storing Categories */
         const Categories = new Set(products?.map(category => {
             return category?.attributes.category
         }));

         const CategoryFilterHtml = `<select><option default>Categories</option>${[...Categories].map((category,index)=>{
             return `<option value='${category}'>${category}</option>`;
         })}</select>`;

         filterWrapper.insertAdjacentHTML('afterbegin',CategoryFilterHtml);

         /*=====================*/

         /* Stroing Subcategories */
         const SubCategories = new Set(products?.map(category => {
             return category?.attributes.subcategory
         }));

         const SubCategoriesFilterHtml = `<select><option default>Subcategories</option>${[...SubCategories].map((subcategory,index)=>{
             return `<option value='${subcategory}'>${subcategory}</option>`;
         })}</select>`;

         filterWrapper.insertAdjacentHTML('beforeend',SubCategoriesFilterHtml);

         /*====================*/

         /*Storing Brand*/
         const brands =  new Set(products?.map(category => {
             return category?.brand
         }));

         const brandsFilterHtml = `<select><option default>Brand</option>${[...brands].map((brand,index)=>{
             return `<option value='${brand}'>${brand}</option>`;
         })}</select>`;

         filterWrapper.insertAdjacentHTML('beforeend',brandsFilterHtml);

         /* Storing Gender */
         const genders =  new Set(products?.map(category => {
             return category?.attributes.gender;
         }));

         const gendersFilterHtml = `<select><option default>Genders</option>${[...genders].map((gender,index)=>{
             return `<option value='${gender}'>${gender}</option>`;
         })}</select>`;

         filterWrapper.insertAdjacentHTML('beforeend',gendersFilterHtml);

         /* Storing Season */
         const sesons =  new Set(products?.map(category => {
             return category?.attributes.season;
         }));

         const sesonsFilterHtml = `<select><option default>Seasons</option>${[...sesons].map((seson,index)=>{
             return `<option value='${seson}'>${seson}</option>`;
         })}</select>`;

         filterWrapper.insertAdjacentHTML('beforeend',sesonsFilterHtml);

         /* generating html string for product cards */
         const ProductsCards = products.map((item,index)=>{

             return `<div class="product_card">
                         <div class="product_header">
                             <img src="https://www.mediabd.it/storage-foto/prod/m/${item?.pictures[0]?.url}" id="" />
                         </div>

                         <div class="product_body">
                             <p class="product_title">${item.name}</p>
                             <p class="product_code">${item.code}</p>
                             <p class="product_availability">Availability: ${item.availability}</span></p>
                         </div>
                     </div>`;
         });

         productWrapper.insertAdjacentHTML('afterbegin',ProductsCards.join(""))
     });
}

function init(){
    Render();
}
init();

function fetchData() {
    const req = new Request();
    return req.fetchData('/data.json').then(data=>data);
}

function generateFilterOptions(data, attributeKey) {
    const values = new Set(data?.map(item => item?.attributes[attributeKey]));
    const filterHtml = `<select><option default>${attributeKey}</option>${[...values].map(value => `<option value='${value}'>${value}</option>`).join('')}</select>`;
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

async function render() {
    const productWrapper = document.querySelector(".products_wrapper");
    const filterWrapper = document.querySelector(".filter_products");

    try {
        const res = await fetchData('data.json');
        const products = res?.items;

        // Generate filter options
        ['category', 'subcategory', 'brand', 'gender', 'season'].forEach(attribute => {
            const filterHtml = generateFilterOptions(products, attribute);
            filterWrapper.insertAdjacentHTML('beforeend', filterHtml);
        });

        // Generate product cards
        const productCards = products.map(generateProductCard);
        productWrapper.insertAdjacentHTML('afterbegin', productCards.join(''));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function init() {
    render();
}

init();