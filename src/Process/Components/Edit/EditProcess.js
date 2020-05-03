import React, { Component } from 'react'
import Process from '../Edit/Process';
import Note from './Note';
import Comment from './Comment';
import Header from '../Create/Header';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import IsoRule from "../View/IsoRule";
import axios from 'axios';
import EditDetail from './EditDetail';
import {updateProcessInformation} from '../../../System/Action/System/Index';

class EditProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openDetails: false,
            initDiagram:  '',     
        }
    }

    openPopUp = (event) => {
        event.preventDefault();
        this.setState({openDetails:true});
        this.props.passPopupStatus(true);
    }

    closePopup = (event) => {
        event.preventDefault();
        this.setState({openDetails:false});
        this.props.passPopupStatus(false);
    }
    
    convertToAssignInDataStore(employees){
        var assign = [];
        for (let index = 0; index < employees.length; index++) {
            assign.push({'value': employees[index].id, 'label': employees[index].name});
        }
        return assign;
    }

    extractDataToComponent(process){
        var detail = {
            id:process.id,
            name:process.name,
            description: process.description,
            time: process.update_at,
            assign: this.convertToAssignInDataStore(process.employees),
        }

        var notes = [];
        var comments = [];
        var elements = [];
        for (var indexM = 0; indexM < process.elements.length; indexM++) {
            var eNotes = {};
            var eComments = [];
            for (var indexN = 0; indexN < process.element_notes.length; indexN++) {
                if(process.elements[indexM].id === process.element_notes[indexN].element_id){
                    eNotes = {
                            id: process.elements[indexM].element, 
                            note: process.element_notes[indexN].content, 
                        };
                    notes.push({
                        id:process.elements[indexM].element, 
                        note: process.element_notes[indexN].content,
                    });
                }                
            }
            for (var indexP = 0; indexP < process.element_comments.length; indexP++) {
                if(process.elements[indexM].id === process.element_comments[indexP].element_id){
                    eComments.push({
                        time: process.element_comments[indexP].update_at,
                        admin_id: process.element_comments[indexP].admin_id,
                        content: process.element_comments[indexP].comment,
                    });
                }                
            }
            if(eComments.length){
                comments.push({
                    id: process.elements[indexM].element,
                    comments: eComments,
                });
            }
            var element = {
                id: process.elements[indexM].element,
                type: process.elements[indexM].type,
                comments: eComments,
            }
            if(eNotes.note){
                element.note = eNotes.note;
            }else{
                element.note = "";
            }
            
            elements.push(element);
        }

        this.props.updateProcessInformation(detail);
        this.props.extractDataElementWhenEdit(elements, notes, comments);
        this.props.changeHeaderStatusToEdit();
    }

    componentDidMount() {
        var idProcess = this.props.match.params.id;
        var token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/company/process/information/` + idProcess,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              this.extractDataToComponent(res.data.process);
              this.setState({initDiagram: res.data.process.xml});
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if(nextProps.statusPopup){
            this.setState({openDetails: nextProps.statusPopup});
        }
    }

    render() {
        if(this.state.openDetails){
            return(
                <React.Fragment>
                    <div className="row">
                        <Header />
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <Process init={this.state.initDiagram}/>
                        </div>
                        <div className="col-md-3">
                            <div className="button-details-right-open">
                                <button onClick={(e) => this.closePopup(e)}>
                                    <i className="fas fa-align-justify"></i> Details
                                </button>
                            </div>
                            <div className="right-column-popup">
                                <Note />
                                <Comment />
                            </div>
                        </div>
                    </div>
                    <div className="row footer-view-process">  
                        <div className="col-md-6">
                            <EditDetail />
                        </div>
                        <div className="col-md-3">
                            <IsoRule process={true} />
                        </div>
                    </div>
                    <div className="space-area"></div>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <div className="row">
                        <Header />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Process init={this.state.initDiagram}/>
                            <div className="button-details-right-close">
                                <button onClick={(e) => this.openPopUp(e)}>
                                    <i className="fas fa-align-justify"></i> Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row footer-view-process">  
                        <div className="col-md-6">
                            <EditDetail />
                        </div>
                        <div className="col-md-3">
                            <IsoRule process={true} />
                        </div>
                    </div>
                    <div className="space-area"></div>
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
        extractDataElementWhenEdit: (elements, notes, comments) => {
            dispatch(actions.extractDataElementWhenEdit(elements, notes, comments))
        },
        updateProcessInformation: (information) => {
            dispatch(updateProcessInformation(information));
        },
        changeHeaderStatusToEdit: () => {
            dispatch(actions.changeHeaderStatusToEdit());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProcess);
