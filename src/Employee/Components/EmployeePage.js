import React, { Component } from 'react'
import ContentEmployeeInformation from './ContentEmployeeInformation';
import HeaderEmployee from './HeaderEmployee';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../Actions/Index';

class EmployeePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employee: '',
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.reloadPage){
            var token = localStorage.getItem('token');
            var idEmployee = localStorage.getItem('employee_id');
            axios.get(`http://127.0.0.1:8000/api/employee/data/` + idEmployee,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                  var data = {...res.data.employee, company: res.data.company, department:res.data.department};
                  this.props.updateEmployeeInformation(res.data.employee);
                  this.setState({employee: data});
              }
            }).catch(function (error) {
              alert(error);
            });
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        var idEmployee = localStorage.getItem('employee_id');
        axios.get(`http://127.0.0.1:8000/api/employee/data/` + idEmployee,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              console.log(res.data);
              var data = {...res.data.employee, company: res.data.company, department:res.data.department};
              this.props.updateEmployeeInformation(res.data.employee);
              this.setState({employee: data});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    render() {
        return (
            <div className="page-wrapper">
                <HeaderEmployee />
                <div className="main-content-employee">
                    <ContentEmployeeInformation employee={this.state.employee}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reloadPage: state.employeeReducers.reloadPage,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateEmployeeInformation: (employee) => {
            dispatch(actions.updateEmployeeInformation(employee));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage)