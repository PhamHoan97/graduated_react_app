import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../Action/System/Index';
import {connect} from 'react-redux';

class DepartmentOptionSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    changeDepartmentOptionSearch = (event) => {
        event.preventDefault();
        var currentSelect = event.target.value;
        this.props.updateIdDepartmentSearch(currentSelect);
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        var company_id = localStorage.getItem('company_id');
        var option = '<option value="">Chọn phòng ban</option>';
        axios.get(`http://127.0.0.1:8000/api/system/organization/department/` + company_id,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              var data = res.data.departmentCompany;
              for (let index = 0; index < data.length; index++) {
                option += '<option value="'+ data[index].id +'">'+ data[index].name +'</option>';
              }
              document.getElementById('select-department-search').innerHTML = option;
          }
        }).catch(function (error) {
          alert(error);
        });
    }
    
    render() {
        return (
            <select
                id="select-department-search"
                className="js-select2 select--department__process"
                name="property"
                defaultValue={""}
                onChange={(e) => this.changeDepartmentOptionSearch(e)}
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
        updateIdDepartmentSearch: (idDepartment) => {
            dispatch(actions.updateIdDepartmentSearch(idDepartment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentOptionSearch) 
