import React, { Component } from "react";
import host from '../../../Host/ServerDomain';
import axios from "axios";

class ContactCompanyContainer extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            detailCompany : [],
        }
    }
    componentDidMount() {
        this.getDetailCompany();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getDetailCompany = () => {
        this._isMounted = true;
        var self =  this;
        var token = localStorage.getItem("token");
        axios.get(host + "/api/system/dashboard/company/"+this.props.idCompany,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if(self._isMounted){
                self.setState({
                    detailCompany:response.data.company
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    displayImageCompany = () =>{
        if(this.state.detailCompany.avatar === null){
            return(
                <img src={window.location.origin + '/system/images/company1.jpg'} style={{ height: "284px" }} alt="img-company"></img>
            )
        }else{
            return(
                <img src={host + this.state.detailCompany.avatar} style={{ height: "284px" }} alt="img-company"></img>
            )
        }
    }

    convertWorkforceCompany = (workforce) => {
        var result;
        switch (workforce) {
            case 1:
                result = "Ít hơn 50 nhân viên";   
                break; 
            case 2:
                result = "Từ 50 đến 100 nhân viên";   
                break;  
            case 3:
                result = "Từ 100 đến 200 nhân viên";   
                break;  
            case 4:
                result = "Từ 200 đến 300 nhân viên";   
                break;  
            case 5:
                result = "Nhiều hơn 300 nhân viên";   
                break;                                                          
            default:
                break;
        }
        return result;
    }

    render() {
        return (
            <div className="map-data m-b-40">
                <h3 className="title-3 m-b-30 detail--company__title">
                <i className="zmdi zmdi-map" />
                Chi tiết Công ty
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
                        <td>Tên công ty</td>
                        <td>{this.state.detailCompany.name}</td>
                        </tr>
                        <tr>
                        <td>Lĩnh vực</td>
                        <td>{this.state.detailCompany.field}</td>
                        </tr>
                        <tr>
                        <td>Nhân lực</td>
                        <td>{this.convertWorkforceCompany(this.state.detailCompany.workforce)}</td>
                        </tr>
                        <tr>
                        <td>Người đứng đầu</td>
                        <td>{this.state.detailCompany.ceo}</td>
                        </tr>
                        <tr>
                        <td>Địa chỉ</td>
                        <td>{this.state.detailCompany.address}</td>
                        </tr>
                        <tr>
                        <td>Kí hiệu</td>
                        <td>{this.state.detailCompany.signature}</td>
                        </tr>
                        <tr>
                        <td>Liên hệ</td>
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
