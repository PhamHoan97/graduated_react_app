import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../Actions/Index';
import {connect} from 'react-redux';
import Select from 'react-select';

class DepartmentOptionSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: ''      
        }
    }

    changeDepartmentOptionSearch = (event) => {
        var currentSelect = event.value;
        this.props.updateIdDepartmentSearch(currentSelect);
    }

    convertToOptionsSelect(data){
        var options = [];
        for (let index = 0; index < data.length; index++) {
            options.push({value: data[index].id, label: data[index].name});    
        }
        return options;
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        var company_id = localStorage.getItem('company_id');
        axios.get(`http://127.0.0.1:8000/api/system/organization/department/` + company_id,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              var data = res.data.departmentCompany;
              var optionsData = this.convertToOptionsSelect(data);
              this.setState({options:optionsData});
          }
        }).catch(function (error) {
          alert(error);
        });
    }
    
    render() {
        return (
            <Select options={this.state.options} 
            placeholder="Chọn"
            onChange={(e) => this.changeDepartmentOptionSearch(e)}/>

        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateIdDepartmentSearch: (idDepartment) => {
            dispatch(actions.updateIdDepartmentSearch(idDepartment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentOptionSearch) 
