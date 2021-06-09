import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import Card from './Card'
import { getProduct } from '../admin/helper/adminapicall'
import { loadCart } from './helper/CardHelper'
import PaymentB from './PaymentB'
import Image from '../core/helper/ImageHelper'
const IndividualProduct = ({match}) => {

const [products, setproducts] = useState([])
const [product, setproduct] = useState([])

const [reload, setreload] = useState(false)

useEffect(()=>{
    // console.log(loadCart())
    // console.log(match.params);
getProduct(match.params.productId).then(data=>{
    // console.log(data);
    setproduct(data)
})
    setproducts(loadCart());

},[reload])



const loadAllProducts = (product) =>{
    return (
        <div>
            {/* <h2>This section is for checkout</h2> */}
<Image productId={match.params.productId}  />
        </div>
    )
}
const loadCheckout = () =>{
    return (
        <div>
            {
               product.length >= 0? product.map(data=>(
                    <>
                    <h3>{data.name}</h3>
                    <h5>{data.price}</h5>

                    </>
                ))
                :
                <p>loading ...</p>
            }
<PaymentB products={products} setreload={setreload}  />
        </div>
    )
}
    return (
        <Base title="" description="">
          <div className="row text-center">
    <div className="col-6 cart">{products == undefined ?(<h3>No Products in cart</h3>):loadAllProducts()}</div>
    <div className="col-6 cart">{loadCheckout()}</div>

          </div>
        </Base>
    )
}

export default IndividualProduct
