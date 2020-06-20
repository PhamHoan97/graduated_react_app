import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../Actions/Index';
import {connect} from 'react-redux';
import Select from 'react-select';
import host from '../../../Host/ServerDomain'; 

class DepartmentOptionSearch extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            options: [],      
        }
    }

    changeDepartmentOptionSearch = (event) => {
        var currentSelect = event.value;
        this.props.updateIdDepartmentSearch(currentSelect);
        this.props.updateIdEmployeeSearch("");
    }

    convertToOptionsSelect(data){
        var options = [{value: '', label: 'Tất cả phòng ban'}];
        for (let index = 0; index < data.length; index++) {
            options.push({value: data[index].id, label: data[index].name});    
        }
        return options;
    }

    componentDidMount() {
        this._isMounted = true;
        let self = this;
        var token = localStorage.getItem('token');
        axios.get(host + `/api/company/organization/department/` + token,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
            if(self._isMounted){
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    var data = res.data.departmentCompany;
                    var optionsData = self.convertToOptionsSelect(data);
                    self.setState({options:optionsData});
                }
            }
        }).catch(function (error) {
          alert(error);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        return (
            <Select options={this.state.options} 
            defaultValue={this.state.options[0]}
            placeholder="Chọn phòng ban"
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
        },
        updateIdEmployeeSearch: (idEmployee) => {
            dispatch(actions.updateIdEmployeeSearch(idEmployee))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentOptionSearch) 
