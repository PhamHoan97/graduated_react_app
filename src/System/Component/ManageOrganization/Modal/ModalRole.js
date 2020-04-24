import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import RoleContainer from '../../../Container/ManageOrganization/Manage/RoleContainer'
import axios from "axios";
import * as host from '../../../Constants/Url'
export default class ModalRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDepartment: []
        }
    }

    componentWillMount() {
        let self = this;
        var idCompany = localStorage.getItem('company_id');
        var token = localStorage.getItem('token');
        axios.get(host.URL_BACKEND+'/api/system/organization/department/'+idCompany,{
            headers: {'Authorization': 'Bearer '+token}
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            } else {
                self.setState({
                    listDepartment: JSON.parse(JSON.stringify(response.data.departmentCompany))
                });
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
                        Manage Roles
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RoleContainer listRole = {this.props.listRole} listDepartment={this.state.listDepartment}/>
                </Modal.Body>
            </Modal>
        )
    }
}
