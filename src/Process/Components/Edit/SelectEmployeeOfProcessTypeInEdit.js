import React, { Component } from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import axios from 'axios';
import host from '../../../Host/ServerDomain';
import * as actions from '../../Actions/Index';

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

class SelectEmployeeOfProcessTypeInProcess extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            employeesAssign: [],
            selected: '',
        }
    }

    convertToAssign (employees){
        var employeesAssign = [];
        for (let index = 0; index < employees.length; index++) {
            var record = {'value': employees[index].id, 'label': employees[index].name + ' (' + employees[index].department_name + '-' + employees[index].role_name +')'};
            employeesAssign.push(record);      
        }
        return employeesAssign;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.detail.type){
            this.setState({selected:nextProps.defaultSelect});
            if(nextProps.detail.type === 1){
                this.setState({employeesAssign: nextProps.detail.assign});
            }else{
                var tokenData = localStorage.getItem('token'); 
                this._isMounted = true;
                var self = this;
                var data;
                if( nextProps.detail.type !==5){
                    data = {
                        type: nextProps.detail.type,
                        assign: nextProps.detail.assign,
                        token: tokenData,
                    }
                }else{
                    var assign = nextProps.detail.assign;
                    var employees = assign.employees;
                    var roles = assign.roles;
                    var departments = assign.departments;
                    if(assign.roles && assign.roles.length){
                        assign = {
                            "employees": employees,
                            "roles": roles,
                        }
                    }else{
                        assign = {
                            "employees": employees,
                            "departments": departments,
                        }
                    }
                    data = {
                        type: nextProps.detail.type,
                        assign: assign,
                        token: tokenData,
                    }
                }

                axios.post(host + `/api/company/process/employee/assigned`, data,
                {
                    headers: { 'Authorization': 'Bearer ' + tokenData}
                }).then(res => {
                    if(self._isMounted){
                        if(res.data.error != null){
                            console.log(res.data.message);
                        }else{
                            var assign = self.convertToAssign(res.data.employees);
                            self.setState({employeesAssign: assign});
                        }
                    }
                }).catch(function (error) {
                  alert(error);
                });
            }
        }    
    }

    componentDidMount() {
        if(this.props.detail.type){
            this.setState({selected:this.props.defaultSelect});
            if(this.props.detail.type === 1){
                this.setState({employeesAssign: this.props.detail.assign});
            }else{
                var tokenData = localStorage.getItem('token'); 
                this._isMounted = true;
                var self = this;
                var data;
                if( self.props.detail.type !==5){
                    data = {
                        type: self.props.detail.type,
                        assign: self.props.detail.assign,
                        token: tokenData,
                    }
                }else{
                    var assign = self.props.detail.assign;
                    var employees = assign.employees;
                    var roles = assign.roles;
                    var departments = assign.departments;
                    if(assign.roles && assign.roles.length){
                        assign = {
                            "employees": employees,
                            "roles": roles,
                        }
                    }else{
                        assign = {
                            "employees": employees,
                            "departments": departments,
                        }
                    }
                    data = {
                        type: self.props.detail.type,
                        assign: assign,
                        token: tokenData,
                    }
                }

                axios.post(host + `/api/company/process/employee/assigned`, data,
                {
                    headers: { 'Authorization': 'Bearer ' + tokenData}
                }).then(res => {
                    if(self._isMounted){
                        if(res.data.error != null){
                            console.log(res.data.message);
                        }else{
                            var assign = self.convertToAssign(res.data.employees);
                            self.setState({employeesAssign: assign});
                        }
                    }
                }).catch(function (error) {
                  alert(error);
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    changeEmployeeAssignForElement = selectedOption => {
        this.props.updateAssignedEmployeeElement(selectedOption);
        this.setState({selected: selectedOption});
    }

    render() {
        return (
            <Select
                value={this.state.selected}
                options={this.state.employeesAssign}
                formatGroupLabel={formatGroupLabel}
                onChange={this.changeEmployeeAssignForElement}
                placeholder="L???a ch???n nh??n vi??n"
                isMulti
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        detail: state.addProcessReducers.informationProcessReducer.information,
        defaultSelect: state.processReducers.assignReducers.defaultSelect,
        count: state.processReducers.assignReducers.count,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateAssignedEmployeeElement: (assign) => {
            dispatch(actions.updateAssignedEmployeeElement(assign));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectEmployeeOfProcessTypeInProcess);