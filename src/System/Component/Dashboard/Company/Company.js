import React, { Component } from 'react'

export default class Company extends Component {
    render() {
        return (
            <div className="row">
                {
                  this.props.children
                }
            </div>
        )
    }
}
