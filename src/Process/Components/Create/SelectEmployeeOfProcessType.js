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

class SelectEmployeeOfProcessType extends Component {
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

    componentDidMount() {
        this._isMounted = true;
        if(this.props.detail.type){
            this.setState({selected:this.props.defaultSelect});
            if(this.props.detail.type === 1){
                this.setState({employeesAssign: this.props.detail.assign});
            }else{
                var tokenData = localStorage.getItem('token'); 
                this._isMounted = true;
                var self = this;
                var data = {
                    type: this.props.detail.type,
                    assign: this.props.detail.assign,
                    token: tokenData,
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.defaultSelect === "reset"){
            this.setState({selected: []});
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
                id="assign-element"
                value={this.state.selected}
                options={this.state.employeesAssign}
                formatGroupLabel={formatGroupLabel}
                onChange={this.changeEmployeeAssignForElement}
                placeholder="Lựa chọn nhân viên"
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectEmployeeOfProcessType);