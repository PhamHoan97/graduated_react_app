import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import '../../Style/DetailNotification/detailnotification.css'
import axios from "axios";
import * as host from "../../Constants/Url";
import Alert from '@material-ui/lab/Alert';
import {connect} from "react-redux";
import { NavLink } from "react-router-dom";
class DetailCompanyNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayContentForm:true,
      isDisplayAlert: false,
      detailNotification: this.props.detailNotificationAdmin,
    };
  }

  componentDidMount() {
    if(this.state.isDisplayContentForm && this.props.detailNotificationAdmin.length !== 0){
      window.displayForm(this.props.detailNotificationAdmin[0].template_content, false);
    }
  }

  handleClick = (e, idNotificationAdmin) => {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("dataForm")).data);
    var self = this;
    var idAdmin = localStorage.getItem("admin_id");
    var token = localStorage.getItem("token");
    axios.post(host.URL_BACKEND + "/api/system/notification/company/create/response",{
      idNotificationAdmin:idNotificationAdmin,
      idAdmin:idAdmin,
      contentResponse:JSON.parse(localStorage.getItem("dataForm")).data
    },{
      headers: { Authorization: "Bearer " + token },
    })
    .then(function (response) {
      if (response.data.error != null) {
        console.log(response.data.error);
      } else {
        self.setState({
          isDisplayAlert: true,
          detailNotification:[],
          isDisplayContentForm : false
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  showContentForm = () =>{
    if(this.state.detailNotification.length === 0 && this.state.isDisplayContentForm === true){
      return(
        <div></div>
      )
    }
    if(this.state.detailNotification.length === 0 && this.state.isDisplayContentForm === false){
      return (
        <form className="contact100-form validate-form">
          <span className="contact100-form-title">
          </span>
          <div className="description">
              Tôi xin chân thành cảm ơn ông/bà đã dành thời gian phản hồi thư này
          </div>
          <div>
            <button type="button" class="btn btn-primary">
              <NavLink
                to={"/system/company/notification/list"}
                exact
                activeClassName="selected"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#0074D9",
                }}
              >
              Back
              </NavLink>
            </button>
          </div>
        </form>
      )
    }
    if(this.state.detailNotification.length !== 0 && this.state.isDisplayContentForm === true){
      return (
        <form className="contact100-form validate-form">
          <span className="contact100-form-title">
            {this.state.detailNotification[0].name}
          </span>
          <div className="description">
            {this.state.detailNotification[0].description}
          </div>
          <div className="content-formio">
            <div id="formio"></div>
            <a
              name=""
              id="sendDatabase"
              style={{ display: "none" }}
              className="btn btn-primary"
              href="##"
              role="button"
              onClick={(e) =>
                this.handleClick(e,this.props.match.params.id)
              }
            >
              Display
            </a>
            {this.state.isDisplayAlert === true
              ? (<Alert severity="success">Response success to system !</Alert>)
              : ""}
          </div>
        </form>
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
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="container-contact100">
                      <div className="wrap-contact100">
                        {
                         this.showContentForm()
                        }
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
const mapStateToProps = (state, ownProps) => {
  return {
      detailNotificationAdmin : state.systemReducers.notificationReducer.detailNotificationAdmin,
  }
}

export default connect(mapStateToProps,null )(DetailCompanyNotification);

