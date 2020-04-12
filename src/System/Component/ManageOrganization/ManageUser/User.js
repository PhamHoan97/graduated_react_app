import React, { Component } from 'react'

export default class User extends Component {
    render() {
        return (
            <div className="form-group">
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-stripe list-member">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Department</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.children}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}