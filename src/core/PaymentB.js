import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { cartEmpty, loadCart } from './helper/CardHelper'
import { getmeToken, processPayment } from './helper/paymentBhelper'
import DropIn from 'braintree-web-drop-in-react'
import { isAuthenticated } from '../auth/helper'
import { createOrder } from './helper/OrderHelper'

const PaymentB = ({products,setreload= f => f,reload = undefined}) => {
    
    const [info,setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:'',
        instance:{}
    });

const userId = isAuthenticated()&& isAuthenticated().user._id;
const token = isAuthenticated()&& isAuthenticated().token;


    const getToken = (userId,token) => {
getmeToken(userId,token).then(info => {
     console.log("INformation",info)
    if(info.error)
    {
        setInfo({...info,error:info.error})
    }
    else{
        const clientToken = info.clientToken
        setInfo({clientToken})
    }
})
    } 

    const onPurchase = () => {
        setInfo({loading:true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then(data => {
            nonce=data.nonce
            console.log('INFO' + nonce)

            const paymentData = {
            paymentMethodNonce:nonce,
            amount:getAmount()
        }
        console.log("Success" + paymentData)

        processPayment(userId,token,paymentData)
        .then(response => {
            setInfo({...info,success:response.success,loading:false})
      console.log("Success")
        
    const orderData = {
        products:products,
        transction_id:response.transaction.id,
        amount:response.transaction.amount
    };
    
    createOrder(userId,token,orderData)
})
        cartEmpty(() => {
            console.log("Did we got a crash ?")
        })
        setreload(!reload)
    }) 
        .catch(error => {
            setInfo({loading: false,success:false})
console.log(error)
        
        })
    
    }
    
const showbtdropIn = () => {
//    console.log(info.clientToken)
   let messege;
   if(info.clientToken === undefined){
       messege=(<h2>Please Login First.</h2>)
   } 
   else{
    messege=(<h2>Your Shopping Cart is empty.</h2>)
   }
   
   return (
        <div>
{info.clientToken !== null && info.clientToken !== undefined &&  products.length > 0 ? (
    <div>
    <DropIn
      options={{ authorization: info.clientToken }}
      onInstance={(instance) => (info.instance = instance)}
    />
    <button className="btn btn-success btn-block" onClick={onPurchase}>Buy</button>
  </div>
 ):messege}
    
        </div>
    )
}

    useEffect(() => {
// console.log(userId,token)
        getToken(userId,token);
    }, [])



const getAmount = () =>{
    let amount = 0
// console.log("getting")
    products.map(p => {
        amount = amount + p.price
    })
    return amount
}


    return (
        <div>
            <h3>Your bill is {getAmount()}</h3>
        {showbtdropIn()}
        </div>
    )
}

export default PaymentB
