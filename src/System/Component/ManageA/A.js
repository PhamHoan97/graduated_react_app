import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";

export default class A extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <MenuHorizontal/>
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        AAAA
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="copyright">
                      <p>
                        Copyright © 2018 Colorlib. All rights reserved. Template
                        by <a href="https://colorlib.com">Colorlib</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
