import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from '../admin/helper/adminapicall'
import { loadCart } from './helper/CardHelper'
import PaymentB from './PaymentB'
const Cart = () => {

const [products, setproducts] = useState([])
const [reload, setreload] = useState(false)

useEffect(()=>{
    // console.log(loadCart())
    setproducts(loadCart());

},[reload])



const loadAllProducts = (product) =>{
    return (
        <div>
            <h2>This section is for checkout</h2>
{products.map((product,index) => (
    
    <Card 
    key={index}
    product={product}
    removeFromCart={true}
    AddtoCart={false}
    setreload={setreload}
    reload={reload}
    />
))}
        </div>
    )
}
const loadCheckout = () =>{
    return (
        <div>
<PaymentB products={products} setreload={setreload}  />
        </div>
    )
}
    return (
        <Base title="Cart Page" description="Ready to checkout">
          <div className="row text-center">
    <div className="col-6">{products == undefined ?(<h3>No Products in cart</h3>):loadAllProducts()}</div>
    <div className="col-6">{loadCheckout()}</div>

          </div>
        </Base>
    )
}

export default Cart
