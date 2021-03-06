import React, { Component } from "react";
import "../../Style/Process/process.css";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import axios from "axios";
import host from '../../../Host/ServerDomain';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getDetailNotificationAdmin } from "../../Action/Notification/Index";

class ListCompanyNotification extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      listCompanyNotification:[]
    }
  }
  componentDidMount() {
    this._isMounted = true;
    let self = this;
    var token = localStorage.getItem("token");
    var idAdmin = localStorage.getItem("admin_id");
    axios.post(host + "/api/system/notification/company/list",{
      idAdmin:idAdmin
    },{
      headers: { Authorization: "Bearer " + token },
    })
    .then(function (response) {
      if(self._isMounted){
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.setState({
            listCompanyNotification: response.data.notificationAdmins,
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getDetailNotificationToAdmin = (idNotificationAdmin) =>{
    var self = this;
    var token = localStorage.getItem("token");
    axios.post(host + "/api/system/notification/company/response",{
      idNotificationAdmin:idNotificationAdmin
    },{
      headers: { Authorization: "Bearer " + token },
    })
    .then(function (response) {
      if (response.data.error != null) {
        console.log(response.data.error);
      } else {
         self.props.getDetailNotificationAdmin(response.data.notificationAdmin)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  showListCompanyNotification = (notifications) =>{
    var result;
    if(notifications.length > 0){
        result = notifications.map((notification,index)=>{
            return (
                <tr className="tr-shadow" key={index}>
                <td>
                  <label className="au-checkbox">
                    <input type="checkbox" />
                    <span className="au-checkmark" />
                  </label>
                </td>
                <td>{notification.name}</td>
                <td className="desc">{notification.template_name}</td>
                <td>{notification.date}</td>
                <td>
                  <span className="status--process">
                  {
                    parseInt(notification.status)===1 ? ('???? ph???n h???i'):('??ang ch???')
                  }
                  </span>
                </td>
                <td>
                  <div className="table-data-feature">
                    {
                      parseInt(notification.status)===1 ? (<div></div>):(
                        <button
                        className="item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Ph???n h???i"
                        onClick={this.getDetailNotificationToAdmin(notification.id)}
                        >
                        <NavLink
                          to={"/system/company/notification/detail/"+notification.id}
                          exact
                          activeClassName="selected"
                          activeStyle={{
                            fontWeight: "bold",
                            color: "#0074D9",
                          }}
                        >
                        <i className="zmdi zmdi-edit" />
                        </NavLink>
                        </button>
                      )
                    }
                    <button
                      className="item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="X??a"
                    >
                      <i className="zmdi zmdi-delete" />
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
            )
        })
        return result;
    }else{
        return (
            <tr></tr>
        )
    }
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
                  <div className="row">
                    <div className="col-md-12">
                      {/* DATA TABLE*/}
                      <section className="p-t-20">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <h3 className="title-5 m-b-35 manage__process--title">
                                Qu???n l?? th??ng b??o
                              </h3>
                              <div className="table-data__tool">
                                <div className="table-data__tool-left">
                                  <div className="rs-select2--light rs-select2--sm">
                                    <select
                                      className="js-select2 select--today__process"
                                      name="time"
                                    >
                                      <option defaultValue>H??m nay</option>
                                      <option value>3 ng??y g???n ????y</option>
                                      <option value>1 tu???n g???n ????y</option>
                                      <option value>1 th??ng g???n ????y</option>
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
                                      <th>
                                        <label className="au-checkbox">
                                          <input type="checkbox" />
                                          <span className="au-checkmark" />
                                        </label>
                                      </th>
                                      <th>t??n th??ng b??o</th>
                                      <th>m?? t???</th>
                                      <th>ng??y t???o</th>
                                      <th>tr???ng th??i</th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.showListCompanyNotification(this.state.listCompanyNotification)}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      {/* END DATA TABLE*/}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="copyright">
                        <p>
                          Copyright ?? 2018 Colorlib. All rights reserved.
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
    getDetailNotificationAdmin: (detailNotificationAdmin) => {
      dispatch(getDetailNotificationAdmin(detailNotificationAdmin));
    },
  };
};
export default connect(null,mapDispatchToProps)(ListCompanyNotification);
