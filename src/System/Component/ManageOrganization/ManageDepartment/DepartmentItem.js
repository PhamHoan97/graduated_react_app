import React, { Component } from 'react'
import * as host from '../../../Constants/Url'
import axios from 'axios'
class DepartmentItem extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.description}</td>
                <td>{this.props.item.role}</td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e,idDepartment)=>this.showDetailDepartment(e,this.props.item.id)}>
                        <i className="fa fa-edit fa-1x"/>
                    </a>
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e)=>this.deleteDepartment(e,this.props.item.id)}>
                        <i className="fa fa-trash fa-1x"/>
                    </a>
                </td>
            </tr>
        )
    }
    showDetailDepartment = (e,idEditDepartment) =>{
        var token = localStorage.getItem('token');
        e.preventDefault();
        var self =  this;
        axios.get(host.URL_BACKEND+'/api/system/organization/department/detail/'+idEditDepartment,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                var detailDepartment =  JSON.parse(JSON.stringify(response.data.department));
                self.props.showDetailDepartment(detailDepartment);
                self.props.showEditDepartment();
                // self.props.rerenderParentCallback();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        //this.props.showEditDepartment();
    }

    deleteDepartment = (e,idDeleteDepartment) =>{
        e.preventDefault();
        // connect database 
        let self = this;
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/system/organization/department/delete',{
            idDeleteDepartment:idDeleteDepartment,
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

export default DepartmentItem