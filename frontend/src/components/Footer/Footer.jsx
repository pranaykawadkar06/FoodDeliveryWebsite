import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt="website-logo"/>
                <p>Delicious food delivered to your doorstep. Explore a variety of delicious dishes and enjoy a seamless food ordering experience with us.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt="facbook-icon"/>
                    <img src={assets.twitter_icon} alt="twitter-icon"/>
                    <img src={assets.linkedin_icon} alt="linkedin-icon"/>
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>Phone +91-956-148-9886</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright © 2026 Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
