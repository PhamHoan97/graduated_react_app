import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import UserContainer from '../../../Container/ManageOrganization/Manage/UserContainer'
import axios from "axios";
import * as host from '../../../Constants/Url'
export default class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDepartment: [],
            listRole: []
        }
    }
    componentWillMount() {
        var idCompany = localStorage.getItem('company_id');
        var token = localStorage.getItem('token');
        var self = this;

        // Get list department
        axios.get(host.URL_BACKEND+'/api/system/organization/department/'+idCompany,{
            headers: {'Authorization': 'Bearer '+token}
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            } else {
                self.setState({
                   listDepartment: JSON.parse(JSON.stringify(response.data.departmentCompany))
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        // Get list role
        axios.get(host.URL_BACKEND+'/api/system/organization/role/'+idCompany,{
            headers: {'Authorization': 'Bearer '+token}
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            } else {
                self.setState({
                    listRole:JSON.parse(JSON.stringify(response.data.roles))
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    render() {
        return (
            <Modal
                size="lg"
                show={this.props.showModal}
                onHide={this.props.close}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Manage User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserContainer listUser = {this.props.listUser} listDepartment={this.state.listDepartment} listRole={this.state.listRole}/>
                </Modal.Body>
            </Modal>
        )
    }
}
