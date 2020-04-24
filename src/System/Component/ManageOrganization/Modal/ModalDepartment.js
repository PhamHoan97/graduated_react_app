import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import DepartmentContainer from '../../../Container/ManageOrganization/Manage/DepartmentContainer'
export default class ModalDepartment extends Component {
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
                        Manage Department
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DepartmentContainer  listDepartment = {this.props.listDepartment}/>
                </Modal.Body>
            </Modal>
        )
    }
}
