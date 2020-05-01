import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import Select from "react-select";
import "../../Style/AccountEmployee/main.css";
import "../../Style/AccountEmployee/contact.css";
import "../../Style/AccountEmployee/util.css";
import * as host from '../../Constants/Url'
import Validator from '../../Utils/Validator';
import axios from 'axios'
import AccountItem from "./AccountItem";

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : '#FFF',
        color: 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
        fontFamily:'normal'
      };
    },
  };

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export default class AccountEmployee extends Component {

  constructor(props, context) {
    super(props, context);
    const rules = [
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'The username field is required.',
      },
      {
        field: 'username',
        method: 'isLength',
        args: [{min: 7}],
        validWhen: true,
        message: 'The username must be at least 7 characters.',
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'The password field is required.',
      },
      {
        field: 'password',
        method: 'isLength',
        args: [{min: 7}],
        validWhen: true,
        message: 'The password must be at least 7 characters.',
      },
      // {
      //   field: 'messageMailEmployee',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'The message field is required.',
      // }
    ];
    this.validator = new Validator(rules);
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  state = {
    selectedOption: null,
    username:'',
    password:'',
    errors: {},
    errorsSelect:{},
    options:[],
    listAccounts:[],
    employees:[],
  };

  rerenderParentCallback() {
    this.getAllEmployeeNoAccount();
    this.getListAccounts();
  }

  handleSubmitCreateAccount = (e) => {
    var errorNoEmployee = {};
    if(
      this.state.selectedOption === null
      ||!isEmpty(this.validator.validate(this.state).username)
      ||!isEmpty(this.validator.validate(this.state).password)
      )
    {
      errorNoEmployee = {
        "selectedOption":"Select employee is required."
      }
      this.setState({
        errors: this.validator.validate(this.state),
        errorsSelect:errorNoEmployee
      });
    }else{
      var self =  this;
      var token = localStorage.getItem('token');
      axios.post(host.URL_BACKEND+'/api/system/create/employee/account', {
          username: this.state.username,
          password: this.state.password,
          idEmployee:this.state.selectedOption.value,
      },{
          headers: { 'Authorization': 'Bearer ' + token }
      })
      .then(function (response) {
          if (response.data.error != null) {
              console.log(response.data.error);
          }else{
            document.getElementById("inputUserNameGenerate").value = '';
            document.getElementById("inputPasswordGenerate").value = '';
            self.setState({
                errors: {},
                errorsSelect:{},
                selectedOption: null,
                username:'',
                password:'',
            });
          }
      })
      .catch(function (error) {
          console.log(error);
      });
      this.getAllEmployeeNoAccount();
      this.getListAccounts();
    }
  };


  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]:value
    });
  }

  handleChangeEmployee = selectedOption => {
    this.setState({
      selectedOption,
    });
  };

  getAllEmployeeNoAccount=()=>{
    var self =  this;
    var token = localStorage.getItem('token');
    var idCompany = localStorage.getItem('company_id');
    axios.get(host.URL_BACKEND+'/api/system/account/employee/'+idCompany,{
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        }else{
          var options =  [];
          var employees = response.data.employees;
          for(var i = 0;i<employees.length;i++){
            options.push({
              'label':employees[i].name+'-'+employees[i].email,
              'value':employees[i].id
            })
          }
          self.setState({
            employees: employees,
            options: options
          })
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  getListAccounts = () =>{
    var self =  this;
    var token = localStorage.getItem('token');
    var idCompany = localStorage.getItem('company_id');
    axios.get(host.URL_BACKEND+'/api/system/account/list/'+idCompany,{
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
        if (response.data.error != null) {
            console.log(response.data.error);
        }else{
          self.setState({
            listAccounts: response.data.accounts,
          })
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    // get all employee no account
    this.getAllEmployeeNoAccount();
    this.getListAccounts();
  }

  generateAdminAccount = event => {
    var userNameEmployee = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    var passwordEmployee = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    document.getElementById("inputUserNameGenerate").value = userNameEmployee;
    document.getElementById("inputPasswordGenerate").value = passwordEmployee;
    this.setState({
      username:userNameEmployee,
      password:passwordEmployee
    });
  }

  showItemAccount = (accounts) => {
    var result;
    if(accounts.length > 0){
        result = accounts.map((account,index)=>{
            return (
              <AccountItem
                rerenderParentCallback={this.rerenderParentCallback}
                key={index}
                idEmployee={account.employee_id}
                name={ account.name}
                username={account.username}
                email={account.email}
                idAccount={account.id}
                department_name = {account.department_name}
                initial_password = {account.initial_password}
              />
            )
        })
        return result;
    }else{
        return (
            <tr></tr>
        )
    }
  }

  sendEmailAccount = (e,email,password) =>{
    e.preventDefault();
    console.log(email);
    console.log(password);
  }

  render() {
    console.log('Render account employee');
    const { selectedOption } = this.state;
    const { options } = this.state;
    const {errors} = this.state;
    const {errorsSelect} = this.state;
    return (
      <div className="page-wrapper">
        <MenuHorizontal />
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <section id="contact">
                      <div className="section-content">
                        <h1 className="section-header">
                          Welcome{" "}
                          <span
                            className="content-header wow fadeIn "
                            data-wow-delay="0.2s"
                            data-wow-duration="2s"
                          >
                            {" "}
                            Manage Account Employee
                          </span>
                        </h1>
                      </div>
                      <div className="contact-section text-left">
                        <form>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-6 form-line">
                              <div className="form-group">
                                  <label htmlFor="exampleInputUsername">
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputUserNameGenerate"
                                    name="username"
                                    placeholder="username"
                                    onChange={(event)=>this.handleChange(event)}
                                  />
                                  {errors.userNameEmployee && <div className="validation" style={{display: 'block'}}>{errors.userNameEmployee}</div>}
                                </div>
                                <div className="form-group">
                                  <label htmlFor="exampleInputUsername">
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="inputPasswordGenerate"
                                    name="password"
                                    onChange={(event)=>this.handleChange(event)}
                                    placeholder="password"/>
                                  {errors.passwordEmployee && <div className="validation" style={{display: 'block'}}>{errors.passwordEmployee}</div>}

                                </div>
                                <div>
                                  <button
                                    onClick={(event) => this.generateAdminAccount(event)}
                                    type="button"
                                    className="btn btn-default submit"
                                  >
                                    <i
                                      className="fa fa-refresh"
                                      aria-hidden="true"
                                    />{" "}
                                    Generate Account
                                  </button>
                                </div>
                              </div>
                              <div className="col-md-6">
                              <div className="form-group">
                                  <label htmlFor="telephone">Employee</label>
                                  <Select
                                    styles={colourStyles}
                                    value={selectedOption}
                                    onChange={this.handleChangeEmployee}
                                    options={options}
                                  />
                                  {errorsSelect.selectedOption && <div className="validation" style={{display: 'block'}}>{errorsSelect.selectedOption}</div>}
                                </div>
                                <br></br>
                                {/* <div className="form-group">
                                  <label htmlFor="description"> Message</label>
                                  <textarea
                                    className="form-control"
                                    id="description"
                                    name="messageMailEmployee"
                                    placeholder="Enter Your Message"
                                    onChange={(event)=>this.handleChange(event)}
                                  />
                                  {errors.messageMailEmployee && <div className="validation" style={{display: 'block'}}>{errors.messageMailEmployee}</div>}

                                </div> */}
                                <div>
                                  {/* <button
                                    type="button"
                                    className="btn btn-primary submit mr-5"
                                  >
                                    <i
                                      className="fa fa-paper-plane"
                                      aria-hidden="true"
                                    />{" "}
                                    Send Email
                                  </button> */}
                                  <button
                                    type="button"
                                    className="btn btn-primary submit create-account"
                                    onClick={(e)=> this.handleSubmitCreateAccount(e)}
                                  >
                                    <i
                                      className="fa fa-plus-circle"
                                      aria-hidden="true"
                                    />{" "}
                                    Create Account
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* <div className="row mt-5 ml-5">
                                <Alert severity="info">Send email success !!!</Alert>
                            </div> */}
                          </div>
                        </form>
                      </div>
                    </section>
                    <div className="limiter text-left">
                        <div className="wrap-table100">
                          <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                              <table>
                                <thead>
                                  <tr className="row100 head">
                                    <th className="cell100 column1">Email</th>
                                    <th className="cell100 column2">
                                      Username
                                    </th>
                                    <th className="cell100 column3">Name</th>
                                    <th className="cell100 column4">Department</th>
                                    <th className="cell100 column5">
                                    </th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                            <div className="table100-body js-pscroll">
                              <table>
                                <tbody>
                                    {this.showItemAccount(this.state.listAccounts)}
                                </tbody>
                              </table>
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
