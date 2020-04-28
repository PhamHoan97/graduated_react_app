import React, { Component } from "react";
import "../../Style/Organization/orgChart.css";
import ModalDepartment from "../../Component/ManageOrganization/Modal/ModalDepartment";
import ModalUser from "../../Component/ManageOrganization/Modal/ModalUser";
import ModalRole from "../../Component/ManageOrganization/Modal/ModalRole";
import MenuVertical from "../../Component/Menu/MenuVertical";
import MenuHorizontal from "../../Component/Menu/MenuHorizontal";
import ChartOranization from '../../Component/ManageOrganization/ChartOranization';
import axios from "axios";
import * as host from '../../Constants/Url'
import {connect} from  'react-redux';
import {hideEditDepartment} from '../../Action/Organization/Department/Index';
import {hideNewDepartment} from '../../Action/Organization/Department/Index';
import {hideEditRole} from '../../Action/Organization/Role/Index';
import {hideNewRole} from '../../Action/Organization/Role/Index';
import {hideEditEmployee} from '../../Action/Organization/User/Index';
import {hideNewEmployee} from '../../Action/Organization/User/Index';
class OrganizationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalDepartment: false,
      showModalUser: false,
      showModalRoler: false,
      listRole:[],
      listUser: [],
      listDepartment: [],
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

  getAllDataDepartment =()=>{
    let self = this;
    var idCompany = localStorage.getItem('company_id');
    var token = localStorage.getItem('token');
    axios.get(host.URL_BACKEND+'/api/system/organization/department/'+idCompany,{
        headers: {'Authorization': 'Bearer '+token}
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        } else {
            self.setState({
                showModalDepartment: true,
                listDepartment: JSON.parse(JSON.stringify(response.data.departmentCompany))
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  getAllDataRole =() =>{
    let self = this;
    var idCompany = localStorage.getItem('company_id');
    var token = localStorage.getItem('token');
    axios.get(host.URL_BACKEND+'/api/system/organization/role/'+idCompany,{
        headers: {'Authorization': 'Bearer '+token}
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        } else {
            self.setState({
                showModalRole: true,
                listRole: JSON.parse(JSON.stringify(response.data.roles))
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  getAllDataEmployee = () =>{
    let self = this;
    var idCompany = localStorage.getItem('company_id');
    var token = localStorage.getItem('token');
    axios.get(host.URL_BACKEND+'/api/system/organization/company/'+idCompany+'/employee',{
        headers: {'Authorization': 'Bearer '+token}
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        } else {
            self.setState({
                showModalUser: true,
                listUser: JSON.parse(JSON.stringify(response.data.employees))
            });
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
    this.props.hideEditDepartment();
    this.props.hideNewDepartment();
  };

  openDepartment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.getAllDataDepartment();
  };

  closeRole = () => {
    // connect database to get new json of organization and update state 
    this.getDataOrganization();
    this.props.hideEditRole();
    this.props.hideNewRole();
  };

  openRole = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.getAllDataRole();
  };

  closeUser = () => {
    this.getDataOrganization();
    this.props.hideEditEmployee();
    this.props.hideNewEmployee();
  };

  openUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.getAllDataEmployee();
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
                                listDepartment = {this.state.listDepartment}
                                showModal={this.state.showModalDepartment}
                                close={() => this.closeDepartment()}
                              />
                              <ModalRole
                                listRole = {this.state.listRole}
                                showModal={this.state.showModalRole}
                                close={() => this.closeRole()}
                              />
                              <ModalUser
                                listUser = {this.state.listUser}
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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        hideEditDepartment:()=>{
            dispatch(hideEditDepartment())
        },
        hideNewDepartment:()=>{
            dispatch(hideNewDepartment())
        },
        hideEditRole:()=>{
            dispatch(hideEditRole())
        },
        hideNewRole:()=>{
            dispatch(hideNewRole())
        },
        hideEditEmployee:()=>{
            dispatch(hideEditEmployee())
        },
        hideNewEmployee:()=>{
            dispatch(hideNewEmployee())
        }
    }
}
export default connect(null,mapDispatchToProps)(OrganizationContainer)
