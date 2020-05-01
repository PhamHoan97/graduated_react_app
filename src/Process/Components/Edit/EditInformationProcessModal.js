import React, { Component } from 'react';
import SelectDepartmentToAssign from '../../../System/Component/ManageProcess/SelectDepartmentToAssign';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {connect} from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../System/Action/System/Index';

class EditInformationProcessModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
          employeesFilter: '',
          selected: '', 
          detail: '',
          name: '',
          description: '',
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.detail){
          this.setState({
            detail : nextProps.detail,
            selected: nextProps.detail.assign,
            name: nextProps.detail.name,
            description: nextProps.detail.description,
            id: nextProps.detail.id,
          });
        }
        if(nextProps.idDepartmentAssign){
            var token = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/company/department/`+ nextProps.idDepartmentAssign + `/employee`,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    console.log(res.data); 
                    this.setState({employeesFilter: res.data.employees, selected: ''});
                }
            }).catch(function (error) {
                alert(error);
            }); 
        }
    }
    
    UNSAFE_componentWillMount () {
      var token = localStorage.getItem('token');
      var company_id = localStorage.getItem('company_id');
      axios.get(`http://127.0.0.1:8000/api/system/organization/company/`+ company_id + `/employee`,
      {
          headers: { 'Authorization': 'Bearer ' + token}
      }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
            console.log(res.data); 
            this.setState({employeesFilter: res.data.employees});
        }
      }).catch(function (error) {
        alert(error);
      });
    }

    convertEmployeesToOptions(){
      var options = [];
      var employees = this.state.employeesFilter;
      for (let index = 0; index < employees.length; index++) {
          var option = {value: employees[index].id_employee, label: employees[index].name};
          options.push(option);
      }
      return options;
    }
    
    getCurrentTime (){
      var date = new Date();
      var yyyy = date.getFullYear();
      var dd = date.getDate();
      var mm = (date.getMonth() + 1);
      if (dd < 10){
        dd = "0" + dd;
      }
      if (mm < 10){
        mm = "0" + mm;
      }
      var current = dd + "-" + mm + "-" + yyyy;
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds();
      if (hours < 10){
        hours = "0" + hours;
      }
      if (minutes < 10){
        minutes = "0" + minutes;
      }
      if (seconds < 10){
        seconds = "0" + seconds;
      }
      return current + " " + hours + ":" + minutes + ":" + seconds;
    }

    handleChangeSelectEmployee = selectedOption => {
        this.setState({selected: selectedOption});
    };

    handleSubmitEditProcess = (e) => {
      e.preventDefault();
      document.getElementById('close-modal-add-new-process').click();
      var information = {
        id: this.state.id,
        name :this.state.name,
        description: this.state.description,
        assign: this.state.selected,
        time: this.getCurrentTime(),
      }
      this.props.updateProcessInformation(information);
    }

    handleChangeName = (event) => {
      event.preventDefault();
      this.setState({name: event.target.value});
    }

    handleChangeDescription = (event) => {
      event.preventDefault();
      this.setState({description: event.target.value});
    }

    render() {
        if(this.state.detail){
            return (
                <div
                className="modal fade"
                id="form-edit-process"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="scrollmodalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="scrollmodalLabel">
                        Edit process
                      </h5>
                      <button
                        id="close-modal-add-new-process"
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="card">
                        <div className="card-body card-block">
                          <Form
                            encType="multipart/form-data"
                            className="form-horizontal"
                            onSubmit={(e) => this.handleSubmitEditProcess(e)}
                          >
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <Form.Label>Name</Form.Label>
                              </div>
                              <div className="col-12 col-md-9">
                                <Form.Control onChange={(e) => this.handleChangeName(e)} defaultValue={this.state.name} type="text" id="name" required name="name" placeholder="Name..." />
                                <small className="form-text text-muted">
                                </small>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <Form.Label>Description</Form.Label>
                              </div>
                              <div className="col-12 col-md-9">
                                <Form.Control as={"textarea"} onChange={(e) => this.handleChangeDescription(e)} defaultValue={this.state.description} type="text" required name="description" id="description" placeholder="Content..." rows={9} />
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <label
                                  htmlFor="disabled-input"
                                  className=" form-control-label"
                                >
                                  Department
                                </label>
                              </div>
                              <div className="col-12 col-md-9">
                                <SelectDepartmentToAssign />
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                                <label
                                  htmlFor="disabled-input"
                                  className=" form-control-label"
                                >
                                  Assign to
                                </label>
                              </div>
                              <div className="col-12 col-md-9">
                                <Select  
                                  isMulti 
                                  options={this.convertEmployeesToOptions()} 
                                  onChange={this.handleChangeSelectEmployee}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  name="filter__employees"
                                  value={this.state.selected}
                                />
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col col-md-3">
                              </div>
                              <div className="col-12 col-md-9">
                                <button type="submit" className="btn btn-primary" style={{float:"left"}}>
                                    Update
                                </button>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
        }else{
            return (<div></div>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      idDepartmentAssign: state.systemReducers.manageSystemReducer.changeDepartmentToAssignReducer.idDepartment,
      detail: state.systemReducers.manageSystemReducer.informationProcessReducer.information,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProcessInformation: (information) => {
      dispatch(actions.updateProcessInformation(information));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInformationProcessModal);
