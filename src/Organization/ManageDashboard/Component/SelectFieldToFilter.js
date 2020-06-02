import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import * as actions from '../Action/Index';
import {connect} from 'react-redux';
import host from '../../../Host/ServerDomain'; 

class SelectFieldToFilter extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            options: '',     
        }
    }

    convertToOptionsSelect(data){
        var options = [];
        for (let index = 0; index < data.length; index++) {
            options.push({value: data[index].id, label: data[index].name});    
        }
        return options;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        var token = localStorage.getItem('token');
        axios.get(host + `/api/company/field`,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              var data = res.data.fields;
              var optionsData = this.convertToOptionsSelect(data);
              this.setState({options:optionsData});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    changeSelectField = (event) =>{
        var currentSelect = event.value;
        this.props.updateIdFieldSelect(currentSelect);
    }

    render() {
        return (
            <Select options={this.state.options} 
                placeholder="Chọn"
                onChange={(e) => this.changeSelectField(e)}
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
        updateIdFieldSelect: (idField) => {
            dispatch(actions.updateIdFieldSelect(idField))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFieldToFilter);
