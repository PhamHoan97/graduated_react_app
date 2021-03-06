import React, { Component } from 'react';

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

    renderGender(str){
      return str === 1 ? 'Nam' : 'Nữ';
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps.employee){
        this.setState({employee: nextProps.employee, department: nextProps.employee.department, role: nextProps.employee.role, company: nextProps.employee.company});
      }
    }

    render() {
        return (
        <div className="left-content-info-process">
            <div className="card-header card-header-primary">
              <h4 className="card-title title-employee">Thông tin cá nhân</h4>
              <p className="card-category title-employee">Hiển thị thông tin cá nhân</p>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="bmd-label-floating">Tên nhân viên </label>
                      <span className="form-control"> {this.state.employee.name}</span>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="bmd-label-floating">Ngày sinh</label>
                      <span className="form-control"> {this.convertDateToBirthFormat(this.state.employee.birth)}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="bmd-label-floating">Địa chỉ email</label>
                      <span className="form-control"> {this.state.employee.email}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="bmd-label-floating">Công ty</label>
                      <span className="form-control"> {this.state.company.name}</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="bmd-label-floating">Phòng ban</label>
                      <span className="form-control"> {this.state.department.name}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Vai trò</label>
                      <span className="form-control"> {this.state.role.name}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Số điện thoại</label>
                      <span className="form-control"> {this.state.employee.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                      <label className="bmd-label-floating">Giới tính</label>
                      <span className="form-control"> {this.renderGender(this.state.employee.gender)}</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="bmd-label-floating">Địa chỉ thường trú</label>
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
