import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from '../admin/helper/adminapicall'
const Home = () => {

const [products, setproducts] = useState([])
const [error, seterror] = useState(false)

const loadAllProduct = () => {
    getProducts().then(data => {
        if(data.error){
seterror(data.error)
        }
        else{
            setproducts(data)
        }
    })
} 
useEffect(() => {
    loadAllProduct()

}, [])

    return (
        <Base title="Home Page">
          <div className="row text-center">
             <h1 className="text-white">All Products</h1>
             <div className="row">
                 {products.map((product,index)=> {
return (
<div className="col-4 mb-4" key={index}>
    <Card product={product} />
</div>
)
                 })}
             </div>
          </div>
        </Base>
    )
}

export default Home
