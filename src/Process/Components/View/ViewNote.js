import React, { Component } from 'react';
import '../../Css/Process.css';
import {connect} from 'react-redux';

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

    render() {
        return (
            <section className="note-element">
                <h4 className="note-title"> {this.convertTitleOfElement(this.state.currentElement)}</h4>
                <div className="note-content form-group">
                    <form>
                        <div className="note-content-textarea" style={{textAlign: "initial"}}>
                            {this.state.currentElement.note}
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
