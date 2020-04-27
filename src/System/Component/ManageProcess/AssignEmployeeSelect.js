import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import {connect} from 'react-redux';

const animatedComponents = makeAnimated();

class AssignEmployeeSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: '',      
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
                  this.setState({employees: res.data.employees});
              }
            }).catch(function (error) {
              alert(error);
            }); 
        }
    }

    componentWillMount() {
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
              this.setState({employees: res.data.employees});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    convertEmployeesToOptions(){
        var options = [];
        var employees = this.state.employees;
        for (let index = 0; index < employees.length; index++) {
            var option = {value: employees[index].id_employee, label: employees[index].name};
            options.push(option);
        }
        return options;
    }

    render() {
        return (
            <Select components={animatedComponents} isMulti options={this.convertEmployeesToOptions()} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        idDepartmentAssign: state.systemReducers.manageSystemReducer.changeDepartmentToAssignReducer.idDepartment,
    }
}

export default connect(mapStateToProps)(AssignEmployeeSelect);
