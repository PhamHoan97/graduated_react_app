import React, { Component } from 'react';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button';
import {isEmpty} from 'validator';
import * as actions from '../../Actions/Index';
import Form from 'react-bootstrap/Form';
import SelectEmployeeOfProcessType from './SelectEmployeeOfProcessType';
import * as actionAlerts from '../../../Alert/Action/Index';
import axios from 'axios';
import host from '../../../Host/ServerDomain';

class Note extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentElement: "",
            note: "",
            savedNote: false,
            fileElement: '',
            assignElement: '',
            nameFileElement: '',
        }
    }

    convertTitleOfElement(element){
        var result;
        switch (element.type) {
            case "bpmn:StartEvent":
                result =  "Bắt đầu";
                break;
            case "bpmn:IntermediateThrowEvent":
                result =  "Sự kiện trung gian";
                break;
            case "bpmn:EndEvent":
                result =  "Kết thúc";
                break;
            case "bpmn:ExclusiveGateway":
                result =  "Rẽ nhánh";
                break;
            case "bpmn:Task":
                result =  "Công việc";
                break;  
            case "bpmn:SubProcess":
                result =  "Quy trình con";
                break;  
            case "bpmn:DataObjectReference":
                result =  "Tham chiếu đối tượng dữ liệu";
                break;  
            case "bpmn:DataStoreReference":
                result =  "Tham chiếu kho dữ liệu";
                break;   
            case "bpmn:Participant":
                result =  "Người tham gia";
                break; 
            case "bpmn:Collaboration":
                result =  "Hợp tác";
                break;  
            case "bpmn:SequenceFlow":
                result =  "Chuyển giao";
                break;                       
            default:
                result =  "Mới";
                break;
        }
        return result;
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        // trường hợp đã save note
        if(nextProps.currentElement.isSaveNote){
            this.setState({
                currentElement: nextProps.currentElement,
                assignElement: nextProps.assignElement,
                savedNote: true,
            });
        }else{
            // trường hợp đã có assign
            if(nextProps.assignElement){
                //cập nhật note
                if(nextProps.currentElement.id === this.state.currentElement.id){
                    this.setState({
                        assignElement: nextProps.assignElement,
                        currentElement: nextProps.currentElement,
                        savedNote:false,
                    });
                }else{
                    //chuyển element khác
                    this.props.updateDefaultAssignedEmployeeElement("reset");
                    this.setState({
                        currentElement: nextProps.currentElement,
                        savedNote:false,
                        note: "",
                        assignElement: "",
                        fileElement: "",
                        nameFileElement: "",
                    });  
                    if(document.getElementById("note-element")){
                        document.getElementById("note-element").value = "";
                    }
                    if(document.getElementById("file-name")){
                        document.getElementById("file-name").value = "";
                    }
                    if(document.getElementById("file-input")){
                        document.getElementById("file-input").value = "";
                    }
                }
            }else{
                //click sang element mới và không lựa chọn assign
                this.setState({
                    currentElement: nextProps.currentElement,
                    savedNote:false,
                    note: "",
                    fileElement: "",
                    nameFileElement: "",
                });
                if(document.getElementById("note-element")){
                    document.getElementById("note-element").value = "";
                }
                if(document.getElementById("file-name")){
                    document.getElementById("file-name").value = "";
                }
                if(document.getElementById("file-input")){
                    document.getElementById("file-input").value = "";
                }
            }
        }    
    }

    changeNoteContent = event => {
        this.setState({note:event.target.value});
    } 

    handleChangeFileName = event => {
        this.setState({nameFileElement : event.target.value});
    }

    allowSaveNote = function() {
        if((typeof this.state.currentElement.id === "undefined")){
            return true;
        }else if(isEmpty(this.state.note)){
            return true;
        }
        return false;
    }
    
    saveNoteForElement = (event) => {
        event.preventDefault();
        var file = {
            name : this.state.nameFileElement,
            url : this.state.fileElement
        };
        var assign = this.state.assignElement;
        var note = this.state.note;
        this.props.saveNoteForElement(note, assign, file);
        this.setState({savedNote:true, fileElement: ""});
    }
    
    updateNoteForElement = (event) => {
        event.preventDefault();
        this.props.updateDefaultAssignedEmployeeElement(this.state.assignElement);
        this.props.changeIsSaveNoteToFalse(this.state.currentElement);
        this.setState({savedNote:false, fileElement: this.state.currentElement.file.url});
    }

    deleteNoteForElement = (event) => {
        event.preventDefault();
        this.props.deleteNoteForElement();
        this.setState({savedNote:false});
    }

    handleChangeFile = event => {
        event.preventDefault();
        document.getElementById("save-note-button").disabled = true;
        var file = event.target.files[0];
        var tokenData = localStorage.getItem('token');
        let data = new FormData();
        data.append('token', tokenData);
        data.append('file',  file);

        axios.post(host + `/api/company/element/upload/document`,
        data,
        {
            headers: { 'Authorization': 'Bearer ' + tokenData}
        }).then(res => {
          if(res.data.error != null){
            this.props.showAlert({
              message: res.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thất bại',
              severity:'error'
            });
          }else{
            this.props.showAlert({
              message: res.data.message,
              anchorOrigin:{
                  vertical: 'top',
                  horizontal: 'right'
              },
              title:'Thành công',
              severity:'success'
            });
            this.setState({fileElement: res.data.url});
            document.getElementById("save-note-button").disabled = false;
          }
        }).catch(function (error) {
          alert(error);
        });
    }

    renderEmployee = (employees) =>{
        var content = '';
        for (let index = 0; index < employees.length; index++) {
            content += '<p className="form-control">' + employees[index].label + '</p>';
        }
        return content;
    } 

    renderLinkDownloadDocument(file) {
        if(file && file.url){
            return (
                <>
                    <span className="name-file-document">{file.name}: </span><a className="link-download-document" target="_blank"  rel="noopener noreferrer" href={host + '/' + file.url}> Tải tài liệu tại đây</a>
                </>
            );
        }else{
            return (<span className="form-control">Không có tài liệu</span>);
        }
    }

    renderName(element){
        if(element.type !== "bpmn:StartEvent" && element.type !== "bpmn:EndEvent"){
            return (
                <>
                <div className="row">
                    <label
                        htmlFor="note-element"
                        className="form-control-label-note"
                    >
                        Tên công việc
                    </label>
                </div>
                <div className="note-content-show-name">
                    <p className="form-control element-name">{element.name}</p>
                </div>
                </>
            )
        }else{
           return (<></>);
        }
    }

    renderOldFileName = () => {
        if(this.state.currentElement && this.state.currentElement.file){
            return this.state.currentElement.file.name;
        }else{
            return "";
        }
    } 

    render() {
        if(this.state.savedNote){
            return (
                <section className="note-element">
                    <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)} <i className="fas fa-tasks"></i></h4>
                    <div className="note-content form-group">
                        {this.renderName(this.state.currentElement)}
                        <div className="row">
                            <label
                                htmlFor="note-element"
                                className="form-control-label-note"
                            >
                                Giao cho
                            </label>
                        </div>
                        <div className="note-content-show" dangerouslySetInnerHTML={{__html: this.renderEmployee(this.state.currentElement.assign)}}>
                            
                        </div>
                        <div className="row">
                            <label
                                htmlFor="note-element"
                                className="form-control-label-note"
                            >
                                Nội dung
                            </label>
                        </div>
                        <div className="note-content-show-name">
                            <p className="form-control content-show">{this.state.currentElement.note}</p>
                        </div>
                        <div className="row">
                            <label
                                htmlFor="note-element"
                                className="form-control-label-note"
                            >
                               Tài liệu/Biểu mẫu
                            </label>
                        </div>
                        <div className="note-content-show-name">
                            <p> {this.renderLinkDownloadDocument(this.state.currentElement.file)}</p>
                        </div>
                        <Button onClick={(e) => this.deleteNoteForElement(e)} variant="danger" className="delete-note-button">Xóa ghi chú</Button>
                        <Button onClick={(e) => this.updateNoteForElement(e)} variant="primary" className="save-note-button">Cập nhật</Button>
                    </div>
                </section>
            )
        }else{
            return (
                <section className="note-element">
                    <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)} <i className="fas fa-tasks"></i></h4>
                    <div className="note-content form-group">
                        <form>
                            {this.renderName(this.state.currentElement)}
                            <div className="row">
                                <label
                                    htmlFor="file-input"
                                    className="form-control-label-note"
                                >
                                    Giao cho
                                </label>
                            </div>
                            <SelectEmployeeOfProcessType/>
                            <div className="row">
                                <label
                                    htmlFor="note-element"
                                    className="form-control-label-note"
                                >
                                    Nội dung
                                </label>
                            </div>
                            <textarea onChange={this.changeNoteContent} className="note-content-textarea form-control" rows="10" 
                                id="note-element" defaultValue={this.state.currentElement.note} placeholder="Ghi chú...">
                            </textarea>
                            <div className="row">
                                <label
                                    htmlFor="file-input"
                                    className="form-control-label-note"
                                >
                                    Tài liệu/Biểu mẫu
                                </label>
                            </div>
                            <Form.Control type="text" onChange={this.handleChangeFileName} defaultValue={this.renderOldFileName()}  id="file-name" name="file-name" placeholder="Tên biểu mẫu" />
                            <div className="row"></div>
                            <Form.File.Input id="file-input" style={{marginTop:"10px"}} onChange={this.handleChangeFile} name="file-input"/>
                            <Button id="save-note-button" onClick={(e) => this.saveNoteForElement(e)} disabled={this.allowSaveNote()} variant="primary" className="save-note-button">Lưu ghi chú</Button>
                        </form>
                    </div>
                </section>
            )
        }
        
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentElement: state.processReducers.elementReducers.current,
        assignElement: state.processReducers.assignReducers.assignElement,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveNoteForElement: (note, assign, file) => {
            dispatch(actions.saveNoteForElement(note, assign, file));
        },
        deleteNoteForElement: () => {
            dispatch(actions.deleteNoteForElement());
        },
        updateDefaultAssignedEmployeeElement: (assign) => {
            dispatch(actions.updateDefaultAssignedEmployeeElement(assign));
        },
        showAlert: (properties) => {
            dispatch(actionAlerts.showMessageAlert(properties))
        },
        changeIsSaveNoteToFalse: (element) => {
            dispatch(actions.changeIsSaveNoteToFalse(element));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
