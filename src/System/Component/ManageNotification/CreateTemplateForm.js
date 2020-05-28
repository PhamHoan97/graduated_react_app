import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import "../../Style/Notification/createTemplate.css";
import ModalTypeTemplate from "./ModalTypeTemplate";
import { isEmpty } from "validator";
import axios from 'axios';
import host from '../../../Host/ServerDomain';
import Alert from '@material-ui/lab/Alert';
export default class CreateTemplateForm extends Component {
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

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    this.getListTypeSystem();
    this.getListAllTemplateSystem();
  }

  getListTypeSystem = () => {
    var self =  this;
    var token = localStorage.getItem('token');
    axios.get(host + "/api/system/notification/type/list",{
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

  openType = () => {
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
    //this.getListTypeSystem();
    if(this.state.isDisplayNewForm){
      window.builtformio();
    }
    window.displayForm(this.state.jsonSchema, true);
  }

  getDataForm = () => {
    if (isEmpty(this.state.newNameTemplate)) {
      var errorName = {
          selectedName: "Select name is required.",
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
        axios.get(host +"/api/system/notification/template/list",{
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
        axios.get(host+"/api/system/notification/template/list/"+idChooseType,{
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
      <div className="page-wrapper page-template_notfication">
        <MenuHorizontal />
        <div className="page-container page-template_notfication">
          <MenuVertical />
          <div className="main-content text-left">
            <div className="manage text-center ">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-9"></div>
                  <div className="col-md-2">
                  <img
                        src={
                          window.location.origin +
                          "/system/images/notification/category.png"
                        }
                        alt="create-type"
                        onClick={() => this.openType()}
                      />
                      <div>Thêm thể loại</div>
                  </div>
                  <div className="col-md-1"></div>
                </div>
              </div>
              <ModalTypeTemplate
                getListTypeSystem = {this.getListTypeSystem}
                showModal={this.state.showModalCreateType}
                close={() => this.closeType()}
              />
            </div>
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-3 menu-left_template mt-3">
                    <div className="new-template"
                    id="border-template_new">
                      <img
                        src={
                          window.location.origin +
                          "/system/images/notification/new_plus.png"
                        }
                        alt="new-template"
                        onClick={() => this.handleClickNewFormBuilder()}
                      />
                      <div className="description-template ml-5">
                        <label className="mt-3">Tạo template</label>
                      </div>
                    </div>
                    <div className="template pt-5">
                      <div className="label">
                        <label>Templates</label>
                        <select
                          className="form-control mb-5"
                          name="idChooseType"
                          onChange={(e)=>this.handleChangeSelectType(e)}
                        >
                          <option value="0">Chọn thể loại</option>
                          {
                            (this.state.listTypeSystem.length === 0)?(<option></option>):(
                              Object.values(this.state.listTypeSystem).map((type, index) => {
                                return (<option value={type.id} key={index}>{ type.name}</option>)
                              })
                            )
                          }
                        </select>
                      </div>
                      <div className="list-template">
                        {
                          (this.state.listTemplate.length === 0)?(<option></option>):(
                            Object.values(this.state.listTemplate).map((template, index) => {
                              return (
                                <div className="new-template mb-3"
                                key={index}
                                id={"border-template"+template.id}
                                >
                                  <img
                                    src={
                                      window.location.origin +
                                      "/system/images/notification/new.png"
                                    }
                                    alt="template1"
                                    onClick={() => this.handleClickTemplate(template.id,template.content)}
                                  />
                                  <div className="description-template ml-5">
                                    <label className="mt-3">{template.name}</label>
                                  </div>
                                </div>
                              )
                            })
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    {this.state.isDisplayNewForm === true ? (
                      <div className="create-template">
                        <div className="form-group">
                          <label htmlFor="name">Tên</label>
                          <input
                              value = {this.state.newNameTemplate}
                              type="text"
                              className="form-control"
                              name="newNameTemplate"
                              onChange={(event) => this.handleChange(event)}
                          />
                          {errorName.selectedName && (
                              <div className="validation" style={{ display: "block",color: "red"}}>
                              {errorName.selectedName}
                              </div>
                          )}
                          </div>
                        <div className="form-group mb-3">
                          <label htmlFor="exampleFormControlSelect1">Thể loại</label>
                          <br></br>
                          <select
                              className="form-control"
                              name="newTypeTemplate"
                              value = {this.state.newTypeTemplate}
                              onChange={this.handleChange}
                          >
                              <option value={0}>Chọn thể loại</option>
                              {
                                (this.state.listTypeSystem.length === 0)?(<option></option>):(
                                  Object.values(this.state.listTypeSystem).map((type, index) => {
                                    return (<option value={type.id} key={index}>{ type.name}</option>)
                                  })
                                )
                              }
                          </select>
                          {errorType.selectedType && (
                              <div className="validation" style={{ display: "block",color: "red"}}>
                              {errorType.selectedType}
                              </div>
                          )}
                        </div>
                        <div className="form-group">
                          <div id="builder"></div>
                          <div id="errorNoComponent" style={{ color: 'red',display:'none'}}>
                            Thêm component là bắt buộc
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
                        {
                          this.displayAlert()
                        }
                      </div>
                    ) : (
                      <div className="preview">
                        <label>Preview</label>
                        <div className="content-template">
                          <div className="header">
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
            <div className="footer mt-3">
                <div className="text-center">
                    <div className="container-fluid">
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
      </div>
    );
  }
}
