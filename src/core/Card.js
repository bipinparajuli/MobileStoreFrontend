import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CardHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({
    product,
    AddtoCart = true,
removeFromCart=false,
reload = undefined,
setreload = f => f,
}) => {

const [redirect, setredirect] = useState(false)
const [count, setcount] = useState(product.count)

const cartTitle = product ? product.name : "A photo from pexels"
const cartDescription = product ? product.description : "Default Descrition"
const cartPrice = product ? product.price : "Default Price"

const addToCaRT = () => {
    addItemToCart(product,() => setredirect(true))
}

const getARedirect = (redirect) => {
    if(redirect){
        return <Redirect to="/cart" />
    }
}

  const showAddToCart = (AddtoCart) => {
return (
    AddtoCart && (
    <button
                onClick={addToCaRT}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
)
)
  }

  const showRemoveFromCart = (removeFromCart) => {
      return(
      removeFromCart &&(
      <button
        onClick={() => {
            removeItemFromCart(product._id);
setreload(!reload)
        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>))
}
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
          <ImageHelper product={product} /> 
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
    <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(AddtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default  Card;