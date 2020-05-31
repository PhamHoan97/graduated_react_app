import React, { Component } from "react";
import '../Style/Intro.css';
export default class Intro extends Component {
  render() {
    return (
      <div>
        {/* Natigation */}
        <div className="natigation">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {/* fixed-top */}
                <nav className="navbar navbar-expand-lg navbar-light">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo01"
                  >
                    <a className="navbar-brand" href="/">
                      <img src='./intro/images/Logo.png' alt="logo" />
                    </a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 menu-left">
                      <li className="nav-item active">
                        <a className="nav-link" href="/employee/login">
                          Employee <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Use Cases
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Enterprise
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link disabled" href="2aesn">
                          Pricing
                        </a>
                      </li>
                    </ul>
                    <ul className="navbar-nav ml-auto menu-right">
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          Contact Sales
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/company/login">
                          Login
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/register"
                          className="btn btn-primary btn-lg active btn--get__started"
                          role="button"
                          aria-pressed="true"
                        >
                          Get Started &gt;
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* End Natigation*/}
        {/* Intro*/}
        <div className="intro">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4 text-center">
                <div className="intro-description" >
                  <h1>Fearless leaders know</h1>
                  <h1> they can win</h1>
                  <a
                    href="/register"
                    className="btn btn-primary btn-lg active btn--get__started btn-intro"
                    role="button"
                    aria-pressed="true"
                  >
                    Get Started &gt;
                  </a>
                </div>
              </div>
              <div className="col-md-4" />
            </div>
          </div>
        </div>
        {/* Intro*/}
        {/* Banner */}
        <div className="banner">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <h1 className="display-5">See the big picture at a glance</h1>
                  <p className="lead">
                    Gain key insights across multiple boards from your projects,
                    teams, and processes.
                  </p>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
          </div>
        </div>
        {/* End banner */}
        {/* Feature*/}
        <div className="feature">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 text-center feature--description">
                <div className="feature--description__content">
                  <h2>Make decisions with confidence</h2>
                  <div>
                    Act on real-time data, not guesses. monday.com gives you a
                    high-level overview of where things stand at glance so you
                    know your team is moving in the right direction.
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <img src="./intro/images/auto--form.png" alt="feature1" />
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-md-5 text-center feature--description">
                <div className="feature--description__content">
                  <h2>How to Make Business Decisions with Purpose</h2>
                  <div>
                  You’ve heard the old saying: “If it ain’t broke, don’t fix it.” 
                  But with process management, you may want to throw that saying out the window. 
                  In business, things don’t have to be broken in order to benefit from regular 
                  and even constant improvement. In fact, constant improvement is often the best 
                  way for businesses to grow and streamline operations.
                  By implementing process management, businesses are persistently evaluating and 
                  re-evaluating the status quo, leading to short- and long-term process improvement. 
                  So what is process management, and how can you use it to improve processes now and 
                  in the future?
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <img src="./intro/images/process-feature.png" alt="feature2" />
              </div>
            </div>
          </div>
        </div>
        {/* End Feature*/}
        {/* Blocks*/}
        <div className="blocks mt-4">
          <div className="container-fluid">
            <div className="row mb-5">
              <div className="col-md-4" />
              <div className="col-md-5">
                <h1>Useful building blocks </h1>
              </div>
              <div className="col-md-3" />
            </div>
            <div className="row">
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/dashboard.png" alt="" />
                  <h3>Dashboards</h3>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/forms.png" alt="" />
                  <h3>Forms</h3>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/workflow.png" alt="" />
                  <h3>Process</h3>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <div className="block--icon">
                  <img src="./intro/images/filesharing.png" alt="" />
                  <h3>File Sharing</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end blocks */}
        {/* Footer*/}
        <footer className="page-footer font-small indigo bg-light mt-5">
          {/* Footer Links */}
          <div className="container text-center text-md-left">
            {/* Grid row */}
            <div className="row">
              {/* Grid column */}
              <div className="col-md-4 mx-auto">
                {/* Links */}
                <div className="mb-5 mt-5">
                  <img src="./intro/images/Logo.png" alt="Logo--company" />
                </div>
                {/* Copyright */}
                <div>
                  © 2020 Copyright:
                  <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
                </div>
                {/* Copyright */}
                <br />
                <div className="icon--soict">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-3">
                         <i className="fab fa-facebook-f fa-2x"></i>
                      </div>
                      <div className="col-md-3">
                        <i className="fab fa-twitter fa-2x"></i>
                      </div>
                      <div className="co-md-3">
                        <i className="fas fa-comments fa-2x"></i>
                      </div>
                      <div className="col-md-3">
                        <i className="fab fa-youtube fa-2x"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Grid column */}
              <hr className="clearfix w-100 d-md-none" />
              {/* Grid column */}
              <div className="col-md-4 mt-4">
                {/* Links */}
                <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                  HH2 Company
                </h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#!">About us</a>
                  </li>
                  <li>
                    <a href="#!">Careers</a>
                  </li>
                  <li>
                    <a href="#!">Partners</a>
                  </li>
                  <li>
                    <a href="#!">Contact</a>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
              <hr className="clearfix w-100 d-md-none" />
              {/* Grid column */}
              <div className="col-md-4 mt-4">
                {/* Links */}
                <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                  Đại Học Bách Khoa Hà Nội
                </h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#!">Số 1, Đại Cồ Việt Giải Phóng </a>
                  </li>
                  <li>
                    <a href="#!">2020</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Grid row */}
          </div>
          {/* Footer Links */}
        </footer>
        {/* end footer*/}
      </div>
    );
  }
}
