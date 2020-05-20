import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../Actions/Index';
import {connect} from 'react-redux';
import Select from 'react-select';

class EmployeeOptionSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: ''      
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/company/employees/` + token,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              var data = res.data.employees;
              var optionsData = this.convertToOptionsSelect(data);
              this.setState({options:optionsData});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    changeEmployeeOptionSearch = (event) => {
        var currentSelect = event.value;
        this.props.updateIdEmployeeSearch(currentSelect);
        this.props.updateIdDepartmentSearch("");
    }

    convertToOptionsSelect(data){
        var options = [];
        for (let index = 0; index < data.length; index++) {
            options.push({value: data[index].id, label: data[index].name});    
        }
        return options;
    }

    render() {
        return (
            <Select options={this.state.options} 
            placeholder="Chọn"
            onChange={(e) => this.changeEmployeeOptionSearch(e)}
           />

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateIdEmployeeSearch: (idEmployee) => {
            dispatch(actions.updateIdEmployeeSearch(idEmployee))
        },
        updateIdDepartmentSearch: (idDepartment) => {
            dispatch(actions.updateIdDepartmentSearch(idDepartment))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeOptionSearch); 