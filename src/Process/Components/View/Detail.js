import React, { Component } from 'react'
import { connect } from 'react-redux'

class Detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    renderEmployee = (employees) =>{
        var content = '';
        for (let index = 0; index < employees.length; index++) {
            content += '<p>' + employees[index].label + '</p>';
        }
        return content;
    } 

    render() {
        return (
            <div className="detail-area-view-process">
                <form
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                >
                    <div className="row">
                        <div className="col-md-5 title-footer">
                            <h4>Thông tin</h4>
                        </div>
                    </div>            
                    <div className="row">
                        <div className="col-md-2">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Thời gian
                        </label>
                        </div>
                        <div className="col-md-10 letf-colum-detail">
                            <p> {this.props.detail.time}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Giao cho
                        </label>
                        </div>
                        <div className="col-md-10 letf-colum-detail form"  
                            dangerouslySetInnerHTML={{__html: this.renderEmployee(this.props.detail.assign)}}>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Mô tả
                        </label>
                        </div>
                        <div className="col-md-10 letf-colum-detail">
                            <p> {this.props.detail.description}. </p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        detail: state.systemReducers.manageSystemReducer.informationProcessReducer.information,
    }
}

export default connect(mapStateToProps)(Detail)