import React, { Component } from 'react'
import Process from '../Edit/Process';
import Note from './Note';
import Comment from './Comment';
import Header from '../Create/Header';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import axios from 'axios';
import EditDetail from './EditDetail';
import {updateProcessInformation} from '../../../Organization/ManageProcess/Actions/Index';
import host from '../../../Host/ServerDomain';

class EditProcess extends Component {
    _isMounted = false;
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

    initStatusPopup = () => {
        this.setState({openDetails:true});
        this.props.passPopupStatus(true);
    }

    closePopup = (event) => {
        event.preventDefault();
        this.setState({openDetails:false});
        this.props.passPopupStatus(false);
    }
    
    convertToAssignInDataStore(type, employees, roles, departments){
        var assign = [];
        if(type === 1){
            for (let index = 0; index < employees.length; index++) {
                assign.push({'value': employees[index].id, 'label': employees[index].name});
            }
        }else if(type === 2){
            for (let index = 0; index < roles.length; index++) {
                assign.push({'value': roles[index].id, 'label': roles[index].name});
            }
        }else if(type === 3){
            for (let index = 0; index < departments.length; index++) {
                assign.push({'value': departments[index].id, 'label': departments[index].name});
            }
        }
        return assign;
    }

    extractDataToComponent(process){
        console.log(process);
        var detail = {
            id:process.id,
            code:process.code,
            name:process.name,
            description: process.description,
            time: process.update_at,
            deadline: process.deadline,
            assign: this.convertToAssignInDataStore(process.type,process.employees, process.roles, process.departments),
            type: process.type,
        }

        var notes = [];
        var comments = [];
        var elements = [];
        var assigns = [];
        var files = [];
        var issavenotes = [];
        var names = [];
        for (var indexM = 0; indexM < process.elements.length; indexM++) {
            var eNotes = {};
            var eComments = [];
            var eAssigns = [];
            var eFiles = [];
            var isSaved = false;
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
                    eAssigns = {
                        id: process.elements[indexM].element, 
                        assign: JSON.parse(process.element_notes[indexN].assign),
                    };
                    assigns.push({
                        id:process.elements[indexM].element, 
                        assign: JSON.parse(process.element_notes[indexN].assign),
                    });

                    eFiles = {
                        id: process.elements[indexM].element, 
                        file: process.element_notes[indexN].document,
                    };
                    files.push({
                        id:process.elements[indexM].element, 
                        file: process.element_notes[indexN].document,
                    });
                }                
            }
            for (var indexP = 0; indexP < process.element_comments.length; indexP++) {
                if(process.elements[indexM].id === process.element_comments[indexP].element_id){
                    eComments.push({
                        time: process.element_comments[indexP].update_at,
                        admin_id: process.element_comments[indexP].admin_id,
                        content: process.element_comments[indexP].comment,
                        employee_id: process.element_comments[indexP].employee_id,
                        employee_name: process.element_comments[indexP].employee_name,
                    });
                }                
            }
            if(eComments.length){
                isSaved = true;
                comments.push({
                    id: process.elements[indexM].element,
                    comments: eComments,
                });
            }
            var element = {
                id: process.elements[indexM].element,
                type: process.elements[indexM].type,
                comments: eComments,
                isSaved: isSaved,
                name: process.elements[indexM].name,
                isSaveNote: true,
            }
            if(eNotes.note){
                element.note = eNotes.note;
            }else{
                element.note = "";
            }
            if(eAssigns.assign){
                element.assign = eAssigns.assign;
            }else{
                element.assign = "";
            }
            if(eFiles.file){
                element.file = eFiles.file;
            }else{
                element.file = "";
            }
            elements.push(element);

            issavenotes.push({
                id: process.elements[indexM].element, 
                isSaveNote: true,
            });

            names.push({
                id: process.elements[indexM].element, 
                name: process.elements[indexM].name,
            });
        }

        this.props.updateProcessInformation(detail);
        this.props.extractDataElementWhenEdit(elements, notes, comments, assigns, files, issavenotes, names);
        this.props.changeHeaderStatusToEdit();
    }


    componentDidMount() {
        this._isMounted = true;
        var self = this;
        var idProcess = this.props.match.params.id;
        var token = localStorage.getItem('token');
        axios.get(host + `/api/company/process/information/` + idProcess,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              if(self._isMounted){
                this.initStatusPopup();
                self.extractDataToComponent(res.data.process);
                self.setState({initDiagram: res.data.process.xml});
              }
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
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
                    <div className="container-fluid">
                        <div className="row">
                            <Header />
                        </div>
                        <div className="row">
                            <div className="col-md-9 full-page">
                                <Process init={this.state.initDiagram}/>
                            </div>
                            <div className="col-md-3">
                                <div className="button-details-right-open">
                                    <button onClick={(e) => this.closePopup(e)}>
                                        <i className="fas fa-align-justify"></i> Chi tiết
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
                            <div className="col-md-6">
                                <EditDetail />
                            </div>
                            <div className="col-md-3">

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
                                <Process init={this.state.initDiagram}/>
                                <div className="button-details-right-close">
                                    <button onClick={(e) => this.openPopUp(e)}>
                                        <i className="fas fa-align-justify"></i> Chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="space-area"></div>
                        <div className="row footer-view-process">  
                            <div className="col-md-6">
                                <EditDetail />
                            </div>
                            <div className="col-md-3">

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
        extractDataElementWhenEdit: (elements, notes, comments, assigns, files, issavenotes, names) => {
            dispatch(actions.extractDataElementWhenEdit(elements, notes, comments, assigns, files, issavenotes, names))
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
