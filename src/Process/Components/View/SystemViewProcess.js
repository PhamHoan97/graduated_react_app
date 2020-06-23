import React, { Component } from 'react'
import View from './View';
import ViewNote from './ViewNote';
import SystemViewComment from './SystemViewComment';
import HeaderSystem from '../Create/HeaderSystem';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import * as actions from '../../Actions/Index';
import Detail from './Detail';
import axios from 'axios';
import {updateProcessInformation} from '../../../Organization/ManageProcess/Actions/Index';
import host from '../../../Host/ServerDomain';
import ViewTemplates from './ViewTemplates';

class SystemViewProcess extends Component {
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
        }else if(type === 5){
            var assignEmployees = [];
            var assignRoles = [];
            var assignDepartments = [];
            for (let index = 0; index < employees.length; index++) {
                assignEmployees.push({
                    'value': employees[index].id, 
                    'label': employees[index].name, 
                });
            }
            for (let index = 0; index < roles.length; index++) {
                assignRoles.push({
                    'value': roles[index].id, 
                    'label': roles[index].name, 
                });
            }
            for (let index = 0; index < departments.length; index++) {
                assignDepartments.push({
                    'value': departments[index].id, 
                    'label': departments[index].name
                });
            }
            assign = {"employees" : assignEmployees, "roles" : assignRoles, "departments" : assignDepartments};
        }
        return assign;
    }

    extractDataToComponent(process){
        var detail = {
            id:process.id,
            code:process.code,
            name:process.name,
            description: process.description,
            type: process.type,
            time: process.update_at,
            assign: this.convertToAssignInDataStore(process.type, process.employeesDetail, process.rolesDetail, process.departments),
            deadline: process.deadline,
            document: process.document,
            collabration: process.collabration,
        }

        var notes = [];
        var comments = [];
        var elements = [];
        var assigns = [];
        var files = [];
        var names = [];
        var issavenotes = [];
        var templates = process.templates;
        for (var indexM = 0; indexM < process.elements.length; indexM++) {
            var eNotes = {};
            var eComments = [];
            var eAssigns = [];
            var eFiles = [];
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
                        file: JSON.parse(process.element_notes[indexN].document),
                    };
                    files.push({
                        id:process.elements[indexM].element, 
                        file: JSON.parse(process.element_notes[indexN].document),
                    });
                }                
            }
            for (var indexP = 0; indexP < process.element_comments.length; indexP++) {
                if(process.elements[indexM].id === process.element_comments[indexP].element_id){
                    eComments.push({
                        time: process.element_comments[indexP].update_at,
                        admin_id: process.element_comments[indexP].admin_id,
                        content: process.element_comments[indexP].comment,
                        id: process.element_comments[indexP].id,
                        employee_id: process.element_comments[indexP].employee_id,
                        employee_name: process.element_comments[indexP].employee_name,
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
                name: process.elements[indexM].name,
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

            names.push({
                id: process.elements[indexM].element, 
                name: process.elements[indexM].name,
            });
        }

        this.props.updateFileTemplatesInEditProcess(templates);
        this.props.updateProcessInformation(detail);
        this.props.extractDataElementWhenEdit(elements, notes, comments, assigns, files, issavenotes, names);
    }

    componentDidMount() {
        var idProcess = this.props.match.params.id;
        var token = localStorage.getItem('token');
        axios.get(host + `/api/company/process/information/` + idProcess,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
              this.initStatusPopup();
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
                    <div className="container-fluid">
                        <div className="row">
                            <HeaderSystem />
                        </div>
                        <div className="row">
                            <div className="col-md-9 full-page">
                                <View init={this.state.initDiagram}/>
                            </div>
                            <div className="button-details-right-open">
                                <button onClick={(e) => this.closePopup(e)}>
                                    <i className="fas fa-align-justify"></i> Chi tiết
                                </button>
                            </div>
                            <div className="right-column-popup">
                                <ViewNote />
                                <SystemViewComment />
                            </div>
                        </div>
                        <div className="space-area"></div>
                        <div className="row footer-view-process">  
                            <div className="col-md-6">
                                <Detail />
                            </div>
                            <div className="col-md-4">
                                <ViewTemplates />
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
                            <HeaderSystem />
                        </div>
                        <div className="row">
                            <div className="col-md-12 full-page">
                                <View init={this.state.initDiagram} />
                            </div>
                            <div className="button-details-right-close">
                                <button onClick={(e) => this.openPopUp(e)}>
                                    <i className="fas fa-align-justify"></i> Chi tiết
                                </button>
                            </div>
                        </div>
                        <div className="space-area"></div>
                        <div className="row footer-view-process">  
                            <div className="col-md-6">
                                <Detail />
                            </div>
                            <div className="col-md-4">
                                <ViewTemplates />
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
        extractDataElementWhenEdit: (elements, notes, comments) => {
            dispatch(actions.extractDataElementWhenEdit(elements, notes, comments))
        },
        updateProcessInformation: (information) => {
            dispatch(updateProcessInformation(information));
        },
        updateFileTemplatesInEditProcess: (templates) => {
            dispatch(actions.updateFileTemplatesInEditProcess(templates));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemViewProcess);
