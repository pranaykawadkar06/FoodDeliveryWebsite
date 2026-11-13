import { assets } from '../../assets/frontend_assets/assets'
import './Navbar.css'
import { useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");

    const {cartTotal, token, setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        // setMenu("home")
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="logo" className='logo'/></Link>
            <ul className='navbar-menu'>
                <Link to='/' className="active">home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>

            <div className='navbar-right'>
                <img src={assets.search_icon} alt="search-icon" />
                <div className='navbar-basket-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="basket-icon" /></Link>
                    <div className={cartTotal() === 0 ? "" : "dot"}></div>
                </div>
                {token ? (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="Profile" className="profile-icon" />

                        <ul className="profile-dropdown">
                            <li>
                                <img src={assets.bag_icon} alt="bag-icon" />
                                <p>Orders</p>
                            </li>

                            <hr />

                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="logout-icon" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                )}
            </div>
        </div>
    )
}

export default Navbar
