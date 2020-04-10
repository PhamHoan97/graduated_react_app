import React, { Component } from 'react'

export default class UserItem extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.item.name}</td>
                <td>{ this.props.item.email}</td>
                <td>
                { this.props.item.position}
                </td>
                <td>
                { this.props.item.department}
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e,idUser)=>this.showDetailUser(e,this.props.item.id)}>
                        <i className="fa fa-edit fa-1x"/>
                    </a>
                </td>
                <td className="text-right">
                    <a className="btn--trash__department" href="###" onClick={(e)=>this.deleteUser(e)}>
                        <i className="fa fa-trash fa-1x" />
                    </a>
                </td>
            </tr>
        )
    }
    showDetailUser = (e,idUser) =>{
        e.preventDefault();
        this.props.showDetailUser(idUser);
        this.props.showEditUser();
    }

    deleteDUser = (e) =>{
        e.preventDefault();
        console.log('delete');
    }
}
