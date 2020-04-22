import React, { Component } from 'react'

class Detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
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
                            <h4>Information</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Created By
                        </label>
                        </div>
                        <div className="col-md-10 letf-colum-detail">
                            <p> Trần Viết Huy</p>
                        </div>
                    </div>             
                    <div className="row">
                        <div className="col-md-2">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Time
                        </label>
                        </div>
                        <div className="col-md-10 letf-colum-detail">
                            <p> 16-12-1997</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Assign to
                        </label>
                        </div>
                        <div className="col-md-10 letf-colum-detail form">
                            <p> Phạm Hoàn</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                        <label
                            htmlFor="text-input"
                            className=" form-control-label"
                        >
                            Description
                        </label>
                        </div>
                        <div className="col-md-10 letf-colum-detail">
                            <p> In to am attended desirous raptures declared diverted confined at. 
                                Collected instantly remaining up certainly to necessary as. Over walk 
                                dull into son boy door went new. At or happiness commanded daughters as. 
                                Is handsome an declared at received in extended vicinity subjects. 
                                Into miss on he over been late pain an. Only week bore boy what fat case left use.
                                Match round scale now sex style far times. Your me past an much. </p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Detail
