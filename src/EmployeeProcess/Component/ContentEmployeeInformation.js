import React, { Component } from 'react';
import '../Css/DetailEmployee.css';
import EditInformationEmployeeModal from './EditInformationEmployeeModal';
import EmployeeInformation from './EmployeeInformation';
import EmployeeProcess from './EmployeeProcess';
import host from '../../Host/ServerDomain'; 

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

    combineProcesses(array1, array2, array3, array4) {
      var processes= [];
      for (let index1 = 0; index1 < array1.length; index1++) {
        processes.push(array1[index1]);
      }
      for (let index2 = 0; index2 < array2.length; index2++) {
        processes.push(array2[index2]);
      }
      for (let index3 = 0; index3 < array3.length; index3++) {
        processes.push(array3[index3]);
      }
      for (let index4 = 0; index4 < array4.length; index4++) {
        processes.push(array4[index4]);
      }
      return processes.reverse();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.employee){
        var processes = this.combineProcesses(
            nextProps.employee.processes_employees,
            nextProps.employee.processes_roles,
            nextProps.employee.processes_departments,
            nextProps.employee.processes_companies,
          );
        this.setState({
          employee: nextProps.employee, 
          processes: processes,
          department: nextProps.employee.department,
          role: nextProps.employee.role,
          company: nextProps.employee.company,
        });
      }
    }

    renderAvatar = () =>{
      if(this.state.employee && this.state.employee.avatar){
        return(<img className="img" src={host + this.state.employee.avatar} alt="Avatar" />)
      }else{
        return(<img className="img" src="/system/images/user-avatar-default.jpg" alt="Avatar" />);
      }
    }

    render() {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-9">
                  <EmployeeInformation employee={this.state.employee}/>
                  <EmployeeProcess processes={this.state.processes}/>
              </div>
              <div className="col-md-3">
                <div className="card-avatar-content card-profile">
                  <div className="card-avatar">
                    {this.renderAvatar()}
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
                      data-target="#update-information-employee"> Cập nhật</button>
                  </div>
                </div>
              </div>
            </div>
            <EditInformationEmployeeModal employee={this.state.employee} />
          </div>
        )
    }
}

export default ContentEmployeeInformation
