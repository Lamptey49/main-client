import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './HomeComponent';
import Signin from './../auth/Signin'
import Header from './HeaderComponent';
import SignUp from './../user/SignUp'
import NewBusiness from '../business/NewBusiness';
// import BusinessNavbar from './.business/BusinessNavbar';

const Main = ()=> {

    return (
      <div>
        <Header />
        {/* <BusinessNavbar /> */}
      <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/auth/signin' component={Signin}/>
            <Route path='/user/signup' component={SignUp} />
            <Route path='/business/register/new' component={NewBusiness} />
            <Route path='/auth/business/signin' component={Signin} />
         
      </Switch>
    </div>
    );
}
export default Main;