import React from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import {Link} from "react-router-dom"

const AdminDashBoard = () => {

const {user: {name,email,role}
} = isAuthenticated();

const adminLeftSide = () => {
return(
    <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
    <ul className="list-group">
        <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/create/category">Create Categories</Link>
        </li>
        {/* <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/orders">Manage Orders</Link>
        </li> */}
        <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/product">Manage Products</Link>
        </li>
        <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/create/product">Create Product</Link>
        </li>
        <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/category">Manage Categories</Link>
        </li>
    </ul>
    </div>
)
}

const adminRightSide = () => {
    return(
        <div className="card mb-4">
            <h4 className="card-header">Admin Information</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Name: </span>{name}
                </li>

                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Email: </span>{email}
                </li>


                <li className="list-group-item">
<span className="badge badge-danger">Admin Area</span>
                </li>
            </ul>
        </div>
    )
}
    return (
        <Base 
        title="Welcome to admin area" 
        description="Manage all of your products here"
        className="container bg-success p-4"
        >
<div className="row " style={{flexWrap:"wrap"}}>
    <div className="col-5" style={{minWidth:"250px"}}>{adminLeftSide()}</div>
    <div className="col-7">
{adminRightSide()}
    </div>
</div>

        </Base>
    )
}

export default AdminDashBoard
