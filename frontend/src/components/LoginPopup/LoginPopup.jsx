import { useContext, useEffect } from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
// import { toast } from "react-toastify";

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if(currState === "Login") {
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        console.log(response);

        if(response.data.success){
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            // toast.success("User Loggen in");
            setShowLogin(false);
            setSignIn(true);
        }
        else{
            // toast.error(response.data.message);
            alert(response.data.message);
        }

    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}))
    }

    // useEffect(() => {
    //     console.log(data);
    // }, [data])

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross-icon" />
                </div>
                <div className='login-popup-inputs'>
                    {currState==="Signup" ? <input name='name' value={data.name} onChange={onChangeHandler} type='text' placeholder='Your name' required/> : <></>}
                    <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Your email' required/>
                    <input name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' required/>
                </div>
                <button type='submit'>{currState==="Signup" ? "Create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                { currState === "Login" ? <p>Create a new acount <span onClick={() => setCurrState("Signup")}>click here</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p> }
            </form>
        </div>
    )
}

export default LoginPopup
