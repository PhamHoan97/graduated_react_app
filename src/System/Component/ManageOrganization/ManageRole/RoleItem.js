import React, { Component } from 'react'
import axios from "axios";
import * as host from '../../../Constants/Url'
export default class RoleItem extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.item.name}</td>
                <td>
                { this.props.item.department_name}
                </td>
                <td>
                { this.props.item.company_name}
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e,idUser)=>this.showDetailRole(e,this.props.item.id)}>
                        <i className="fa fa-edit fa-1x"/>
                    </a>
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e)=>this.deleteRole(e,this.props.item.id)}>
                        <i className="fa fa-trash fa-1x" />
                    </a>
                </td>
            </tr>
        )
    }
    showDetailRole = (e,idRole) =>{
        var token = localStorage.getItem('token');
        e.preventDefault();
        var self =  this;
        axios.get(host.URL_BACKEND+'/api/system/organization/role/detail/'+idRole,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                var detailRole =  JSON.parse(JSON.stringify(response.data.role));
                self.props.showDetailRole(detailRole);
                self.props.showEditRole();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    deleteRole = (e,idDeleteRole) =>{
        e.preventDefault();
        let self = this;
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/system/organization/role/delete',{
            idDeleteRole:idDeleteRole,
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
