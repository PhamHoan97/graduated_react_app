import React, { Component } from 'react';
import '../../Css/Process.css';
import {connect} from 'react-redux';
import host from '../../../Host/ServerDomain';

class ViewNote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentElement: "",
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
            default:
                result =  "Mới";
                break;
        }
        return result;
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if(nextProps.currentElement.note){
            this.setState({
                currentElement: nextProps.currentElement,
            });
        }else{
            this.setState({
                currentElement: nextProps.currentElement,
            });
        }
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
                    <p className="form-control">{element.name}</p>
                </div>
                </>
            )
        }else{
           return (<></>);
        }
    }

    renderEmployee = (employees) =>{
        var content = '';
        if(employees){
       for (let index = 0; index < employees.length; index++) {
            content += '<p className="form-control">' + employees[index].label + '</p>';
        }
        }
        return content;
    } 

    render() {
        return (
            <section className="note-element">
                <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)} <i className="fas fa-tasks"></i></h4>
                <div className="note-content form-group">
                    <form>
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
                        <div className="note-content-textarea" style={{textAlign: "initial"}}>
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
                    </form>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentElement: state.processReducers.elementReducers.current,
    }
}

export default connect(mapStateToProps)(ViewNote);
