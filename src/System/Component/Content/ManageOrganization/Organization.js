import React, { Component } from "react";
import "../../../Style/Organization/orgChart.css";
import ModalDepartment from "./Modal/ModalDepartment";
import ModalUser from "./Modal/ModalUser";

export default class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalDepartment: false,
      showModalUser: false,
    };
  }

  closeDepartment = () => {
    this.setState({ showModalDepartment: false });
  };

  openDepartment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModalDepartment: true });
  };

  closeUser = () => {
    this.setState({ showModalUser: false });
  };

  openUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModalUser: true });
  };

  render() {
    return (
      <div className="main-content">
        <div className="section__content section__content--p30 content__organization">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 org--chart_content">
                <div className="org--chart_menu">
                  <div className="container-fluid">
                    <div className="row text-center">
                      <div className="col-md-6">
                        <a
                          href="##"
                          className="org--chart_feature"
                          onClick={(e) => this.openDepartment(e)}
                        >
                          <i
                            className="fa fa-university fa-2x"
                            aria-hidden="true"
                          ></i>
                          <p>Manager Department</p>
                        </a>
                      </div>
                      <div className="col-md-6">
                        <a href="##" className="org--chart_feature"  onClick={(e) => this.openUser(e)}>
                          <i
                            className="fa fa-user-circle fa-2x"
                            aria-hidden="true"
                          ></i>
                          <p>Manager User</p>
                        </a>
                        <ModalDepartment
                          showModal={this.state.showModalDepartment}
                          close={() => this.closeDepartment()}
                        />
                        <ModalUser
                          showModal={this.state.showModalUser}
                          close={() => this.closeUser()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>Do thi</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="copyright">
                  <p>
                    Copyright © 2018 Colorlib. All rights reserved. Template by{" "}
                    <a href="https://colorlib.com">Colorlib</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
