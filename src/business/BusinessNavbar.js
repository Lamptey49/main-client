import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {SidebarData }from './SidebarData'
// import './Navbar.css';
import  { IconContext } from 'react-icons'


function BusinessNavbar() {
    const [sidebar, setSidebar]  = useState(false)
    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="bg-purple-900 w-full h-20 sm:flex lg:flex md:flex justify-start items-center flex">
                <div className="container w-full flex">
                    <Link to="#" className="xl:mx-10 text-3xl bg-none flex text-white py-1">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <Link to="/home" className='xl:mx-10 text-3xl bg-none inline-flex text-white'>
                            <p>Home</p>
                    </Link>
                    <Link to="/contact" className='xl:mx-10 text-3xl bg-none inline-flex text-white'>
                            <p>Contact</p>
                    </Link>
                    
                </div>
            </div>
            <nav className={sidebar ? 'bg-purple-900 w-56 h-screen flex justify-center fixed top-0 duration-700 left-100 left-0 duration-900 space-right' : 'bg-purple-900 w-56 h-screen flex justify-center fixed top-0 duration-700'}>
                <ul className='w-full' onClick={showSidebar}>
                    <li className='bg-purple-900 w-full h-20 flex justify-start items-center'>
                        <Link to="#" className='xl:mx-10 text-3xl bg-none inline-flex'>
                            <AiIcons.AiOutlineClose />
     
                        </Link>
                    </li>
                    
                
                    { SidebarData.map((item, index)=>{
                        return (
                            <li key={index} className={item.cName}>
                                <Link to ={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        
        </IconContext.Provider>
        </>
    )
}

export default BusinessNavbar


