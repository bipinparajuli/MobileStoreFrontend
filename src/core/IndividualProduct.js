import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import Card from './Card'
import { getProduct,getProducts } from '../admin/helper/adminapicall'
import { loadCart } from './helper/CardHelper'
import PaymentB from './PaymentB'
import Image from '../core/helper/ImageHelper'
import { Link } from 'react-router-dom'
const IndividualProduct = ({match}) => {

const [products, setproducts] = useState([])
const [product, setproduct] = useState([])
const [allProduct, setAllProduct] = useState([])


const [reload, setreload] = useState(false)

useEffect(()=>{
    // console.log(loadCart())
    // console.log(match.params);
getProduct(match.params.productId).then(data=>{
    // console.log(data);
    setproduct(data)
})
getProducts(match.params.productId).then(product=>{
    console.log(product);
    setAllProduct(product)
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
                    <h3>{product.name}</h3>
                    <h5>{product.price}</h5>

<PaymentB products={products} setreload={setreload}  />
<button
    // disabled
                // onClick={addToCaRT}
                className="btn btn-block btn-outline-success mt-2 mb-2 "
              >
                Add to Cart
              </button>
        </div>
    )
}
    return (
        <Base title="" description="">
          <div className="row text-center">
    <div className="col-6 cart">{products == undefined ?(<h3>No Products in cart</h3>):loadAllProducts()}</div>
    <div className="col-6 cart">{loadCheckout()}</div>

          </div>
          <div className="container">
              <p>You may also like</p>
<div className="row" style={{display:"flex",flexDirection:"row"}}>
              {
allProduct.map(product=>
    {
    console.log(product,"H");
        return(
<div className="col-3">

            <Card product={product} />
            </div>

        )
        })
    
              }

</div>

<Link to="/">
        <button
                // onClick={addToCaRT}
                className="btn  btn-outline-success mt-2 mb-2 "
              >
                Back to Home
              </button>
</Link>

          </div>
        </Base>
    )
}

export default IndividualProduct
