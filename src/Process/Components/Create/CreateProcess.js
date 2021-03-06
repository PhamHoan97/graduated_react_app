import React, { Component } from 'react'
import Process from './Process';
import Note from './Note';
import Comment from './Comment';
import Header from './Header';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import CreateDetail from "../Create/CreateDetail";
import {updateProcessInformation} from '../../../Organization/ManageProcess/Actions/Index';
import Templates from './Templates';

class CreateProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openDetails: false,     
        }
    }

    openPopUp = (event) => {
        event.preventDefault();
        this.setState({openDetails:true});
        this.props.passPopupStatus(true);
    }

    initStatusPopup = () => {
        this.setState({openDetails:true});
        this.props.passPopupStatus(true);
    }

    closePopup = (event) => {
        event.preventDefault();
        this.setState({openDetails:false});
        this.props.passPopupStatus(false);
    }

    UNSAFE_componentWillMount() {
        var processInfo = localStorage.getItem("processInfo");
        if(processInfo){
            var information = JSON.parse(processInfo);
            this.props.updateProcessInformation(information);
        }
        this.initStatusPopup();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        this.setState({openDetails: nextProps.statusPopup});
    }

    render() {
        if(this.state.openDetails){
            return(
                <React.Fragment>
                    <div className="container-fluid">
                        <div className="row">
                            <Header />
                        </div>
                        <div className="row">
                            <div className="col-md-9 full-page">
                                <Process />
                            </div>
                            <div className="col-md-3">
                                <div className="button-details-right-open">
                                    <button onClick={(e) => this.closePopup(e)}>
                                        <i className="fas fa-align-justify"></i> Chi ti???t
                                    </button>
                                </div>
                                <div className="right-column-popup">
                                    <Note />
                                    <Comment />
                                </div>
                            </div>
                        </div>
                        <div className="space-area"></div>
                        <div className="row footer-view-process">  
                            <div className="col-md-5">
                                <CreateDetail />
                            </div>
                            <div className="col-md-4">
                                <Templates />
                            </div>
                        </div>
                        <div className="space-area"></div>
                    </div>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <div className="container-fluid">
                        <div className="row">
                            <Header />
                        </div>
                        <div className="row">
                            <div className="col-md-12 full-page">
                                <Process />
                                <div className="button-details-right-close">
                                    <button onClick={(e) => this.openPopUp(e)}>
                                        <i className="fas fa-align-justify"></i> Chi ti???t
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="space-area"></div>
                        <div className="row footer-view-process">  
                            <div className="col-md-5">
                                <CreateDetail />
                            </div>
                            <div className="col-md-4">
                                <Templates />
                            </div>
                        </div>
                        <div className="space-area"></div>
                    </div>
                </React.Fragment>
            )   
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusPopup: state.processReducers.popupReduders.status,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        passPopupStatus: (status) => {
            dispatch(actions.passPopupStatus(status));
        },
        updateProcessInformation: (information) => {
            dispatch(updateProcessInformation(information));
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProcess);
