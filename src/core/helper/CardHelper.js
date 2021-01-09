
export const addItemToCart = (item,next) => {
let cart = []
if(typeof window !==undefined){
    if(localStorage.getItem("cart")){
        cart=JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({
        ...item,
        count:1
    })
    localStorage.setItem("cart",JSON.stringify(cart))
next();
}
}

export const loadCart = () => {
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            console.log("load cart" +JSON.parse(localStorage.getItem("cart")))
            return JSON.parse(localStorage.getItem("cart"))
        }
        return [];
    }
}

export const removeItemFromCart = (productId) => {
console.log("removing . . . ")
    let cart = []
    if(typeof window !==undefined){

        if(localStorage.getItem("cart")){
            cart= JSON.parse(localStorage.getItem("cart"))
        }
        console.log(cart)
        cart.map((product,index)=>{
            if(product._id === productId)
            {
                cart.splice(index,1)
            }

        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    return cart;
};

export const cartEmpty = next => {
    if(typeof window !==undefined){
localStorage.removeItem("cart") 
let cart = []
localStorage.setItem("cart",JSON.stringify(cart))
next()
} 
}