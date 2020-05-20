import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

class SelectFieldToFilter extends Component {
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

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/company/field/`,
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

    render() {
        return (
            <Select options={this.state.options} 
                placeholder="Chọn"
            />

        )
    }
}

export default SelectFieldToFilter
