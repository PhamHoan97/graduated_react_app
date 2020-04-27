import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../Action/System/Index';
import {connect} from 'react-redux';

class SelectDepartmentToAssign extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    changeDepartmentOptionAssign = (event) => {
        event.preventDefault();
        var currentSelect = event.target.value;
        this.props.updateIdDepartmentAssign(currentSelect);
    }
    
    componentDidMount() {
        var token = localStorage.getItem('token');
        var company_id = localStorage.getItem('company_id');
        var option = '<option value="">Select...</option>';
        axios.get(`http://127.0.0.1:8000/api/system/organization/department/` + company_id,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              console.log(res.data); 
              var data = res.data.departmentCompany;
              for (let index = 0; index < data.length; index++) {
                option += '<option value="'+ data[index].id +'">'+ data[index].name +'</option>';
              }
              document.getElementById('department-to-assign').innerHTML = option;
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    render() {
        return (
            <select
            id="department-to-assign"
            name="department"
            className="form-control"
            onChange={(e) => this.changeDepartmentOptionAssign(e)}
          >

          </select>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateIdDepartmentAssign: (idDepartment) => {
            dispatch(actions.updateIdDepartmentAssign(idDepartment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDepartmentToAssign);
