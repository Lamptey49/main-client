 import React from 'react'
 import {
  Route,
  Switch
} from 'react-router-dom'
import Home from  './core/Home'
import Menu from  './core/Menu'
import Users from   './user/Users'
import Admin  from './admin/Admin'
import Signup from  './user/Signup'
import Signin from  './auth/Signin'
import EditProfile from  './user/EditProfile'
import Profile  from './user/Profile'
import PrivateRoute  from './auth/PrivateRoute'
import AdminPrivateRoute  from './auth/AdminPrivateRoute'
import NewShop  from './shop/NewShop'
import Shops  from './shop/Shops'
import MyShops from  './shop/MyShops'
import Shop  from './shop/Shop'
import EditShop from  './shop/EditShop'
import NewProduct from  './product/NewProduct'
import ListProducts from  './product/Products'
import EditProduct from  './product/EditProduct'
import Product from  './product/Product'
import Inquiry from  './cart/Inquiry'
import StripeConnect  from './user/StripeConnect'
import ShopOrders from  './order/ShopOrders'
import Order from  './order/Order'
import PlaceARequestForm from  './request/PlaceARequestForm'
import VerifyEmail from  './components/VerifyEmail'
import Login from  './admin/Login'
import UsersList from './admin/Users/UsersList'
import ShopList from './admin/shops/ShopList'
import SingleUser from './admin/Users/SingleUser'
import Dashboard from  './admin/Dashboard'
import ProductList from './admin/products/ProductList'
// import Register  from './views/pages/register/Register'
import Posts from './admin/blog/Posts'
import CreatePost from './admin/blog/createpost/CreatePost'
import SinglePost from './admin/blog/singlepost/SinglePost'
import MyPost from './admin/blog/mypost/MyPost'
import CreateTestimony from './testimony/CreateTestimony'


 function MainRouter() {
  return (
   <div>
          <Switch>
           <Route path='/' exact name='Home' render={props => <Home {...props} /> } />
           <Route path='/dashboard' exact name='Dashboard' render={props => <Dashboard {...props} /> } />
           <Route path='/users' name='Users' render={props => <Users {...props} /> } />
           <Route path='/admin/users-list' name='Users' render={props => <UsersList {...props} /> } />
           <Route path='/auth/admin/signin' name='Admin Login' render={props => <Login {...props} /> } />
           <Route path='/auth/admin/signup' name='Admin Registration' render={props => <Register {...props} /> } />
           <Route path='/user/signup' name='Admin Login' render={props => <Signup {...props} /> } />
           <Route path='/auth/signin' name='Admin Login' render={props => <Signin {...props} /> } />
           <Route path='/user/:userId' name='Profile' render={props => <Profile {...props} /> } />
           <Route path='/blog' name='Blog' component={Posts} />
           <Route path='/blog/mypost' name='Blog' component={MyPost} />
           <AdminPrivateRoute exact path='/create/new/blog' name='Blog' component={CreatePost} />
           <Route path='/blog/post/:postId' name='Blog' component={SinglePost} />
           <Route path='admin/user/:userId' name='Profile' render={props => <SingleUser {...props} /> } />
           <PrivateRoute path='/user/edit/:userId' name='Edit Profile' render={props => <EditProfile {...props} /> } />
           <Route path='/place-request/get-started' name='Admin Login' render={props => <PlaceARequestForm {...props} /> } />
           <Route path='/inquiry' name='Admin Login' render={props => <Inquiry {...props} /> } />
           <Route path='/product/:productId' name='Admin Login' render={props => <Product {...props} /> } />
           <Route path='/admin/products/all' name='All Products' render={props => <ProductList {...props} /> } />
           <Route path='/shops/all' name='Shop' render={props => <Shops {...props} /> } />
           <Route path='/admin/shops/all' name='Shop' render={props => <ShopList {...props} /> } />
           <PrivateRoute path='/shops/:shopId' name='Shop' render={props => <Shop {...props} /> } />
           <Route path='/verify-email' name='Verify' render={props => <VerifyEmail {...props} /> } />
           <PrivateRoute path='/order/:orderId' name='Orders' render={props => <Order {...props} /> } />
           <Route path='/make-inquiry/:orderId' name='Inquiry' render={props => <Order {...props} /> } />
           <PrivateRoute path="/seller/orders/:shop/:shopId" component={ShopOrders}/>
           <PrivateRoute path="/admin/seller/orders/:shop/:shopId" component={ShopOrders}/>
          <PrivateRoute path="/seller/shops" component={MyShops}/>
          <PrivateRoute path="/seller/shop/new" component={NewShop}/>
          <PrivateRoute path="/business/register/new" component={NewShop}/>
          <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop}/>
          <PrivateRoute path="/seller/:shopId/products/new" component={NewProduct}/>
          <PrivateRoute path="/admin/seller/:shopId/products/new" component={NewProduct}/>
          <PrivateRoute path="/seller/:shopId/:productId/edit" component={EditProduct}/>
           <Route path='/seller/stripe/connect' name='Connect to Stripe' render={props => <StripeConnect {...props} /> } />
           <AdminPrivateRoute exact path='/admin'  component={Admin}  />
          <Route path="/add-testimony" component={CreateTestimony} />
          </Switch>
     
   </div>
       
  )
}
export default MainRouter
