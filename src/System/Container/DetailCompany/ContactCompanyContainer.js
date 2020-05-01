import React, { Component } from "react";
import * as host from "../../Constants/Url";
import axios from "axios";
class ContactCompanyContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailCompany : [],
        }
    }
    componentWillMount() {
        this.getDetailCompany();
    }

    getDetailCompany = () => {
        var self =  this;
        axios.get(host.URL_BACKEND+"/api/system/dashboard/company/"+this.props.idCompany)
        .then(function (response) {
            self.setState({
                detailCompany:response.data.company
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    displayImageCompany = () =>{
        if(this.state.avatar === null){
            return(
                <img src={window.location.origin + '/system/images/company1.jpg'} style={{ height: "284px" }} alt="img-company"></img>
            )
        }else{
            return(
                <img src={host.URL_BACKEND + this.state.detailCompany.avatar} style={{ height: "284px" }} alt="img-company"></img>
            )
        }
    }

    render() {
        return (
            <div className="map-data m-b-40">
                <h3 className="title-3 m-b-30 detail--company__title">
                <i className="zmdi zmdi-map" />
                detail data
                </h3>
                {/* Map Company */}
                <div className="map-wrap m-t-40 m-b-60">
                    {this.displayImageCompany()}
                </div>
                <div className="table-wrap">
                <div className="table-responsive table-style1">
                    <table className="table">
                    <tbody>
                        <tr>
                        <td>Name</td>
                        <td>{this.state.detailCompany.name}</td>
                        </tr>
                        <tr>
                        <td>Field</td>
                        <td>{this.state.detailCompany.field}</td>
                        </tr>
                        <tr>
                        <td>Workforce</td>
                        <td>{this.state.detailCompany.field}</td>
                        </tr>
                        <tr>
                        <td>Ceo</td>
                        <td>{this.state.detailCompany.ceo}</td>
                        </tr>
                        <tr>
                        <td>Address</td>
                        <td>{this.state.detailCompany.address}</td>
                        </tr>
                        <tr>
                        <td>Signature</td>
                        <td>{this.state.detailCompany.signature}</td>
                        </tr>
                        <tr>
                        <td>Contact</td>
                        <td>{this.state.detailCompany.contact}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        );
    }
}

export default ContactCompanyContainer;
