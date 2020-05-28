import React, { Component } from 'react'
import ContentEmployeeInformation from './ContentEmployeeInformation';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../Actions/Index';
import host from '../../Host/ServerDomain'; 

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
            axios.get(host + `/api/employee/data/` + token,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                  var data = {...res.data.employee, company: res.data.company, department:res.data.department};
                  var employee = res.data.employee;
                    employee.username_account = res.data.username_account;
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
        axios.get(host + `/api/employee/data/` + token,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              var data = {...res.data.employee, company: res.data.company, department:res.data.department};
              var employee = res.data.employee;
                 employee.username_account = res.data.username_account;
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