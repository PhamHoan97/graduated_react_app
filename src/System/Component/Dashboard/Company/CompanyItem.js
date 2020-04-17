import React, { Component } from 'react'
import {  NavLink } from "react-router-dom";
export default class CompanyItem extends Component {
    render() {
        return (
            <div className="col-md-3">
              <div className="card text-center">
                <NavLink to={"/system/company/"+1} activeClassName="selected">
                  <img
                      className="card-img-top"
                      src={window.location.origin + '/system/images/company1.jpg'}
                      alt="AAA"
                    />
                    <div className="card-body">
                      <h6 className="card-title mb-3 dashboard__name--company">
                      {this.props.name}
                      </h6>
                      <p className="card-text">
                      {this.props.description}
                      </p>
                    </div>
                </NavLink>
              </div>
            </div>
        )
    }
}
