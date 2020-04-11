import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import UserContainer from '../../../Container/ManageOrganization/Manage/UserContainer'
export default class ModalUser extends Component {
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
                    <UserContainer/>
                </Modal.Body>
            </Modal>
        )
    }
}
