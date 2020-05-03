import React, { Component } from 'react';
import avatar from "../../Images/Account/Avatar-01.jpg";
import UpdateInformationModal from './UpdateInformationModal';
import * as host from "../../Constants/Url";
function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

class DetailInformation extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModalEditCompany: false,
        }
    }
    
    getImageCompany = () =>{
        if(this.props.detailCompany.avatar === null){
            return(
                <img src={avatar} alt="user" className="image--user" />
            )
        }else{
            return(
                <img src={host.URL_BACKEND+this.props.detailCompany.avatar} alt="user" className="image--user" />
            )
        }
    }

    getDetailModalUpdate = () => {
        if (isEmpty(this.props.detailCompany)) {
            return <div></div>;
        } else {
            return  <UpdateInformationModal
            showModal={this.state.showModalEditCompany}
            close={() => this.closeModal()}
            detailCompany = {this.props.detailCompany} />
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
        this.props.reloadPageAfterEdit();
    };
    render() {
        return (
           <>
            <div className="col-md-3">

                <div className="avatar--user">
                    {
                        this.getImageCompany()
                    }
                </div>
            </div>
            <div className="col-md-9">

                <h2 className="mb-5 manage__account--information">
                    Company Information
                </h2>
                {
                    this.getDetailModalUpdate()
                }
                <div className="information--user">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="col">Name</th>
                                <td>{this.props.detailCompany.name}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-success btn--edit_user"
                                        onClick={(e) => this.openModal(e)}
                                    >
                                    Edit
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Signature</th>
                                <td>{this.props.detailCompany.signature}</td>
                            </tr>
                            <tr>
                                <th scope="col">Address</th>
                                <td>{this.props.detailCompany.address}</td>
                            </tr>
                            <tr>
                                <th scope="col">Field</th>
                                <td>{this.props.detailCompany.field}</td>
                            </tr>
                            <tr>
                                <th scope="col">Workforce</th>
                                <td>{this.props.detailCompany.workforce}</td>
                            </tr>
                            <tr>
                                <th scope="col">CEO</th>
                                <td>{this.props.detailCompany.ceo}</td>
                            </tr>
                            <tr>
                                <th scope="col">Contact</th>
                                <td>{this.props.detailCompany.contact}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           </>
        );
    }
}

export default DetailInformation;