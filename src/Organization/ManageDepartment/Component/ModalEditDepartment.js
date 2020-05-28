import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import host from '../../../Host/ServerDomain'; 
import { Modal } from "react-bootstrap";
import Validator from "../Utils/Validator";
import { connect } from "react-redux";
import { isEmpty } from "validator";

class ModalEditDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert: false,
            errors: {},
            editNameDepartment: this.props.editDepartment.name,
            editSignatureDepartment: this.props.editDepartment.signature,
            editDescriptionDepartment: this.props.editDepartment.description,
        };
        const rules = [
            {
                field: "editNameDepartment",
                method: "isEmpty",
                validWhen: false,
                message: "Tên phòng ban không được trống.",
            },
            {
                field: "editSignatureDepartment",
                method: "isEmpty",
                validWhen: false,
                message: "Tên viết tắt không được trống.",
            },
            {
                field: "editDescriptionDepartment",
                method: "isEmpty",
                validWhen: false,
                message: "Mô tả của phòng ban không được trống.",
            },
        ];
        this.validator = new Validator(rules);
        this.handleChange = this.handleChange.bind(this);
        console.log(this.props.editDepartment);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
          errors: {},
        })
    }
    render() {
        const { errors } = this.state;
        return (
        <Modal
            size="lg"
            show={this.props.showModal}
            onHide={this.props.close}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Sửa thông tin phòng ban
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <>
                <form>
                <div className="form-group">
                    <label htmlFor="name">Tên</label>
                    <input
                        type="text"
                        className="form-control"
                        name="editNameDepartment"
                        value={this.state.editNameDepartment}
                        onChange={(event) => this.handleChange(event)}
                    />
                    {errors.editNameDepartment && (
                    <div
                        className="validation"
                        style={{ display: "block", color: "red" }}
                    >
                        {errors.editNameDepartment}
                    </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="role">Viết tắt</label>
                    <input
                        type="text"
                        className="form-control"
                        name="editSignatureDepartment"
                        value={this.state.editSignatureDepartment}
                        onChange={(event) => this.handleChange(event)}
                    />
                    {errors.editSignatureDepartment && (
                    <div
                        className="validation"
                        style={{ display: "block", color: "red" }}
                    >
                        {errors.editSignatureDepartment}
                    </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Miêu tả</label>
                    <textarea
                    className="form-control"
                    name="editDescriptionDepartment"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.editDescriptionDepartment}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    />
                    {errors.editDescriptionDepartment && (
                    <div
                        className="validation"
                        style={{ display: "block", color: "red" }}
                    >
                        {errors.editDescriptionDepartment}
                    </div>
                    )}
                </div>
                <div className="form-group text-left">
                    <button
                    type="submit"
                    className="btn btn-primary mb-2 mr-2"
                    onClick={(e) => this.saveEditDepartment(e)}
                    >
                    Lưu
                    </button>
                </div>
                </form>
                {this.displayAlert()}
            </>
            </Modal.Body>
        </Modal>
        );
    }

    displayAlert = () => {
        if (this.state.isDisplayAlert) {
        return <Alert severity="success">Lưu thành công !!!</Alert>;
        } else {
        return <div></div>;
        }
    };

    saveEditDepartment = (e) => {
        e.preventDefault();
        if(
            isEmpty(this.state.editNameDepartment)
            ||isEmpty(this.state.editSignatureDepartment)
            ||isEmpty(this.state.editDescriptionDepartment)
            )
        {
            this.setState({
              errors: this.validator.validate(this.state),
            });
        }else{
            var self = this;
            var token = localStorage.getItem("token");
            axios.patch(host +'/api/company/organization/department/update', {
                editNameDepartment: this.state.editNameDepartment,
                editSignatureDepartment: this.state.editSignatureDepartment,
                editDescriptionDepartment:this.state.editDescriptionDepartment,
                idDepartment:this.props.editDepartment.id
            },{
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                if (response.data.error != null) {
                console.log(response.data.error);
                } else {
                self.setState({
                    isDisplayAlert: true,
                });
                setTimeout(() => {
                    self.setState({ isDisplayAlert: false });
                }, 2000);
                }
                self.props.getListDepartment();
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };
}
const mapStateToProps = (state, ownProps) => {
    return {
        editDepartment:
        state.organizationReducers.departmentOrganizationReducer
            .editDepartmentOrganization,
    };
};
export default connect(mapStateToProps, null)(ModalEditDepartment);
