// Declearing Variables.

const dotMenu = document.querySelector('.nav-icon');
const cartBtn = document.querySelector('.cart-btn');
const shopNowBtn = document.querySelector('.banner-btn');
const productsDom = document.querySelector('.products-center');
const cartCountDom = document.querySelector('.cart-items')
const cartOverlayDom = document.querySelector('.cart-overlay')
const cartDom = document.querySelector('.cart')

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//extracting product Data,
let data = allProducts;
let products = data;



//genrating shop from json Data ,
generateShop = ()=>{
    return productsDom.innerHTML = products.map((item) =>{
 let {title, price} = item.fields;
 let {id} = item.sys;
 let image = item.fields.image.fields.file.url;

 return (
 ` 
 <article class="product">
     <div class="img-container">
         <img src="${image}" class="product-img">
         <button onclick = "updateCount(${id})" class="bag-btn"><i></i>Add to bag</button>
     </div>
     <h3>${title}</h3>
     <h4>$${price}</h4>
 </article>
 `)
}).join('');
}

//updaitng count
updateCount = (id) =>{
    let selectedItem = id;
    console.log(selectedItem);
    let search = cart.find((x)=>{
      return  x.id===selectedItem})
    // console.log(search)
    if(search === undefined){
        cart.push({
            id: selectedItem,
            item:1
        })
    }else{
        search.item += 1;
    }
    console.log(cart)
    cartCount()
}
cartCount = () =>{
    let total = cart.map((x) => x.item).reduce((x,y)=> x+y, 0);
    cartCountDom.textContent = total
}

//overlay opening function

function showCart(){
  cartOverlayDom.style.visibility='visible'
  cartDom.style.transform = 'translateX(0%)'

}

function hideCart(){
    cartOverlayDom.style.visibility='hidden'
    cartDom.style.transform = 'translateX(100%)'
}




//loacal storage
Storage = () => {
localStorage.setItem('cart', JSON.stringify('cart'));
}

//document loading
document.addEventListener('DOMContentLoaded', ()=>{
    generateShop();
    cartCount();
})
