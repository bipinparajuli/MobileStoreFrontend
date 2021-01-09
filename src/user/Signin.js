import React, {useState} from 'react'
import Base from "../core/Base"
import {Link,Redirect} from "react-router-dom"
import {GoogleLogin} from "react-google-login"
import  {signin,authenticate,isAuthenticated} from '../auth/helper/index'
import { googleLogin } from './helper/userapicalls'
const SignIn = () => {

    const [Values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false,
        // Id:""
    })

const {email,password,error,loading,didRedirect,Id} = Values
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
        // console.log(data)
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
 const onSucess= (res)=>{
     console.log(res.tokenId);
// setValues({Id:res.tokenId},console.log(Id))
const Id = res.tokenId
    if(Id !== ""){
        googleLogin({Id})
        .then(data =>{
            // console.log(data)
            authenticate(data,()=>{
                setValues({
                    ...Values,didRedirect:true
                })
            })
    
        }   ) 
            .catch(e=>console.log(e))        
    }
    else{
        setValues({Id:res.tokenId})
        googleLogin({Id})
        .then(data =>{
            console.log(data)
            authenticate(data,()=>{
                setValues({
                    ...Values,didRedirect:true
                })
            })
    
        }   ) 
            .catch(e=>console.log(e))

    }
    
}

const onFailed= (res)=>{
    console.log(res)  
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
                 <h3>or</h3>
                 <GoogleLogin
                 style={{width:"200px"}}
    clientId="962060846623-ia9veg0ookoverc2tm7e8jra25lvknrj.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={onSucess}
    onFailure={onFailed}
    cookiePolicy={'single_host_origin'}
  />
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