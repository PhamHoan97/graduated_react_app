import React, { Component } from 'react'

export default class Company extends Component {
    render() {
        return (
            <div className="row mb-5">
                <div className="card-deck">
                    {
                    this.props.children
                    }
                </div>
            </div>
        )
    }
}
