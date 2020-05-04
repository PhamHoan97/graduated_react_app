import React, { Component } from 'react'

class IsoRule extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        if(this.props.process){
            return (
                <div className="process-view-iso-rule">
                    <div className="row">
                        <div className="col-md-6 title-footer">
                            <h4>Tiêu chuẩn </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 letf-colum-detail">
                            <p>
                                ISO 9000
                            </p>
                        </div>
                        <div className="col-md-6 letf-colum-detail">
                            <div className="btn-group">
                                <button className="btn btn-info iso-btn">Chi tiết</button>
                                <button className="btn btn-danger iso-btn" style={{marginLeft:'5px'}}>Xóa</button>
                            </div>
                        </div>
                    </div>   
                    <div className="row iso">
                        <div className="col-md-6 letf-colum-detail">
        
                        </div>
                        <div className="col-md-6 letf-colum-detail">
                            <div className="btn-group">
                                <button className="btn btn-primary iso-btn" style={{right:"0px"}}>Thêm</button>
                            </div>
                        </div>
                    </div>    
                </div>
            ) 
        }else{
            return (
                <div className="process-view-iso-rule">
                    <div className="row">
                        <div className="col-md-8 title-footer">
                            <h4>Tiêu chuẩn </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                ISO 9000
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-info">Chi tiết</button>
                        </div>
                    </div>   
                </div>
            )
        }
    }
}

export default IsoRule;
