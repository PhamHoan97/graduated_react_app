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
                        <div className="col-md-8 title-footer">
                            <h4>Rules </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9000
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-danger iso-btn">Delete</button>
                        </div>
                    </div>  
                    <div className="row iso">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9001
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-danger iso-btn">Delete</button>
                        </div>
                    </div> 
                    <div className="row iso">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9002
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-danger iso-btn">Delete</button>
                        </div>
                    </div> 
                    <div className="row iso">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9003
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-danger iso-btn">Delete</button>
                        </div>
                    </div>
                    <div className="row iso">
                        <div className="col-md-8 letf-colum-detail">
        
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-primary iso-btn">Add Rule</button>
                        </div>
                    </div>    
                </div>
            ) 
        }else{
            return (
                <div className="process-view-iso-rule">
                    <div className="row">
                        <div className="col-md-8 title-footer">
                            <h4>Rules </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9000
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-info">Detail</button>
                        </div>
                    </div>  
                    <div className="row iso">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9001
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-info">Detail</button>
                        </div>
                    </div> 
                    <div className="row iso">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9002
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-info">Detail</button>
                        </div>
                    </div> 
                    <div className="row iso">
                        <div className="col-md-8 letf-colum-detail">
                            <p>
                                Standar ISO 9003
                            </p>
                        </div>
                        <div className="col-md-4 letf-colum-detail">
                            <button className="btn btn-info">Detail</button>
                        </div>
                    </div>  
                </div>
            )
        }
    }
}

export default IsoRule;
