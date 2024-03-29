import React, {useState} from 'react'
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { signup } from '../auth/helper';

const Signup = () => {

const [values, setvalues] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
});

const {name,email,password,error,success} = values

const handleChange = name => event => {
    setvalues({...values,error: false, [name]:event.target.value})
} 

const onSubmit = event => {
    event.preventDefault();
    setvalues({...values,error:false})
    signup({name,email,password})
.then(data => {
    if(data.error)
    {
        setvalues({...values, error:data.error, success:false})
    }
    else
    {
        setvalues({
            ...values,
            name:"",
            email:"",
            password:'',
            error:'',
            success:true
        })
    }
})
.catch(e=>console.log("Error in signup",e))
}

    const signUpForm = () => {
return(
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
            <form >
            <div className="form-group">
                    <label  className="text-light">
                    Name   
                    </label>
                    <input className="form-control" value={name} onChange={handleChange("name")} type="text"/>
                </div>
                <div className="form-group">
                    <label  className="text-light">
                    Email   
                    </label>
                    <input value={email} className="form-control" onChange={handleChange("email")} type="email"/>
                </div>
                <div className="form-group">
                    <label  className="text-light">
                    Password    
                    </label>
                    <input value={password} className="form-control" onChange={handleChange("password")} type="password"/>
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
            </form>
        </div>
    </div>
)
    }

    const successMessege = () => {
        return (
<div className="row">
<div className="col-md-6 offset-sm-3 text-left">
<div className="alert alert-success" style={{display: success ? "" : "none"}}>New account was create succefully. please {" "}
            <Link to="/signin">Login Here</Link>
               </div>
</div>
</div>
      
        )
        }

    const errorMessege = () => {
return (
<div className="row">
<div className="col-md-6 offset-sm-3 text-left">
<div className="alert alert-danger" style={{display: error ? "" : "none"}}>
 {error}
    </div>
    </div>
    </div>
)

    }

    return (
        <Base title="Sign up page" description="A page for user to signup"> 
 {successMessege()}
 {errorMessege()}
 {signUpForm()}
        </Base>
    )
}

export default Signup;