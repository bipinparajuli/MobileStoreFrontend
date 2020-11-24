import React from 'react';
import Home from './core/Home'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoutes from './auth/helper/AdminRoutes';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCatogories from './admin/ManageCatogories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
import UpdateCategory from './admin/UpdateCategory';

const Routes = () => {
    
    return (
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/cart' exact component={Cart} />       
            <PrivateRoutes path='/user/dashboard' exact component={UserDashBoard} />
            <AdminRoutes path='/admin/dashboard' exact component={AdminDashBoard} />
            <AdminRoutes path='/admin/create/category' exact component={AddCategory} />
            <AdminRoutes path='/admin/category' exact component={ManageCatogories} />
            <AdminRoutes path='/admin/create/product' exact component={AddProduct} />
            <AdminRoutes path='/admin/product' exact component={ManageProducts} />
            <AdminRoutes path='/admin/product/update/:productId' exact component={UpdateProduct} />
            <AdminRoutes path='/admin/update/category/:productId' exact component={UpdateCategory} />

        </Switch>
        </BrowserRouter>
    )
}

export default Routes
