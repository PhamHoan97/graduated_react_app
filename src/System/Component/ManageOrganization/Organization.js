import React, { Component } from "react";
import "../../Style/Organization/orgChart.css";
import ModalDepartment from "./Modal/ModalDepartment";
import ModalUser from "./Modal/ModalUser";
import ModalRole from "./Modal/ModalRole";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import ChartOranization from './ChartOranization';
import axios from "axios";
import * as host from '../../Constants/Url'

export default class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalDepartment: false,
      showModalUser: false,
      showModalRoler: false,
      dataChart:[]
    };
  }

  getDataOrganization = () =>{
      var self = this;
      var idCompany = localStorage.getItem('company_id');
      var token = localStorage.getItem('token');
      axios.post(host.URL_BACKEND+'/api/system/organization/chart', {
          idCompany:idCompany
      },{
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then(function (response) {
        if(response.data.error != null){
          console.log(response.data.error);
        }else{
          self.setState({
            dataChart:response.data.dataOrganization,
            showModalDepartment: false,
            showModalRole: false,
            showModalUser: false,
          })
        }
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.getDataOrganization();
  }

  closeDepartment = () => {
    // connect database to get new json of organization and update state 
    this.getDataOrganization();
  };

  openDepartment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModalDepartment: true });
  };

  closeRole = () => {
    // connect database to get new json of organization and update state 
    this.getDataOrganization();
  };

  openRole = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModalRole: true });
  };

  closeUser = () => {
    this.getDataOrganization();
  };

  openUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModalUser: true });
  };

  render() {
    return (
      <div className="page-wrapper">
        <MenuHorizontal />
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div className="main-content">
              <div className="section__content section__content--p30 content__organization">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 org--chart_content">
                      <div className="org--chart_menu">
                        <div className="container-fluid">
                          <div className="row text-center">
                            <div className="col-md-4">
                              <a
                                href="##"
                                className="org--chart_feature"
                                onClick={(e) => this.openDepartment(e)}
                              >
                                <i
                                  className="fa fa-university fa-2x"
                                  aria-hidden="true"
                                ></i>
                                <p>Manage Department</p>
                              </a>
                            </div>
                            <div className="col-md-4">
                              <a
                                href="##"
                                className="org--chart_feature"
                                onClick={(e) => this.openRole(e)}
                              >
                                <i
                                  className="fa fa-bar-chart fa-2x"
                                  aria-hidden="true"
                                ></i>
                                <p>Manage Role</p>
                              </a>
                            </div>
                            <div className="col-md-4">
                              <a
                                href="##"
                                className="org--chart_feature"
                                onClick={(e) => this.openUser(e)}
                              >
                                <i
                                  className="fa fa-user-circle fa-2x"
                                  aria-hidden="true"
                                ></i>
                                <p>Manage Employee</p>
                              </a>
                              <ModalDepartment
                                showModal={this.state.showModalDepartment}
                                close={() => this.closeDepartment()}
                              />
                              <ModalRole
                                showModal={this.state.showModalRole}
                                close={() => this.closeRole()}
                              />
                              <ModalUser
                                showModal={this.state.showModalUser}
                                close={() => this.closeUser()}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                      <div className="org-chart text-left">
                          <div className="container-fluid">
                              <div className="row">
                                  <div className="col-md-12">
                                  <div style={{height: '100%'}}>
                                  <ChartOranization nodes={this.state.dataChart} />
                                  </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="copyright">
                        <p>
                          Copyright © 2018 Colorlib. All rights reserved.
                          Template by{" "}
                          <a href="https://colorlib.com">Colorlib</a>.
                        </p>
                      </div>
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
