import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../Actions/Index';
import {connect} from 'react-redux';
import Select from 'react-select';

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

class SelectDepartmentToAssign extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options : '',     
        }
    }

    changeDepartmentOptionAssign = (event) => {
        var currentSelect = event.value;
        this.props.updateIdDepartmentAssign(currentSelect);
    }
    
    convertToOptionsSelect(data){
        var options = [{value: '', label: 'Lựa chọn phòng ban'}];
        for (let index = 0; index < data.length; index++) {
            options.push({value: data[index].id, label: data[index].name});    
        }
        return options;
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        var company_id = localStorage.getItem('company_id');
        axios.get(`http://127.0.0.1:8000/api/company/organization/department/` + company_id,
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
            <Select
            defaultValue={this.state.options[0]}
            options={this.state.options}
            formatGroupLabel={formatGroupLabel}
            onChange={(e) => this.changeDepartmentOptionAssign(e)}
            placeholder="Lựa chọn phòng ban"
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
        updateIdDepartmentAssign: (idDepartment) => {
            dispatch(actions.updateIdDepartmentAssign(idDepartment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDepartmentToAssign);
