import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import {updateCategory } from './helper/adminapicall'

const UpdateCategory = ({match}) => {

    const [name, setname] = useState("");
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);

const {user,token} = isAuthenticated();

const goBack = () => {
    return (

        <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
    </div>
    )
}

const handleChange = (event) => {
seterror("");
setname(event.target.value)
}

const onSubmit = (event) => {
    event.preventDefault();
    seterror("");
    setsuccess(false)

    //BACKEND REQUEST FIRED
    updateCategory(match.params.productId,user._id,token,{name})
    .then(data => {
        console.log("DATA",data)
        if(data&&data.error)
        {
            seterror(true)
        }
        else{
            seterror("")
            setsuccess(true)
 setname("");
        }
    })
}

const successMessage = () => {
if(success)
{
return <h4 className="text-success">Category updated successfully</h4>
}

}


const errorMessage = () => {
    if(error)
    {
    return <h4 className="text-danger">Failed to update category</h4>
    }   
}
const myCategoryForm =() => {
return (
<form >
    <div className="form-group">
        <p className="lead">Enter the category</p>
        <input type="text" 
        onChange={handleChange}
        value={name}
        autoFocus required 
        name="name"
        placeholder="For Ex. Summer" 
        className="form-control my-3"/>
    <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
    </div>
</form>
)
}

return (
<Base title="Update a category here"
description="Update your category for tshirts"
className="container bg-info p-4"
>
    <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
{successMessage()}
{errorMessage()}
            {myCategoryForm()}
        {goBack()}
        </div>
    </div>
</Base>
    )
}

export default UpdateCategory
