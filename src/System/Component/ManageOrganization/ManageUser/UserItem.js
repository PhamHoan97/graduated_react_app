import React, { Component } from 'react'
import axios from "axios";
import * as host from '../../../Constants/Url'
export default class UserItem extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.email}</td>
                <td>{ this.props.item.phone}</td>
                <td>
                { this.props.item.role}
                </td>
                <td>
                { this.props.item.department_name}
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e,idUser)=>this.showDetailEmployee(e,this.props.item.id)}>
                        <i className="fa fa-edit fa-1x"/>
                    </a>
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e)=>this.deleteEmployee(e,this.props.item.id)}>
                        <i className="fa fa-trash fa-1x" />
                    </a>
                </td>
            </tr>
        )
    }
    showDetailEmployee = (e,idEmployee) =>{
        var token = localStorage.getItem('token');
        e.preventDefault();
        var self =  this;
        axios.get(host.URL_BACKEND+'/api/system/organization/employee/detail/'+idEmployee,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                var detailEmployee =  JSON.parse(JSON.stringify(response.data.employee));
                self.props.showDetailEmployee(detailEmployee);
                self.props.rerenderParentCallback();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        this.props.showEditEmployee();
    }

    deleteEmployee = (e,idDeleteEmployee) =>{
        e.preventDefault();
        let self = this;
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/system/organization/employee/delete',{
            idDeleteEmployee:idDeleteEmployee,
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
            } else {
                console.log(response);
                self.props.rerenderParentCallback();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
