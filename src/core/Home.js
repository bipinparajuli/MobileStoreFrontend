import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from '../admin/helper/adminapicall'
import { useStateValue } from './stateProvider'


const Home = () => {

const [products, setproducts] = useState([])
const [state, setstate] = useState([])

const [error, seterror] = useState(false)
// const [filterd, setfilterd] = useState([])


const [{Search},dispatch] = useStateValue();

// console.log(Search)
const loadAllProduct = () => {
    getProducts().then(data => {
        if(data.error){
seterror(data.error)
        }
        else{
// console.log(data)
            setproducts(data)
        }
    })
} 
useEffect(() => {
    loadAllProduct()

}, [])

useEffect(() => {
    console.log(Search)
    setstate(products.filter((val)=>{
        if(Search == ""){
            // console.log("matching 1",val) 
            return val
        }
        else if (val.name.toLowerCase().includes(Search.toLowerCase())) {
        //    console.log("matching",val)
            return val
        } 
    }) )
}, [Search,products])

    return (
        <Base title="Home Page">
          <div className="row text-center">
             <h1 className="text-white text-center">All Products</h1>
             <div className="row">
                 {state.map((product,index)=> {
return (
<div className="col-sm mb-4 mt-4" key={index}>
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
