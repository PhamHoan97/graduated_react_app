import React, { Component } from 'react'

export default class DepartmentItem extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{ this.props.item.name}</td>
                <td>{ this.props.item.field}</td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e,idDepartment)=>this.showDetailDepartment(e,this.props.item.id)}>
                        <i className="fa fa-edit fa-1x"/>
                    </a>
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e)=>this.deleteDepartment(e)}>
                        <i className="fa fa-trash fa-1x" />
                    </a>
                </td>
            </tr>
        )
    }
    showDetailDepartment = (e,idDepartment) =>{
        e.preventDefault();
        this.props.showDetailDepartment(idDepartment);
        this.props.showEditDepartment();
    }

    deleteDepartment = (e) =>{
        e.preventDefault();
        console.log('delete');
    }
}
