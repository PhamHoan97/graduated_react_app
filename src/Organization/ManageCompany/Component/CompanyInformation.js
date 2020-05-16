import React, { Component } from "react";
import "../../Style/Organization.scss";
import "../Style/DetailCompany.scss";
import axios from "axios";
import * as host from "../../Url";
import ModalUpdateCompany from './ModalUpdateCompany';
import avatarCompany from '../Image/company1.jpg';
export default class CompanyInformation extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailCompany: {},
            showModalEditCompany: false,
        };
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    getDetailCompany = () => {
        var self = this;
        var token = localStorage.getItem("token");
        var idCompany = localStorage.getItem("company_id");
        axios.post(host.URL_BACKEND + "/api/system/company/information",
        {
            idCompany: idCompany,
        },
        {
            headers: { Authorization: "Bearer " + token },
        }
        )
        .then(function (response) {
            if (response.data.error != null) {
            console.log(response.data.error);
            } else {
            self.setState({
                detailCompany: response.data.company,
            });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    UNSAFE_componentWillMount() {
        this.getDetailCompany();
    }

    getImageCompany = () =>{
        if(this.state.detailCompany.avatar === null || this.state.detailCompany.avatar === ""){
            return(
                <img src={avatarCompany} alt="" className="img-fluid rounded-circle avatar-company"
                width={100} />
            )
        }else{
            return(
                <img src={host.URL_BACKEND+this.state.detailCompany.avatar} alt="" className="img-fluid rounded-circle avatar-company"
                width={100} />
            )
        }
    }
    openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            showModalEditCompany: true,
        });
    };

    closeModal = () => {
        this.setState({
            showModalEditCompany: false,
        });
        this.getDetailCompany();
    };

    render() {
        if (this.state.detailCompany.length !== 0) {
        return (
            <div className="row manage-detailCompany_organization">
            <div className="col-xl-8 col-lg-12 col-md-7 d-flex">
                <div className="card ctm-border-radius shadow-sm flex-fill">
                <div className="card-header">
                    <h4 className="card-title mb-0">
                        {
                            this.state.detailCompany.name
                        }
                    </h4>
                </div>
                <div className="card-body">
                    <div className="row text-left">
                    <div className="col-md-3">
                        <div className="user-avatar mb-4">
                            {
                                this.getImageCompany()
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <p>
                        <span className="title-detail_company">Lãnh đạo : </span>
                            {
                                this.state.detailCompany.ceo
                            }
                        </p>
                        <p>
                        <span className="title-detail_company">Viết tắt :</span>
                            {
                                this.state.detailCompany.signature
                            }
                        </p>
                        <p>
                        <span className="title-detail_company">Nhân lực : </span>
                            {
                                this.state.detailCompany.workforce
                            }
                        </p>
                    </div>
                    <div className="col-md-5">
                        <p>
                        <span className="title-detail_company">Địa chỉ:</span>
                        <br />
                            {
                                this.state.detailCompany.address
                            }
                        </p>
                    </div>
                    </div>
                    <div className="text-center mt-3">
                    <ModalUpdateCompany
                        showModal={this.state.showModalEditCompany}
                        close={() => this.closeModal()}
                        detailCompany = {this.state.detailCompany} />
                    <button
                        className="btn btn-theme text-white ctm-border-radius button-1"
                        data-toggle="modal"
                        data-target="#add-information"
                        onClick={(e) => this.openModal(e)}
                    >
                        Cập nhật thông tin công ty
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-4 d-flex">
                <div className="card ctm-border-radius shadow-sm flex-fill">
                <div className="card-header">
                    <h4 className="card-title mb-0">Liên lạc</h4>
                </div>
                <div className="card-body">
                    {/* <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Contact"
                    />
                    </div>
                    <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="focustechnology.com"
                    />
                    </div> */}
                    <div className="input-group mb-0">
                    <label className="title-detail_company">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        defaultValue={this.state.detailCompany.contact}
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
        } else {
            return <div className="row manage-detailCompany_organization"></div>;
        }
    }
}
