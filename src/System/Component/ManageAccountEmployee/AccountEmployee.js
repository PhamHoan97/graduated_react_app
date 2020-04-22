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
        field: 'userNameEmployee',
        method: 'isEmpty',
        validWhen: false,
        message: 'The username field is required.',
      },
      {
        field: 'userNameEmployee',
        method: 'isLength',
        args: [{min: 7}],
        validWhen: true,
        message: 'The username must be at least 7 characters.',
      },
      {
        field: 'passwordEmployee',
        method: 'isEmpty',
        validWhen: false,
        message: 'The password field is required.',
      },
      {
        field: 'passwordEmployee',
        method: 'isLength',
        args: [{min: 7}],
        validWhen: true,
        message: 'The password must be at least 7 characters.',
      },
      {
        field: 'messageMailEmployee',
        method: 'isEmpty',
        validWhen: false,
        message: 'The message field is required.',
      }
    ];
    this.validator = new Validator(rules);
  }

  handleSubmitCreateAccount = (e) => {
    // console.log(isEmpty(this.validator.validate(this.state)));
    var errorNoEmployee = {};
    if(this.state.selectedOption === null || !isEmpty(this.validator.validate(this.state)) ){
      errorNoEmployee = {
        "selectedOption":"Select employee is required."
      }
      this.setState({
        errors: this.validator.validate(this.state),
        errorsSelect:errorNoEmployee
      });
    }else{
      this.setState({
        errors: {},
        errorsSelect:{}
      });
      console.log('Create account data');
    }
  };

  state = {
    selectedOption: null,
    email:'',
    userNameEmployee:'',
    passwordEmployee:'',
    messageMailEmployee:'',
    errors: {},
    errorsSelect:{},
    options:[],
    listAccount:[],
    employees:[],
  };

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]:value
    });
  }

  handleChangeEmployee = selectedOption => {
    var employees = this.state.employees;
    var value = selectedOption.value;
    var emailChoose;
    for(var i = 0;i<employees.length;i++){
      if(employees[i].id === value){
        emailChoose = employees[i].email;
      }
    }
    this.setState({
      selectedOption,
      email:emailChoose
    });
  };

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    // get all employee no account
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
          console.log(response.data.employees)
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

  generateAdminAccount = event => {
    var userNameEmployee = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    var passwordEmployee = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    document.getElementById("inputUserNameGenerate").value = userNameEmployee;
    document.getElementById("inputPasswordGenerate").value = passwordEmployee;
    this.setState({
      userNameEmployee:userNameEmployee,
      passwordEmployee:passwordEmployee
    });
  }

  render() {
    const { selectedOption } = this.state;
    const { options } = this.state;
    const {errors} = this.state;
    const {errorsSelect} = this.state;
    console.log(this.state);
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
                                    name="userNameEmployee"
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
                                    name="passwordEmployee"
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
                                <div className="form-group">
                                  <label htmlFor="description"> Message</label>
                                  <textarea
                                    className="form-control"
                                    id="description"
                                    name="messageMailEmployee"
                                    placeholder="Enter Your Message"
                                    onChange={(event)=>this.handleChange(event)}
                                  />
                                  {errors.messageMailEmployee && <div className="validation" style={{display: 'block'}}>{errors.messageMailEmployee}</div>}

                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-primary submit mr-5"
                                  >
                                    <i
                                      className="fa fa-paper-plane"
                                      aria-hidden="true"
                                    />{" "}
                                    Send Email
                                  </button>
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
                                    <th className="cell100 column1">
                                      Employee name
                                    </th>
                                    <th className="cell100 column2">
                                      Username
                                    </th>
                                    <th className="cell100 column3">Email</th>
                                    <th className="cell100 column4">
                                      Password
                                    </th>
                                    <th className="cell100 column5">Role</th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                            <div className="table100-body js-pscroll">
                              <table>
                                <tbody>
                                  <tr className="row100 body">
                                    <td className="cell100 column1">
                                      Like a butterfly
                                    </td>
                                    <td className="cell100 column2">Boxing</td>
                                    <td className="cell100 column3">
                                      9:00 AM - 11:00 AM
                                    </td>
                                    <td className="cell100 column4">
                                      Aaron Chapman
                                    </td>
                                    <td className="cell100 column5">10</td>
                                  </tr>
                                  <tr className="row100 body">
                                    <td className="cell100 column1">
                                      Mind &amp; Body
                                    </td>
                                    <td className="cell100 column2">Yoga</td>
                                    <td className="cell100 column3">
                                      8:00 AM - 9:00 AM
                                    </td>
                                    <td className="cell100 column4">
                                      Adam Stewart
                                    </td>
                                    <td className="cell100 column5">15</td>
                                  </tr>
                                  <tr className="row100 body">
                                    <td className="cell100 column1">
                                      Crit Cardio
                                    </td>
                                    <td className="cell100 column2">Gym</td>
                                    <td className="cell100 column3">
                                      9:00 AM - 10:00 AM
                                    </td>
                                    <td className="cell100 column4">
                                      Aaron Chapman
                                    </td>
                                    <td className="cell100 column5">10</td>
                                  </tr>
                                  <tr className="row100 body">
                                    <td className="cell100 column1">
                                      Mind &amp; Body
                                    </td>
                                    <td className="cell100 column2">Yoga</td>
                                    <td className="cell100 column3">
                                      8:00 AM - 9:00 AM
                                    </td>
                                    <td className="cell100 column4">
                                      Adam Stewart
                                    </td>
                                    <td className="cell100 column5">15</td>
                                  </tr>
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
