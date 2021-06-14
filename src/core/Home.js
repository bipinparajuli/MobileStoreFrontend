import React,{useState,useEffect} from 'react'
import '../styles.css'
import {API} from '../Backend'
import Base from './Base'
import { useStateValue } from './stateProvider'
import {Link} from 'react-router-dom'
import img from '../Assets/young-handsome-caucasian-man-excited-pointing-with-forefingers-away_1187-45478-removebg.png'

import { getProducts } from '../admin/helper/adminapicall';
import Card from './Card' 

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";



const Home = () => {

const [products, setproducts] = useState([])
const [state, setstate] = useState([])

const [error, seterror] = useState(false)
// const [filterd, setfilterd] = useState([])


const [{Search},dispatch] = useStateValue();

// console.log(Search)
const loadAllProduct = () => {
    getProducts().then(data => {
      console.log(data);
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
           <div className="row">
<div className="col-6 justify-content-center align-item-center">
<h3 style={{fontFamily:"cursive"}}>Collections</h3>
<h1 style={{fontFamily:"times-new-roman",letterSpacing:"2px",fontSize:"65px"}}>AnyTime</h1>
<h1 style={{fontFamily:"times-new-roman",letterSpacing:"2px",fontSize:"65px"}}>Any Place</h1>
<p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eos porro fugit in itaque facilis sapiente tenetur expedita odio, voluptatem voluptatum. Quaerat labore rem enim, cum nam quo, ipsa quasi quae, in necessitatibus quod tempora.</p>
<button className="btn btn-secondary" >Shop Now</button>
</div>
<div className="col-6">
<img style={{width:"100%",height:"auto"}} className="img-responsive withoutbgimage" src={img}/>

</div>
           
                </div>
                {/* <svg style={{zIndex:'1',marginTop:"15%",width:"100%",height:"auto"}} xmlns="http://www.w3.org/2000/svg" viewBox="1 1 1440 320"><path fill="#0099ff" fill-opacity="0.1" d="M0,160L30,144C60,128,120,96,180,106.7C240,117,300,171,360,202.7C420,235,480,245,540,245.3C600,245,660,235,720,192C780,149,840,75,900,37.3C960,0,1020,0,1080,16C1140,32,1200,64,1260,85.3C1320,107,1380,117,1410,122.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg> */}
             <h1 className="text-white text-center">All Products</h1>

                <div className="container">
          <div className=" row text-center">
          
             <div className="row" style={{flexWrap:'wrap'}}>
                 { state.length > 0 ? state.map((product,index)=> {
return (
<div className="hover_effect col-4   mb-4 mt-4" key={index}>
<Link to={`product/${product._id}`}>
    <Card product={product} />
</Link>
</div>
)
                 }) 
                : 
                <>
                
                <ClipLoader  color={"white"} loading={true}  size={150} />                
                
                </>
                }
             </div>
          </div>
          </div>

        </Base>
    )
}

export default Home
