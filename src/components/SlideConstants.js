import React from 'react'
import { Button } from '@material-ui/core'
import CartIcon from '@material-ui/icons/ShoppingCart'
import slider_1 from './../assets/images/slider-1.jpg';
import slider_2 from './../assets/images/slider-2.jpg';
import slider_3 from './../assets/images/slider-3.jpg';

export const SLIDE_INFO = [
    { 
        id:"1",
        title:'First Slide',
        imgUrl: slider_1,
        button: <Button><CartIcon /> Shop Now</Button>
    },
    
    { 
        id:"2",
        title:'Second Slide', 
        imgUrl: slider_2, 
        button: <Button><CartIcon /> Shop Now</Button>
    },
    { 
        id:"3",
        title:'Third Slide ', 
        imgUrl: slider_3, 
        button: <Button><CartIcon /> Shop Now</Button>
    },
];