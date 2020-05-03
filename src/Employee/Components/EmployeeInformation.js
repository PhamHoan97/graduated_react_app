import React, { Component } from 'react'

class EmployeeInformation extends Component {
    constructor(props) {
      super(props)

      this.state = {
        employee: '',
        department: '',
        role: '',
        company: '',
      }
    }
    
    convertDateToBirthFormat(str){
      var date = new Date(str);
      var yyyy = date.getFullYear();
      var dd = date.getDate();
      var mm = (date.getMonth() + 1);
      if (dd < 10){
        dd = "0" + dd;
      }
      if (mm < 10){
        mm = "0" + mm;
      }
      var result = dd + "-" + mm + "-" + yyyy;
      return result;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.employee){
        this.setState({employee: nextProps.employee, department: nextProps.employee.department, role: nextProps.employee.role, company: nextProps.employee.company});
      }
    }

    render() {
        return (
        <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title title-employee">Profile</h4>
              <p className="card-category title-employee">Show your profile</p>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="bmd-label-floating">Name </label>
                      <span className="form-control"> {this.state.employee.name}</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="bmd-label-floating">Birth</label>
                      <span className="form-control"> {this.convertDateToBirthFormat(this.state.employee.birth)}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="bmd-label-floating">Email address</label>
                      <span className="form-control"> {this.state.employee.address}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="bmd-label-floating">Company</label>
                      <span className="form-control"> {this.state.company.name}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="bmd-label-floating">Department</label>
                      <span className="form-control"> {this.state.department.name}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Role</label>
                      <span className="form-control"> {this.state.role.name}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Phone</label>
                      <span className="form-control"> {this.state.employee.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">Adress</label>
                      <span className="form-control"> {this.state.employee.address}</span>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
              </form>
            </div>
          </div>
        )
    }
}

export default EmployeeInformation