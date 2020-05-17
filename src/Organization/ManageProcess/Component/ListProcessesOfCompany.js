import React, { Component } from 'react'

class ListProcessesOfCompany extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="inner-wrapper manage-organization_template">
              <Header />
              <div
                className="page-wrapper_organization"
                style={{ transform: "none" }}
              >
                <div className="container-fluid" style={{ transform: "none" }}>
                  <div className="row" style={{ transform: "none" }}>
                    <div
                      className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar"
                      style={{
                        position: "relative",
                        overflow: "visible",
                        boxSizing: "border-box",
                        minHeight: "1px",
                      }}
                    >
                      <Menu/>
                    </div>
                    <div className="col-xl-9 col-lg-8  col-md-12">
                      <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                         <LinkPage linkPage=" Quản lí quy trình"/>
                      </div>
                      <div className="row">
                        <div className="col-md-12 d-flex">
                          <div className="card ctm-border-radius shadow-sm flex-fill ">
                            <div className="card-header">
                              <h4 className="card-title mb-0">Quản lí quy trình</h4>
                            </div>
                            <div className="card-body">
                            <div className="table-data__tool">
                              <div className="table-data__tool-left">
                                <div className="rs-select2--light rs-select2--md">
                                  <DepartmentOptionSearch />
                                  <div className="dropDownSelect2" />
                                </div>
                              </div>
                              <div className="table-data__tool-right">
                                <button
                                  className="au-btn au-btn-icon au-btn--green au-btn--small"
                                  data-toggle="modal"
                                  onClick={(e) => this.handleOpenAddNewProcessModal(e)}
                                >
                                  <i className="zmdi zmdi-plus" />
                                  Thêm quy trình
                                </button>
                                <button
                                  id="clone-button-add-new-process"
                                  className="au-btn au-btn-icon au-btn--green au-btn--small"
                                  data-toggle="modal"
                                  data-target="#form-add-new-process"
                                  style={{display:"none"}}
                                >
                                  <i className="zmdi zmdi-plus" />
                                  Thêm quy trình
                                </button>
                              </div>
                            </div>
                              <div className="employee-office-table">
                                  <div className="table-responsive">
                                    <table className="table custom-table table-hover table-department_organization">
                                      <thead>
                                      <tr>
                                        <th className="text-center">tên quy trình</th>
                                        <th className="text-center">mô tả ngắn</th>
                                        <th className="text-center">giao cho</th>

                                        <th />
                                      </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                  </table>
                                  </div>
                                </div>
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

export default ListProcessesOfCompany
