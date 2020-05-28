import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/Template.scss";
import ModalTypeTemplate from "./ModalTypeTemplate";
import Header from "../../Header";
import Menu from "../../Menu";
import { isEmpty } from "validator";
import axios from 'axios';
import host from '../../../Host/ServerDomain';
import Alert from '@material-ui/lab/Alert';
import LinkPage from "../../LinkPage";

export default class Template extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isDisplayNewForm: false,
      listTemplate:[],
      jsonSchema: [],
      listTypeSystem:[],
      isDisplayAlert : false,
      idChooseType:0,
      newNameTemplate:'',
      newTypeTemplate:0,
      errorName: {},
      errorType: {},
      showModalCreateType: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getListTypeSystem();
    this.getListAllTemplateSystem();
  }

  getListTypeSystem = () => {
    var self =  this;
    var token = localStorage.getItem('token');
    var idAdmin = localStorage.getItem('admin_id')
    axios.get(host + "/api/system/notification/type/list/"+idAdmin,{
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
      if (response.data.error != null) {
        console.log(response.data.error);
      }else{
        self.setState({
          listTypeSystem:response.data.types
        })
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  getListAllTemplateSystem = () => {
    var self =  this;
    var token = localStorage.getItem('token');
    axios.get(host + "/api/system/notification/template/list",{
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function (response) {
      if (response.data.error != null) {
        console.log(response.data.error);
      }else{
        self.setState({
          listTemplate:response.data.templates
        })
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  handleClickNewFormBuilder = () => {
    var templates = document.getElementsByClassName("new-template");
    for(var i = 0; i < templates.length;i++){
      document.getElementsByClassName("new-template")[i].style.borderColor = '#b4bdce';
    }
    document.getElementById("border-template_new").style.borderColor = "#77252c";
    this.setState({ isDisplayNewForm: true });
  };

  handleClickTemplate = (idTemplate,jsonSchema) => {
    var templates = document.getElementsByClassName("new-template");
    for(var i = 0; i < templates.length;i++){
      document.getElementsByClassName("new-template")[i].style.borderColor = '#b4bdce';
    }
    document.getElementById("border-template"+idTemplate).style.borderColor = "#77252c";
    this.setState({
      jsonSchema: jsonSchema,
      isDisplayNewForm: false,
    });
  };

  closeType = () => {
    this.setState({
      showModalCreateType: false,
    });
  };

  openType = (e) => {
    e.preventDefault();
    this.setState({
      isDisplayNewForm:false,
      showModalCreateType: true,
    });
  };
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      isInputSelectChange:true,
      [name]:value
    });
  }
  componentDidUpdate() {
    if(this.state.isDisplayNewForm){
      window.builtformio();
    }
    window.displayForm(this.state.jsonSchema, true);
  }

  getDataForm = () => {
    if (isEmpty(this.state.newNameTemplate)) {
      var errorName = {
          selectedName: "Tên không được trống.",
      };
      this.setState({
          errorName: errorName,
      });
    }else{
      this.setState({
        errorName: {}
    });
    }
    if(parseInt(this.state.newTypeTemplate) === 0){
        var errorType = {
            selectedType: "Thể loại không được trống.",
        };
        this.setState({
            errorType: errorType,
        });
    }else{
      this.setState({
        errorType: {}
    });
    }
    if(!isEmpty(this.state.newNameTemplate) && parseInt(this.state.newTypeTemplate) !== 0){
      var builderSchema = localStorage.getItem("builderSchema");
      console.log(JSON.parse(builderSchema).components);
      if(JSON.parse(builderSchema).length === 0){
        this.setState({
          errorName: {},
          errorType: {},
        });
      }else{
        var self = this;
        var token = localStorage.getItem('token');
        axios.post(host + '/api/system/notification/template/create', {
          newNameTemplate: this.state.newNameTemplate,
          newTypeTemplate: this.state.newTypeTemplate,
          contentTemplate: JSON.parse(builderSchema).components
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                self.setState({
                  newNameTemplate:'',
                  newTypeTemplate:0,
                  errorName: {},
                  errorType: {},
                  isDisplayAlert : true
                });
                setTimeout(() => {
                    self.setState({isDisplayAlert : false});
                }, 2000);
                self.getListAllTemplateSystem();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        localStorage.removeItem("builderSchema");
      }
    }
  };
  displayAlert = () =>{
    if(this.state.isDisplayAlert){
        return <Alert severity="success">Lưu thành công</Alert>;
    }else{
        return <div></div>
    }
  }
  handleChangeSelectType(e) {
    var idChooseType = e.target.value;
    var self =  this;
    var token = localStorage.getItem('token');
    if(parseInt(idChooseType) === 0){
        axios.get(host + "/api/system/notification/template/list",{
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            self.setState({
                listTemplate:response.data.templates
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }else{
        axios.get(host + "/api/system/notification/template/list/"+idChooseType,{
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            self.setState({
              listTemplate:response.data.templates
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
  render() {
    const {errorName} = this.state;
    const {errorType} = this.state;
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
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card grow">
                  <LinkPage linkPage=" Giao diện form thông báo "/>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="card ctm-border-radius shadow-sm flex-fill grow manage-template_organization">
                      <div className="card-header d-flex align-items-center justify-content-between card-header_title-template">
                        <h4 className="card-title mb-0 d-inline-block">
                        </h4>
                        <a
                          href="create-review.html"
                          onClick={(e) => this.openType(e)}
                          className="btn btn-theme button-1 ctm-border-radius text-white float-right btn-create_type"
                        >
                          <span /> Tạo thể loại template
                        </a>
                        <ModalTypeTemplate
                          getListTypeSystem = {this.getListTypeSystem}
                          showModal={this.state.showModalCreateType}
                          close={() => this.closeType()}
                        />
                      </div>
                      <div className="card-body">
                        <div className="content">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-3 menu-left_template mt-3">
                                <div
                                  className="new-template"
                                  id="border-template_new"
                                >
                                  <img
                                    src={
                                      window.location.origin +
                                      "/system/images/notification/new_plus.png"
                                    }
                                    alt="new-template"
                                    onClick={() =>
                                      this.handleClickNewFormBuilder()
                                    }
                                  />
                                  <div className="description-template ml-5">
                                    <label>Tạo mới</label>
                                  </div>
                                </div>
                                <div className="template pt-5">
                                  <div className="label">
                                    <label>Danh sách Templates</label>
                                    <select
                                      className="form-control mb-5"
                                      name="idChooseType"
                                      onChange={(e) =>
                                        this.handleChangeSelectType(e)
                                      }
                                    >
                                      <option value="0">Chọn thể loại</option>
                                      {this.state.listTypeSystem.length ===
                                      0 ? (
                                        <option></option>
                                      ) : (
                                        Object.values(
                                          this.state.listTypeSystem
                                        ).map((type, index) => {
                                          return (
                                            <option value={type.id} key={index}>
                                              {type.name}
                                            </option>
                                          );
                                        })
                                      )}
                                    </select>
                                  </div>
                                  <div className="list-template">
                                    {this.state.listTemplate.length === 0 ? (
                                      <option></option>
                                    ) : (
                                      Object.values(
                                        this.state.listTemplate
                                      ).map((template, index) => {
                                        return (
                                          <div
                                            className="new-template mb-3"
                                            key={index}
                                            id={"border-template" + template.id}
                                          >
                                            <img
                                              src={
                                                window.location.origin +
                                                "/system/images/notification/new.png"
                                              }
                                              alt="template1"
                                              onClick={() =>
                                                this.handleClickTemplate(
                                                  template.id,
                                                  template.content
                                                )
                                              }
                                            />
                                            <div className="description-template ml-5">
                                              <label>{template.name}</label>
                                            </div>
                                          </div>
                                        );
                                      })
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-9">
                                {this.state.isDisplayNewForm === true ? (
                                  <div className="create-template">
                                    <div className="form-group">
                                      <label htmlFor="name">Tên</label>
                                      <input
                                        value={this.state.newNameTemplate}
                                        type="text"
                                        className="form-control"
                                        name="newNameTemplate"
                                        onChange={(event) =>
                                          this.handleChange(event)
                                        }
                                      />
                                      {errorName.selectedName && (
                                        <div
                                          className="validation"
                                          style={{
                                            display: "block",
                                            color: "red",
                                          }}
                                        >
                                          {errorName.selectedName}
                                        </div>
                                      )}
                                    </div>
                                    <div className="form-group mb-3">
                                      <label htmlFor="exampleFormControlSelect1">
                                        Danh sách thể loại
                                      </label>
                                      <br></br>
                                      <select
                                        className="form-control"
                                        name="newTypeTemplate"
                                        value={this.state.newTypeTemplate}
                                        onChange={this.handleChange}
                                      >
                                        <option value={0}>Chọn thể loại</option>
                                        {this.state.listTypeSystem.length ===
                                        0 ? (
                                          <option></option>
                                        ) : (
                                          Object.values(
                                            this.state.listTypeSystem
                                          ).map((type, index) => {
                                            return (
                                              <option
                                                value={type.id}
                                                key={index}
                                              >
                                                {type.name}
                                              </option>
                                            );
                                          })
                                        )}
                                      </select>
                                      {errorType.selectedType && (
                                        <div
                                          className="validation"
                                          style={{
                                            display: "block",
                                            color: "red",
                                          }}
                                        >
                                          {errorType.selectedType}
                                        </div>
                                      )}
                                    </div>
                                    <div className="form-group">
                                      <div id="builder"></div>
                                      <div
                                        id="errorNoComponent"
                                        style={{
                                          color: "red",
                                          display: "none",
                                        }}
                                      >
                                        Tạo nội dung template là yêu cầu bắt buộc
                                      </div>
                                    </div>
                                    <div className="form-group text-center">
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        id="submitSchema"
                                        onClick={() => this.getDataForm()}
                                      >
                                        Lưu
                                      </button>
                                    </div>
                                    {this.displayAlert()}
                                  </div>
                                ) : (
                                  <div className="preview">
                                    <label>Preview</label>
                                    <div className="content-template">
                                      <div className="preview-header">
                                        <img
                                          src={
                                            window.location.origin +
                                            "/system/images/notification/circle-header.png"
                                          }
                                          alt="icon-preview1"
                                        />
                                        <img
                                          src={
                                            window.location.origin +
                                            "/system/images/notification/circle-header.png"
                                          }
                                          alt="icon-preview2"
                                        />
                                        <img
                                          src={
                                            window.location.origin +
                                            "/system/images/notification/circle-header.png"
                                          }
                                          alt="icon-preview3"
                                        />
                                      </div>
                                      <div className="main">
                                        <div id="formio"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
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
      </div>
    );
  }
}
