import React, { Component } from 'react';
import SelectDepartmentToAssign from './SelectDepartmentToAssign';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import {connect} from 'react-redux';
import Select from 'react-select';
import {Redirect } from 'react-router-dom';
import * as actions from '../../Action/System/Index';

const animatedComponents = makeAnimated();

class FormAddProcessModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
          employeesFilter: '',
          selected: '', 
          name: '',
          description: '',
          assign: '',
          time: '',
          redirect: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
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
                this.setState({employeesFilter: res.data.employees, selected: '', assign: ''});
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
        this.setState({selected: selectedOption, assign: selectedOption});
    };

    handleSubmitAddProcess = (e) => {
      e.preventDefault();
      document.getElementById('close-modal-add-new-process').click();
      var information = {
        name :this.state.name,
        description: this.state.description,
        assign: this.state.assign,
        time: this.getCurrentTime(),
      }
      this.props.updateProcessInformation(information);
      this.setState({redirect: true});
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
        if(this.state.redirect){
          return <Redirect to={{ pathname: "/process/new"}}/> 
        }
        return (
            <div
            className="modal fade"
            id="form-add-new-process"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="scrollmodalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="scrollmodalLabel">
                    New process
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
                        onSubmit={(e) => this.handleSubmitAddProcess(e)}
                      >
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>Name</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <Form.Control onChange={(e) => this.handleChangeName(e)} type="text" id="name" required name="name" placeholder="Name..." />
                            <small className="form-text text-muted">
                            </small>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>Description</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <Form.Control as={"textarea"} onChange={(e) => this.handleChangeDescription(e)}  type="text" required name="description" id="description" placeholder="Content..." rows={9} />
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
                            <Select id="select-employee-to-assign" required value={this.state.selected} components={animatedComponents} 
                             isMulti options={this.convertEmployeesToOptions()} onChange={this.handleChangeSelectEmployee} />
                          </div>
                        </div>
                        {/* <div className="row form-group">
                          <div className="col col-md-3">
                            <Form.Label>File Input</Form.Label>
                          </div>
                          <div className="col-12 col-md-9">
                            <Form.File.Input id="file-input" name="file-input"/>
                          </div>
                        </div> */}
                        <div className="row form-group">
                          <div className="col col-md-3">
                          </div>
                          <div className="col-12 col-md-9">
                            <button type="submit" className="btn btn-primary" style={{float:"left"}}>
                              Next Step
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
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      idDepartmentAssign: state.systemReducers.manageSystemReducer.changeDepartmentToAssignReducer.idDepartment,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProcessInformation: (information) => {
      dispatch(actions.updateProcessInformation(information));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddProcessModal);
