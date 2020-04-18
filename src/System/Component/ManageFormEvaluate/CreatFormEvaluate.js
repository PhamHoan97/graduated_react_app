import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";

export default class CreatFormEvaluate extends Component {
  componentDidMount() {
    window.builtformio()
  }

  getDataForm = () => {
     var dataSchemaForm = localStorage.getItem("dataSchemaForm");
     console.log(dataSchemaForm);
  }
  render() {
    console.log('Render create form evaluete ');
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
                        <div id='builder'>
                        </div>
                        <button type="button" className="btn btn-primary" id="submitSchema" onClick={()=>this.getDataForm()}>Submit</button>
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
