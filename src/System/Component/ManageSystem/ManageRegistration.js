import React, { Component } from "react";
import "../../Style/Account/account.css";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import RejectReasonModal from "./RejectReasonModal";
import axios from 'axios';

export default class ManageRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registration: '',      
        }
    } 
    
    convertWorkforceCompany = (workforce) => {
        var result;
        switch (workforce) {
            case 1:
                result = "Less than 50 employees";   
                break; 
            case 2:
                result = "From 50 to 100 employees";   
                break;  
            case 3:
                result = "From 100 to 200 employees";   
                break;  
            case 4:
                result = "From 200 to 300 employees";   
                break;  
            case 5:
                result = "Less More than 300 employees";   
                break;                                                          
            default:
                break;
        }
        return result;
    }

    getRowsOfTable = () => {
        return Object.values(this.state.registration).map((value, key) => {
            console.log(key)
            return (
                <>
                <tr key={key} className="tr-shadow">
                <td>
                    <label className="au-checkbox">
                    <input type="checkbox" />
                    <span className="au-checkmark" />
                    </label>
                </td>
                <td>{value.name}</td>
                <td>
                    {value.contact}
                </td>
                <td className="desc">{value.address}</td>
                <td className="desc">{value.field}</td>
                <td>
                    {this.convertWorkforceCompany(value.workforce)}
                </td>
                <td>
                    <div className="table-data-feature">
                    <button
                        className="item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Approve"
                    >
                        <i className="zmdi zmdi-notifications-add" />
                    </button>
                    <button
                        className="item"
                        data-toggle="modal"
                        data-target="#rejectmodal"
                        data-placement="top"
                        title="Reject"
                    >
                        <i className="zmdi zmdi-xbox" />
                    </button>
                    <button
                        className="item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="More"
                    >
                        <i className="zmdi zmdi-more" />
                    </button>
                    </div>
                </td>
                </tr>
                <tr className="spacer" ></tr>
                </>
            )
        })
    }
 
    componentDidMount() {
        var token = localStorage.getItem('token');
        console.log(token);
        axios.get(`http://127.0.0.1:8000/api/system/registration`,
        {
             headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              console.log(res.data);
              this.setState({registration:res.data.registrations});

          }
        }).catch(function (error) {
          alert(error);
        })
    }

  render() {
    return (
    <div className="page-wrapper">
        <MenuHorizontal />
        <div className="page-container">
        <MenuVertical />
        <div className="main-content">
            <div>
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                    {/* MANAGER Company*/}
                    <div className="row">
                        <div className="col-md-12">
                        <h3 className="title-5 m-b-35 manage__company--notification">
                            Manager Registration
                        </h3>
                        <div className="table-data__tool">
                            <div className="table-data__tool-left">
                            <div className="rs-select2--light rs-select2--sm">
                                <select
                                className="js-select2 select--today__adminAccount"
                                name="time"
                                >
                                <option defaultValue>Today</option>
                                <option value>3 Days</option>
                                <option value>1 Week</option>
                                <option value>1 Month</option>
                                </select>
                                <div className="dropDownSelect2" />
                            </div>
                            <button className="au-btn-filter ml-5">
                                <i className="zmdi zmdi-filter-list" />
                                filters
                            </button>
                            </div>
                        </div>
                        <div className="table-responsive table-responsive-data2">
                            <table className="table table-data2">
                            <thead>
                                <tr>
                                <th />
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>Field</th>
                                <th>Workforce</th>
                                <th />
                                </tr>
                            </thead>
                            <tbody>
                            {/* Loop to show data in table */}
                                {this.getRowsOfTable()}                    
                            {/* End Loop */}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    {/*END MANAGER Company*/}
                    <div className="row">
                        <div className="col-md-12">
                        <div className="copyright">
                            <p>
                            Copyright © 2020 Colorlib. All rights reserved.
                            Template by{" "}
                            <a href="https://colorlib.com">Colorlib</a>.
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Paginate */}
                {/* End Paginate */}
                {/* Modal Reject Reason  */}
                <RejectReasonModal/>
                {/* End Modal Reject Reason */}
                </div>
            </div>
        </div>
    </div>
    );
  }
}
