import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../Actions/Index';
import {connect} from 'react-redux';
import Select from 'react-select';
import host from '../../../Host/ServerDomain'; 

class EmployeeOptionSearch extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            options: [],      
        }
    }

    componentDidMount() {
        this._isMounted = true;
        let self = this;
        var token = localStorage.getItem('token');
        axios.get(host + `/api/company/employees/` + token,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
            if(self._isMounted){
                if(res.data.error != null){
                    console.log(res.data.message);
                }else{
                    var data = res.data.employees;
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

    changeEmployeeOptionSearch = (event) => {
        var currentSelect = event.value;
        this.props.updateIdEmployeeSearch(currentSelect);
        this.props.updateIdDepartmentSearch("");
    }

    convertToOptionsSelect(data){
        var options = [{value: '', label: 'Tất cả nhân viên'}];
        for (let index = 0; index < data.length; index++) {
            options.push({value: data[index].id, label: data[index].name});    
        }
        return options;
    }

    render() {
        return (
            <Select options={this.state.options} 
            defaultValue={this.state.options[0]}
            placeholder="Chọn nhân viên"
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
