import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import RoleContainer from '../../../Container/ManageOrganization/Manage/RoleContainer'
export default class ModalRole extends Component {
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
                    <RoleContainer/>
                </Modal.Body>
            </Modal>
        )
    }
}
