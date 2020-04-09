import React, { Component } from 'react'

export default class ChartOrganization extends Component {
    render() {
        return (
            <div className="col-md-9 org--chart_content">
                <div className="org--chart_menu">
                    <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-md-6">
                        <a href="##" className="org--chart_feature">
                            <i className="fa fa-university fa-2x" aria-hidden="true">
                            </i>
                            <p>
                            Manager Department
                            </p>
                        </a>
                        </div>
                        <div className="col-md-6">
                        <a href="##" className="org--chart_feature">
                            <i className="fa fa-user-circle fa-2x" aria-hidden="true">
                            </i>
                            <p>
                            Manager User
                            </p>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
