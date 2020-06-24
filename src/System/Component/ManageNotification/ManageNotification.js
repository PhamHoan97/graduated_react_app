import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import ModalCreateNotification from "./ModalCreateNotification";
import ModalSendNotification from "./ModalSendNotification";
import axios from "axios";
import host from '../../../Host/ServerDomain';
import { connect } from "react-redux";
import { getIdNotificationChoose } from "../../Action/Notification/Index";
import "../../Style/Notification/manageNotification.css";
import ReactExport from "react-export-excel";
import {showMessageAlert} from "../../../Alert/Action/Index";
import PieChartStatistic from "./PieChartStatistic";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ManageNotification extends Component {
  _isMounted = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      listNotification: [],
      statisticNotification: [],
      listResponses: [],
      dataChartQuestions: [],
      isDisplayStatistic: false,
      showModalCreateNotification: false,
      showModalSendNotification: false,
    };
  }
  UNSAFE_componentWillMount = () => {
    this.getListNotification();
  };
  getListNotification = () => {
    this._isMounted = true;
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .get(host + "/api/system/notification/list", {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        if(self._isMounted){
          if (response.data.error != null) {
            console.log(response.data.error);
          } else {
            self.setState({
              listNotification: response.data.notifications,
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteNotification = (e, idNotificationSystem) => {
    e.preventDefault();
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/system/notification/delete",
        {
          idNotificationSystem: idNotificationSystem,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
        } else {
          self.props.showAlert({
            message:'Xóa thông báo thành công ',
            anchorOrigin:{
                vertical: 'top',
                horizontal: 'right'
            },
            title:'Thành công',
            severity:'success'
          });
          self.getListNotification();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  closeCreateNotification = () => {
    this.setState({
      showModalCreateNotification: false,
    });
  };
  openCreateNotification = () => {
    this.setState({
      showModalCreateNotification: true,
    });
  };
  closeSendNotification = () => {
    this.setState({
      showModalSendNotification: false,
    });
  };
  openSendNotification = (idNotificationChoose) => {
    this.props.getIdNotificationChoose(idNotificationChoose);
    this.setState({
      showModalSendNotification: true,
    });
  };
  showStatisticNotification = (idNotificationChoose) => {
    var self = this;
    var token = localStorage.getItem("token");
    axios
      .post(
        host + "/api/system/notification/statistic",
        {
          idNotification: idNotificationChoose,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
          console.log(response.data.error);
        } else {
          self.setState({
            isDisplayStatistic: true,
            statisticNotification: response.data.statisticNotification,
          });
          self.getAllResponseNotification(idNotificationChoose);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getAllResponseNotification = (idNotificationSystem) => {
    let self = this;
    var token = localStorage.getItem("token");
    axios
      .get(
        host +
          "/api/system/notification/response/" +
          idNotificationSystem,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(function (response) {
        if (response.data.error != null) {
        } else {
          self.setState({
            listResponses: response.data.responseNotificationSystem,
          });
          self.setDataChartStatic(response.data.responseDataChartNotification,response.data.templateContentNotification)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  setDataChartStatic = (dataResponseChart,dataTemplate) =>{
    var keys = [];
    const colors = [
      '#0080ff','#0040ff','#0000ff',
      '#4000ff','#8000ff','#bf00ff',
      '#ff00ff','#ff00bf','#ff0080',
      '#ff0040','#ff0000'];
    var dataChartQuestions = [];
    for(var label in dataResponseChart[0]) keys.push(label);
    for(let j = 0;j<keys.length;j++){
      var dataChartQuestion = [];
      let key = keys[j];
      let listLabelValues = [];
      let nameQuestion = '';
      if(key !== "submit"){
        // Get {label,value} and nameQuestion in template with key
        for(let indexTemplate = 0;indexTemplate<dataTemplate.length;indexTemplate++){
          if(dataTemplate[indexTemplate].key === key){
            nameQuestion = dataTemplate[indexTemplate].label;
            var templateValues = dataTemplate[indexTemplate].values;
            templateValues.forEach(function(templateValue){
              listLabelValues.push({
                "label":templateValue.label,
                "value":templateValue.value
              })
            });
          }
        }
        for(let indexLabelValue = 0;indexLabelValue<listLabelValues.length;indexLabelValue++){
          var name = listLabelValues[indexLabelValue].label;
          var value = listLabelValues[indexLabelValue].value;
          var number = 0;
          for(let i = 0;i<dataResponseChart.length;i++){
            var arrayResponses = Object.entries(dataResponseChart[i]);
            for(var indexResponse = 0;indexResponse <arrayResponses.length;indexResponse++){
              if(arrayResponses[indexResponse][0] === key && arrayResponses[indexResponse][1] === value){
                number++;
              }
            }
          }
          // Add to dataChart
          dataChartQuestion.push({
            "name": name,
            "value": number
          });
        }
        // Create chart with question
        dataChartQuestions.push({
          'data':dataChartQuestion,
          'nameQuestion':nameQuestion,
          'color':colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }
    this.setState({
      dataChartQuestions:dataChartQuestions
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.isDisplayStatistic === true){
      document.getElementById("btn_export-excel").childNodes[0].childNodes[0].classList.add("addCssButtonExcel");
      document.getElementById("btn_export-excel").childNodes[0].childNodes[0].innerHTML = "Tải xuống";
    }
  }
  getAllExcelColum = () =>{
    var keys = [];
    for(var label in this.state.listResponses[0]) keys.push(label);
    return keys.map((value, key) => {
        return (
            <ExcelColumn label={value} value={value} key={key} />
        );
    });
  }
  render() {
    console.log(this.state.dataChartQuestions);
    return (
      <div className="page-wrapper">
        <MenuHorizontal />
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div>
              <div className="section__content section__content--p30">
                <div className="container-fluid">
                  {this.state.isDisplayStatistic === false ? (
                    <div></div>
                  ) : (
                    <>
                      <div className="row">
                        <div className="col-md-12">
                          <h3 className="title-5 m-b-35 manage__company--notification">
                            Thống kê
                          </h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h3 className="title-5 m-b-35 notification__name--statistic">
                            {this.state.statisticNotification.notificationName}
                          </h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="statistic__item statistic__item--green">
                            <h2 className="number">
                              {
                                this.state.statisticNotification
                                  .notificationUser
                              }
                            </h2>
                            <span className="desc">Tài khoản nhân viên</span>
                            <div className="icon">
                              <i className="zmdi zmdi-account-o" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="statistic__item statistic__item--orange">
                            <h2 className="number">
                              {
                                this.state.statisticNotification
                                  .notificationAdmin
                              }
                            </h2>
                            <span className="desc">Tài khoản công ty</span>
                            <div className="icon">
                              <i className="zmdi zmdi-shopping-cart" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="statistic__item statistic__item--blue">
                            <h2 className="number">
                              {
                                this.state.statisticNotification
                                  .responseUserAdmin
                              }
                            </h2>
                            <span className="desc">Phản hồi</span>
                            <div className="icon">
                              <i className="zmdi zmdi-calendar-note" />
                            </div>
                            <div id="btn_export-excel">
                              <ExcelFile >
                                  <ExcelSheet data={this.state.listResponses} name="Response">
                                      {
                                          this.getAllExcelColum()
                                      }
                                  </ExcelSheet>
                              </ExcelFile>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <h3 className="title-5 m-b-35 manage__company--notification">
                            Thống kế kết quả câu hỏi trong bản đánh giá
                          </h3>
                        </div>
                      </div>
                      <div className="row mb-5">
                        {this.state.dataChartQuestions.length !== 0 ? (
                              Object.values(this.state.dataChartQuestions).map(
                                (dataChart, index) => {
                                  return (
                                    <div className="col-4">
                                      <PieChartStatistic
                                      key={index}
                                      index = {index+1}
                                      data={dataChart.data}
                                      color={dataChart.color}
                                      title={dataChart.nameQuestion}
                                      />
                                    </div>
                                  )
                                }
                              )
                            ):(<div></div>)
                        }
                      </div>
                    </>
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="title-5 m-b-35 manage__company--notification">
                        Danh sách thông báo
                      </h3>
                      <div className="table-data__tool">
                        <div className="table-data__tool-left"></div>
                        <div className="table-data__tool-right">
                          <button
                            className="au-btn au-btn-icon au-btn--green au-btn--small"
                            onClick={() => this.openCreateNotification()}
                          >
                            <i className="zmdi zmdi-plus"></i>Thêm thông báo
                          </button>
                          <ModalCreateNotification
                            getListNotification={this.getListNotification}
                            showModal={this.state.showModalCreateNotification}
                            close={() => this.closeCreateNotification()}
                          />
                        </div>
                      </div>
                      <div className="table-responsive table-responsive-data2">
                        <table className="table table-data2 table-notification_system">
                          <thead className="thead-dark">
                            <tr>
                              <th style={{ width: "40%" }}>Tên</th>
                              <th style={{ width: "20%" }}>Mẫu</th>
                              <th style={{ width: "15%" }}>Ngày tạo</th>
                              <th style={{ width: "15%" }}>Trạng thái</th>
                              <th style={{ width: "10%" }}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.listNotification.length !== 0 ? (
                              Object.values(this.state.listNotification).map(
                                (notification, index) => {
                                  return (
                                    <tr key={notification.id}>
                                      <td style={{ width: "40%" }}>{notification.name}</td>
                                      <td style={{ width: "20%" }}>{notification.template_name}</td>
                                      <td className="desc" style={{ width: "15%" }}>
                                        {notification.date}
                                      </td>
                                      <td className="desc" style={{ width: "15%" }}>
                                        {parseInt(notification.status) === 1
                                          ? "Gửi"
                                          : "Chờ"}
                                      </td>
                                      <td style={{ width: "10%" }}>
                                        <div className="table-data-feature">
                                          {parseInt(notification.status) ===
                                          1 ? (
                                            <div></div>
                                          ) : (
                                            <>
                                              <button
                                                className="item"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Gửi"
                                                onClick={() =>
                                                  this.openSendNotification(
                                                    notification.id
                                                  )
                                                }
                                              >
                                                <i className="zmdi zmdi-notifications-active"></i>
                                              </button>
                                              <ModalSendNotification
                                                getListNotification={
                                                  this.getListNotification
                                                }
                                                showModal={
                                                  this.state
                                                    .showModalSendNotification
                                                }
                                                close={() =>
                                                  this.closeSendNotification()
                                                }
                                              />
                                            </>
                                          )}

                                          <button
                                            className="item"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Chi tiết"
                                            onClick={() =>
                                              this.showStatisticNotification(
                                                notification.id
                                              )
                                            }
                                          >
                                            <i className="zmdi zmdi-edit" />
                                          </button>
                                          <button
                                            className="item"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Xóa"
                                            onClick={(e) =>
                                              this.deleteNotification(
                                                e,
                                                notification.id
                                              )
                                            }
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
                                  );
                                }
                              )
                            ) : (
                              <tr></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getIdNotificationChoose: (idNotification) => {
      dispatch(getIdNotificationChoose(idNotification));
    },
    showAlert: (properties) => {
      dispatch(showMessageAlert(properties))
    }
  };
};
export default connect(null, mapDispatchToProps)(ManageNotification);
