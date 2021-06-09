import React, { Fragment,useState,useEffect } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {isAuthenticated, signout } from '../auth/helper'
import { getSearchItem } from '../user/helper/userapicalls'
import { StateProvider, useStateValue } from './stateProvider'


const currentTab = (history, path) => {
    // console.log(history.location.path,path)
    if(history.location.pathname ===path)
    {
        return{color:"#019031"}
    }else{
        return {
            color:"#ffffff"
        }
    }
}


const Menu = ({history}) => {

    const [state, setstate] = useState("")
    const [{},dispatch] = useStateValue();

useEffect(() => {
    
            dispatch({
                type:"SEARCH",
                item:state
            })
}, [state])

    


    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history,"/")} className='nav-link' to="/">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link style={currentTab(history,"/cart")} className='nav-link' to="/cart">
                        Cart
                    </Link>
                </li>

                <li className="nav-item">
                    <Link style={currentTab(history,"/catalog")} className='nav-link' to="/catalog">
                        Catalog
                    </Link>
                </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link style={currentTab(history,"/user/dashboard")} className='nav-link' to="/user/dashboard">
                       User Dashboard
                    </Link>
                </li>
            )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                    <Link style={currentTab(history,"/admin/dashboard")} className='nav-link' to="/admin/dashboard">
                       Admin Dashboard
                    </Link>
                </li>
                )}
{!isAuthenticated()&&(
                <Fragment>
<li className="nav-item">
    <Link style={currentTab(history,"/signup")} className='nav-link' to="/signup">
SignUp
    </Link>
</li>
<li className="nav-item">
    <Link style={currentTab(history,"/signin")} className='nav-link' to="/signin">
SignIn
    </Link>
</li>
</Fragment>

)}
                
{isAuthenticated() && (
    <li className="nav-item">
    <span className="nav-link text-warning" onClick={()=>{
        signout(()=>{
            history.push("/");
        })
    }}>SignOut</span>
</li>
)}
{/* <li> */}
<div class="md-form active-pink active-pink-2 mb-3 mt-0">
  <input onChange={e=>setstate(e.target.value)} value={state} class="form-control" type="text" placeholder="Search" aria-label="Search" />
</div>
{/* </li> */}

            </ul>
        </div>
    )
}

export default withRouter(Menu)
