import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Contact.scss";
import "../Style/Main.scss";
import "../Style/Util.scss";
import Header from "../../Header";
import Menu from "../../Menu";
import Validator from "../Utils/Validator";
import host from '../../../Host/ServerDomain'; 
import Select from "react-select";
import axios from "axios";
import LinkPage from "../../LinkPage";
import AccountItem from "./AccountItem";
import {connect} from "react-redux";
import {showMessageAlert} from "../../../Alert/Action/Index"
const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "red" : "#FFF",
      color: "black",
      cursor: isDisabled ? "not-allowed" : "default",
      fontFamily: "normal",
    };
  },
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
class Account extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    const rules = [
      {
        field: "username",
        method: "isEmpty",
        validWhen: false,
        message: "The username field is required.",
      },
      {
        field: "username",
        method: "isLength",
        args: [{ min: 7 }],
        validWhen: true,
        message: "The username must be at least 7 characters.",
      },
      {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "The password field is required.",
      },
      {
        field: "password",
        method: "isLength",
        args: [{ min: 7 }],
        validWhen: true,
        message: "The password must be at least 7 characters.",
      },
    ];
    this.validator = new Validator(rules);
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  state = {
    selectedOption: null,
    username: "",
    password: "",
    errors: {},
    errorsSelect: {},
    options: [],
    listAccounts: [],
    employees: [],
  };

  rerenderParentCallback() {
    this.getAllEmployeeNoAccount();
    this.getListAccounts();
  }

  handleSubmitCreateAccount = (e) => {
    var errorNoEmployee = {};
    if (
      this.state.selectedOption === null ||
      !isEmpty(this.validator.validate(this.state).username) ||
      !isEmpty(this.validator.validate(this.state).password)
    ) {
      errorNoEmployee = {
        selectedOption: "Select employee is required.",
      };
      this.setState({
        errors: this.validator.validate(this.state),
        errorsSelect: errorNoEmployee,
      });
    } else {
      var self = this;
      var token = localStorage.getItem("token");
      axios
        .post(
          host + "/api/company/create/employee/account",
          {
            username: this.state.username,
            password: this.state.password,
            idEmployee: this.state.selectedOption.value,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(function (response) {
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            document.getElementById("inputUserNameGenerate").value = "";
            document.getElementById("inputPasswordGenerate").value = "";
            self.setState({
              errors: {},
              errorsSelect: {},
              selectedOption: null,
              username: "",
              password: "",
            });
            self.getAllEmployeeNoAccount();
            self.getListAccounts();
            self.props.showAlert({
              message:'Tạo tài khoản thành công ',
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'center'
              },
              title:'Success',
              severity:'success'
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };


  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleChangeEmployee = (selectedOption) => {
    this.setState({
      selectedOption,
    });
  };

  getAllEmployeeNoAccount = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host + "/api/company/account/employee/" + token, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            var options = [];
            var employees = response.data.employees;
            for (var i = 0; i < employees.length; i++) {
              options.push({
                label: employees[i].name + "-" + employees[i].email,
                value: employees[i].id,
              });
            }
            self.setState({
              employees: employees,
              options: options,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getListAccounts = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host + "/api/company/account/list/" + token, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listAccounts: response.data.accounts,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  componentDidMount() {
    // get all employee no account
    this.getAllEmployeeNoAccount();
    this.getListAccounts();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  generateAdminAccount = (event) => {
    var userNameEmployee =
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7);
    var passwordEmployee =
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7);
    document.getElementById("inputUserNameGenerate").value = userNameEmployee;
    document.getElementById("inputPasswordGenerate").value = passwordEmployee;
    this.setState({
      username: userNameEmployee,
      password: passwordEmployee,
    });
  };

  showItemAccount = (accounts) => {
    var result;
    if (accounts.length > 0) {
      result = accounts.map((account, index) => {
        return (
          <AccountItem
            rerenderParentCallback={this.rerenderParentCallback}
            key={index}
            idEmployee={account.employee_id}
            name={account.name}
            username={account.username}
            email={account.email}
            idAccount={account.id}
            department_name={account.department_name}
            initial_password={account.initial_password}
          />
        );
      });
      return result;
    } else {
      return <tr></tr>;
    }
  };

  sendEmailAccount = (e, email, password) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };
  render() {
    const { selectedOption } = this.state;
    const { options } = this.state;
    const { errors } = this.state;
    const { errorsSelect } = this.state;
    return (
      <div className="inner-wrapper manage-organization_template">
        <Header />
        <div
          className="page-wrapper_organization"
          style={{ transform: "none" }}
        >
          <div className="container-fluid" style={{ transform: "none" }}>
            <div className="row" style={{ transform: "none" }}>
              <div
                className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar"
                style={{
                  position: "relative",
                  overflow: "visible",
                  boxSizing: "border-box",
                  minHeight: "1px",
                }}
              >
                <Menu/>
              </div>
              <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                  <LinkPage linkPage="Tài Khoản Nhân Viên" />
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill  manage-account_employee">
                      <section id="contact">
                        <div className="section-content">
                          <h1 className="section-header">
                            Chào mừng{" "}
                            <span
                              className="content-header wow fadeIn "
                              data-wow-delay="0.2s"
                              data-wow-duration="2s"
                            >
                              {" "}
                              Quản lí tài khoản công ty
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
                                      Tên đăng nhập
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputUserNameGenerate"
                                      name="username"
                                      placeholder="username"
                                      onChange={(event) =>
                                        this.handleChange(event)
                                      }
                                    />
                                    {errors.userNameEmployee && (
                                      <div
                                        className="validation"
                                        style={{ display: "block" }}
                                      >
                                        {errors.userNameEmployee}
                                      </div>
                                    )}
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="exampleInputUsername">
                                      Mật khẩu
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="inputPasswordGenerate"
                                      name="password"
                                      onChange={(event) =>
                                        this.handleChange(event)
                                      }
                                      placeholder="password"
                                    />
                                    {errors.passwordEmployee && (
                                      <div
                                        className="validation"
                                        style={{ display: "block" }}
                                      >
                                        {errors.passwordEmployee}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <button
                                      onClick={(event) =>
                                        this.generateAdminAccount(event)
                                      }
                                      type="button"
                                      className="btn btn-dark submit"
                                    >
                                      <i
                                        className="fa fa-refresh"
                                        aria-hidden="true"
                                      />{" "}
                                      Tự động sinh tài khoản
                                    </button>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="telephone">Danh sách nhân viên</label>
                                    <Select
                                      styles={colourStyles}
                                      value={selectedOption}
                                      onChange={this.handleChangeEmployee}
                                      options={options}
                                    />
                                    {errorsSelect.selectedOption && (
                                      <div
                                        className="validation"
                                        style={{ display: "block" }}
                                      >
                                        {errorsSelect.selectedOption}
                                      </div>
                                    )}
                                  </div>
                                  <br></br>
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-dark submit create-account"
                                      onClick={(e) =>
                                        this.handleSubmitCreateAccount(e)
                                      }
                                    >
                                      <i
                                        className="fa fa-plus-circle"
                                        aria-hidden="true"
                                      />{" "}
                                      Tạo tài khoản
                                    </button>
                                  </div>
                                </div>
                              </div>
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
                                      Tên tài khoản
                                    </th>
                                    <th className="cell100 column3">Tên nhân viên</th>
                                    <th className="cell100 column4">
                                      Tên phòng ban
                                    </th>
                                    <th className="cell100 column5"></th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                            <div className="table100-body js-pscroll">
                              <table>
                                <tbody>
                                  {this.showItemAccount(
                                    this.state.listAccounts
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
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
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  }
}
export default connect(null, mapDispatchToProps)(Account);
