import React from "react";
import "./login.css";

function Login(){
    return(
        <div class="login-container">
            <h2 class="form-title"> Login In MedHub</h2>
            <div className="social-login">
               
                <p className="separator"></p>
                <form action="#" className="login-form"></form>
                <div className="input-wrapper">
                    <input type="email" placeholder="Email" required/>
                    <input type="name" placeholder="User Name" required />
                    <input type="password" placeholder="Password" required />

                </div>
                <a href="#" className="forgot-pass-link">Forgot Password?</a>
                <button className="login-button">Login</button>
            </div>
           
            <p className="signup-text">Don&apos;t have an account? <a href="register"> Sign Up</a></p>

        </div>
    );
}

export default Login;
