import React, { Component } from "react";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
import * as host from "../../Constants/Url";
import axios from "axios";
import DetailInformation from "./DetailInformation";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default class CompanyInformation extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            detailCompany: {},
        };
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    getDetailCompany = () =>{
        var self = this;
        var token = localStorage.getItem("token");
        var idCompany = localStorage.getItem("company_id");
        axios
        .post(
            host.URL_BACKEND + "/api/system/company/information",
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
    }

    componentWillMount() {
       this.getDetailCompany();
    }

    displayDetailCompany = () => {
        if (isEmpty(this.state.detailCompany)) {
        return <div></div>;
        } else {
        return <DetailInformation 
        detailCompany={this.state.detailCompany} 
        reloadPageAfterEdit={this.getDetailCompany}/>;
        }
    };
    render() {
        return (
            <div className="page-wrapper">
                <MenuHorizontal />
                    <div className="page-container">
                        <MenuVertical />
                        <div className="main-content">
                            <div>
                                <div className="section__content section__content--p30">
                                    <div className="container-fluid">
                                    <div className="row">
                                        {this.displayDetailCompany()}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="copyright">
                                                <p>
                                                Copyright © 2018 Colorlib. All rights reserved.
                                                Template by{" "}
                                                <a href="https://colorlib.com">Colorlib</a>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
