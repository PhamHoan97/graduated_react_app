import React, { Component } from 'react';
import '../Css/DetailEmployee.css';
import EditInformationEmployeeModal from './EditInformationEmployeeModal';
import EmployeeInformation from './EmployeeInformation';
import EmployeeProcess from './EmployeeProcess';
import * as host from "../Url"; 

class ContentEmployeeInformation extends Component {
    constructor(props) {
        super(props)

        this.state = {
          employee: '',
          process: '',
          department: '',
          role: '',
          company: '',
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.employee){
        this.setState({
          employee: nextProps.employee, 
          processes: nextProps.employee.processes,
          department: nextProps.employee.department,
          role: nextProps.employee.role,
          company: nextProps.employee.company,
        });
      }
    }

    render() {
      if(!this.state.employee.avatar){
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-9">
                  <EmployeeInformation employee={this.state.employee}/>
                  <EmployeeProcess processes={this.state.processes}/>
              </div>
              <div className="col-md-3">
                <div className="card card-profile">
                  <div className="card-avatar">
                      <img className="img" src="/system/images/user-avatar-default.jpg" alt="Avatar" />
                  </div>
                  <div className="card-body">
                    <h6 className="card-category text-gray">{this.state.company.signature + ' / ' + this.state.department.name}</h6>
                    <h6 className="card-category text-gray">{this.state.role.name}</h6>
                    <h4 className="card-title-employee">{this.state.employee.name}</h4>
                    <p className="card-description">
                        {this.state.employee.about_me}
                    </p>
                    <button 
                      className="btn btn-primary btn-round"                                   
                      type="button"
                      data-toggle="modal"
                      data-target="#update-information-employee"> Update</button>
                  </div>
                </div>
              </div>
            </div>
            <EditInformationEmployeeModal employee={this.state.employee} />
          </div>
        )
      }else{
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-9">
                  <EmployeeInformation employee={this.state.employee}/>
                  <EmployeeProcess processes={this.state.processes}/>
              </div>
              <div className="col-md-3">
                <div className="card card-profile">
                  <div className="card-avatar">
                      <img className="img" src={host.URL_BACKEND + '/' + this.state.employee.avatar} alt="Avatar" />
                  </div>
                  <div className="card-body">
                    <h6 className="card-category text-gray">{this.state.company.signature + ' / ' + this.state.department.name}</h6>
                    <h6 className="card-category text-gray">{this.state.role.name}</h6>
                    <h4 className="card-title-employee">{this.state.employee.name}</h4>
                    <p className="card-description">
                        {this.state.employee.about_me}
                    </p>
                    <button 
                      className="btn btn-primary btn-round"                                   
                      type="button"
                      data-toggle="modal"
                      data-target="#update-information-employee"> Update</button>
                  </div>
                </div>
              </div>
            </div>
            <EditInformationEmployeeModal employee={this.state.employee} />
          </div>
        )
      }
    }
}

export default ContentEmployeeInformation
