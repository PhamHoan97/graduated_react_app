import React, { Component } from "react";
import "../../Style/Account/account.css";
import MenuVertical from "../Menu/MenuVertical";
import MenuHorizontal from "../Menu/MenuHorizontal";
export default class ManageAccount extends Component {
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
                        <div className="col-md-12">
                        <h1 className="title-4">
                            Welcome
                            <span>Admin !</span>
                        </h1>
                        <hr className="line-seprate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        <div className="statistic__item statistic__item--green">
                            <h2 className="number">10,368</h2>
                            <span className="desc">Companys</span>
                            <div className="icon">
                            <i className="zmdi zmdi-account-o" />
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="statistic__item statistic__item--orange">
                            <h2 className="number">388,688</h2>
                            <span className="desc">Members</span>
                            <div className="icon">
                            <i className="zmdi zmdi-shopping-cart" />
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="statistic__item statistic__item--blue">
                            <h2 className="number">1,086</h2>
                            <span className="desc">Process</span>
                            <div className="icon">
                            <i className="zmdi zmdi-calendar-note" />
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* MANAGER Company*/}
                    <div className="row">
                        <div className="col-md-12">
                        <h3 className="title-5 m-b-35 manage__company--notification">
                            Manager Company
                        </h3>
                        <div className="table-data__tool">
                            <div className="table-data__tool-left">
                            <div className="rs-select2--light rs-select2--sm">
                                <select
                                className="js-select2 select--today__adminAccount"
                                name="time"
                                >
                                <option selected="selected">Today</option>
                                <option value>3 Days</option>
                                <option value>1 Week</option>
                                <option value>1 Month</option>
                                </select>
                                <div className="dropDownSelect2" />
                            </div>
                            <button className="au-btn-filter ml-5">
                                <i className="zmdi zmdi-filter-list" />
                                filters
                            </button>
                            </div>
                        </div>
                        <div className="table-responsive table-responsive-data2">
                            <table className="table table-data2">
                            <thead>
                                <tr>
                                <th />
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Logo</th>
                                <th>Status</th>
                                <th />
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="tr-shadow">
                                <td>
                                    <label className="au-checkbox">
                                    <input type="checkbox" />
                                    <span className="au-checkmark" />
                                    </label>
                                </td>
                                <td>Công ty mua đi bán lại</td>
                                <td>
                                    <span className="block-email">
                                    lori@example.com
                                    </span>
                                </td>
                                <td className="desc">Cát Quế Hà Nội</td>
                                <td className="desc">0968823514</td>
                                <td>
                                    <img
                                    src="./system/images/icon/avatar-01.jpg"
                                    alt="aaa"
                                    />
                                </td>
                                <td className="desc">Active</td>
                                <td>
                                    <div className="table-data-feature">
                                    <button
                                        className="item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Approve"
                                    >
                                        <i className="zmdi zmdi-notifications-add" />
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Reject"
                                    >
                                        <i className="zmdi zmdi-xbox" />
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="modal"
                                        data-target="#scrollmodal"
                                        data-placement="top"
                                        title="New Account Admin"
                                    >
                                        <i className="zmdi zmdi-account-add" />
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Delete"
                                    >
                                        <i className="zmdi zmdi-delete" />
                                    </button>
                                    <button
                                        className="item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="More"
                                    >
                                        <i className="zmdi zmdi-more" />
                                    </button>
                                    </div>
                                </td>
                                </tr>
                                <tr className="spacer" />
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    {/*END MANAGER Company*/}
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
                {/* Model add item */}
                <div
                    className="modal fade"
                    id="scrollmodal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="scrollmodalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="scrollmodalLabel">
                            New Account Admin
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">
                        <div className="card-body card-block">
                            <form
                            action
                            method="post"
                            encType="multipart/form-data"
                            className="form-horizontal"
                            >
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Username
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                <input
                                    type="text"
                                    id="text-input"
                                    name="text-input"
                                    placeholder="Text"
                                    className="form-control"
                                />
                                <small className="form-text text-muted">
                                    This is a help text
                                </small>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col col-md-3">
                                <label
                                    htmlFor="text-input"
                                    className=" form-control-label"
                                >
                                    Email
                                </label>
                                </div>
                                <div className="col-12 col-md-9">
                                <input
                                    type="email"
                                    id="text-input"
                                    name="text-input"
                                    placeholder="Text"
                                    className="form-control"
                                />
                                <small className="form-text text-muted">
                                    This is a help text
                                </small>
                                </div>
                            </div>
                            </form>
                        </div>
                        </div>
                        <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary">
                            Send
                        </button>
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
