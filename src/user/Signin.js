import React, {useState} from 'react'
import Base from "../core/Base"
import {Link,Redirect} from "react-router-dom"

import {signin,authenticate,isAuthenticated} from '../auth/helper/index'

const SignIn = () => {

    const [Values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
    })

const {email,password,error,loading,didRedirect} = Values
const {user} = isAuthenticated();

const handleChange = name => event => {
    setValues({...Values,error: false, [name]:event.target.value})
} 

const loadingMessege = () => {
    return (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
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

const onSubmit = event => {
    event.preventDefault();
    setValues({...Values,error:false,loading:true})
    signin({email,password})
    .then(data =>{
        if(data.error){
            setValues({...Values,error:data.error, loading:false})
        }
        else{
            authenticate(data,()=>{
                setValues({
                    ...Values,didRedirect:true
                })
            })
        }
    })
}

const performRedirect = ()=>{
    if(didRedirect)
    {
        if(user && user.role === 1) 
        {
            return <Redirect to="/admin/dashboard" />
        }
        else
        {
            return <Redirect to="/user/dashboard" />
        }
    }
    if(isAuthenticated()){
        return <Redirect to="/" />
    }
}

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                    
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

    return (
        <Base title="Sign in page" description="A page for user to signin"> 
       {loadingMessege()}
       {errorMessege()}
        {signInForm()}
        {performRedirect()}
        </Base>

    )
}

export default SignIn;