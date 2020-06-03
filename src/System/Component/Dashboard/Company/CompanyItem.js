import React, { Component } from 'react'
import {  NavLink } from "react-router-dom";
import host from '../../../../Host/ServerDomain';

export default class CompanyItem extends Component {
    displayImageCompany  = () =>{
        if(this.props.avatar === null){
          return(
            <img
              style={{width: '100%'}}
              className="card-img-top"
              src={window.location.origin + '/system/images/company.png'}
              alt="AAA"
            />
          )
        }else{
          return(
            <img
              style={{width: '100%'}}
              className="card-img-top"
              src={host + this.props.avatar}
              alt="AAA"
            />
          )
        }
    }
    render() {
        return (
            <div className="col-md-3">
              <div className="card text-center">
                <NavLink to={"/system/company/detail/"+this.props.id} activeClassName="selected">
                    {this.displayImageCompany()}
                    <div className="card-body">
                      <h6 className="card-title mb-3 dashboard__name--company">
                      {this.props.name}
                      </h6>
                      <p className="card-text">
                      {this.props.field}
                      </p>
                    </div>
                </NavLink>
              </div>
            </div>
        )
    }
}
