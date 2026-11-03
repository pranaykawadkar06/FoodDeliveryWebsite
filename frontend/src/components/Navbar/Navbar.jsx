import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Navbar.css'
import { useState } from 'react'

const Navbar = () => {

    const [menu, setMenu] = useState("menu");

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="logo" className='logo'/>
            <ul className='navbar-menu'>
                <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
                <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
                <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li>
            </ul>

            <div className='navbar-right'>
                <img src={assets.search_icon} alt="search-icon" />
                <div className='navbar-basket-icon'>
                    <img src={assets.basket_icon} alt="basket-icon" />
                    <div className='dot'></div>
                </div>
                <button>
                    sign in
                </button>
            </div>
        </div>
    )
}

export default Navbar
