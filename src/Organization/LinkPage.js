import React, { Component } from "react";

export default class LinkPage extends Component {
  render() {
    return (
      <div className="card-body py-4">
        <div className="row">
          <div className="col-md-12 mr-auto text-left">
            <div className="custom-search input-group">
              <div className="custom-breadcrumb">
                <ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
                  <li className="breadcrumb-item d-inline-block">
                    <a href="index.html" className="text-dark">
                      Trang chủ
                    </a>
                  </li>
                  <li className="breadcrumb-item d-inline-block active">
                    {this.props.linkPage}
                  </li>
                </ol>
                {/* <h4 className="text-dark">Quản lí công ty</h4> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

