import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div className="page-wrapper">
            <div className="page-content--bge5">
              <div className="container">
                <div className="login-wrap">
                  <div className="login-content">
                    <div className="login-logo">
                      <a href="/">
                        <img src="../intro/images/Logo.png" alt="Cool Admin" />
                      </a>
                    </div>
                    <div className="login-form">
                      <form method="post">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input className="au-input au-input--full" type="email" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input className="au-input au-input--full" type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="login-checkbox">
                          <label>
                            <input type="checkbox" name="remember" />Remember Me
                          </label>
                          <label>
                            <a href="/company/forgetpassword">Forgotten Password?</a>
                          </label>
                        </div>
                        <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit"><i class="fas fa-sign-in-alt"></i> sign in</button>
                        <div className="social-login-content">
                            <div className="social-button">
                                <button className="au-btn au-btn--block au-btn--blue m-b-20"><i class="fab fa-facebook-square"></i> sign in with facebook</button>
                                <button className="au-btn au-btn--block au-btn--blue2"><i class="fab fa-twitter-square"></i> sign in with twitter</button>
                            </div>
                        </div>
                      </form>
                      <div className="register-link">
                        <p>
                          Don't you have account?
                          <a href="register.html">Sign Up Here</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
