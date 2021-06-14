import React,{useState} from 'react'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createProduct, getCategories } from './helper/adminapicall'


const AddProduct = () => {

  const history=useHistory()

const  {user,token} = isAuthenticated();

    const [Values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:'',
        photo:"",
        catogories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirected:false,
        formData:""
    })

    const {name,description,price,stock,catogories,error,createdProduct,formData} 
    = Values

    const preload = () => {
        getCategories().then(data => {
            // console.log(data)
            if(data.error) {
                setValues({...Values,error:data.error})
            }
            else{
                setValues({...Values,catogories:data,formData:new FormData()})
                // console.log(catogories)
            }
        })
    }

    useEffect(() => {
        preload()
    },[])

    const onSubmit = (event) => {

      

      event.preventDefault();

      setValues({...Values,formData:"",error:"",loading:true})
      console.log(Values);
      createProduct(user._id,token, formData)
          .then(data => {
          console.log(data);
            if(data.error)
            {
                setValues({...Values,error:data.error})
                
              }
            else
            {
                      setValues({
                          ...Values,
                          name:"",
                          description:"",
                          price:"",
                          photo:"",
                          stock:"",
                          category:"",
                          loading:false,
                          createdProduct:data.name
                      })
                      setTimeout(() => (
                        history.push("/admin/dashboard")
              ), 3000);
        }
}).catch(err=>console.log(err))
    }

const successMessage = () => {
   return(
<>
    <div className="alert alert-success mt-3" style={{display:createdProduct ? "":"none"}}>
    <h4>{createdProduct} created successfully</h4>
    </div>
  </>
   )
}

const errorMessage = () => {
    if(error){
      return (
        <h4>Error</h4>
      )
    }
 }

    const handleChange = name => event => {
const value = name === "photo" ? event.target.files[0] : event.target.value;
formData.set(name,value);
setValues({...Values,[name]:value})         
    }
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {catogories && catogories.map((cate,index) => (
                  <option key={index} value={cate._id}>{cate.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );

    return (
        <Base
        title="Add a product here!"
        description="Welcome to product creation section"
        className="container bg-info p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
              {createProductForm()}
          </div>
        </div>
      </Base>
    )
}

export default AddProduct
