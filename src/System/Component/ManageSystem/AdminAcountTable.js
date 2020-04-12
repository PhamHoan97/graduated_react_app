import React, { Component } from 'react'

class AdminAcountTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
        <div className="col col-md-12">
            <div className="table-responsive table-responsive-data2">
                <table className="table table-data2">
                    <thead>
                        <tr>
                            <th/>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Send</th>
                            <th>Updated At</th>
                            <th>Action</th>
                            <th/>
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
                            <td>BKNbkldf13</td>
                            <td>
                                <span className="block-email">
                                    PPLpolkd22
                                </span>
                            </td>
                            <td className="desc">Sent</td>
                            <td className="desc">20-3-2020</td>
                            <td className="desc">
                                <button type="button" className="btn btn-danger">Resend</button>
                            </td>
                        </tr>
                        <tr className="spacer" />
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AdminAcountTable
