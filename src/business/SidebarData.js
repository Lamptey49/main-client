import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export  const SidebarData = [
    {
        title:'Home',
        path:'/',
        icon: <AiIcons.AiFillHome />,
        cName:'nav-text'
    },
    {
        title:'Create Seller Account',
        path:'/seller-accounts',
        icon: <IoIcons.IoMdContact/>,
        cName:'nav-text'
    },
    {
        title:'View Accounts',
        path:'/list-accounts',
        icon: <IoIcons.IoMdList />,
        cName:'nav-text'
    },
    {
        title:'Disburse Funds',
        path:'/disburse-funds',
        icon: <AiIcons.AiFillFund />,
        cName:'nav-text'
    },
    {
        title:'Products',
        path:'/products',
        icon: <FaIcons.FaCartPlus />,
        cName:'nav-text'
    },
    {
        title:'Support',
        path:'/support',
        icon: <IoIcons.IoMdHelpCircle />,
        cName:'nav-text'
    }

]
