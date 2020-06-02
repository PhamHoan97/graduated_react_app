import React, { Component } from 'react';
import '../../Css/Process.css';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import * as actions from  '../../../Alert/Action/Index';

class SystemViewComment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentElement: "",
            content: "",
            reload: false,
            idProcess: "",
            currentEmployee: '',
        }
    }

    allowComment = function() {
        return true;
    }

    changeComment = event => {
        this.setState({content:event.target.value});
    } 

    UNSAFE_componentWillReceiveProps (nextProps) {
        if(nextProps.idProcess){
            this.setState({idProcess: nextProps.idProcess});
        }
        if(nextProps.currentElement){
            this.setState({
                currentElement: nextProps.currentElement,
                content: "", 
            });
        }
        document.getElementById("comment-element").value = "";
    }

    renderNameComment = (value) => {
        if(!value.employee_id){
            return (<div className="name-and-time">Admin</div>);
        }else{
            return (<div className="name-and-time">{value.employee_name}</div>);
        }
    }


    renderListComment = (comments) => {
        return Object.values(comments).map((value, key) => {
            return(
                <React.Fragment key={key}>
                    <div className="conversation">
                            <h6 className="date-comment">{value.time}</h6>
                            <article className="article-area">
                                <div><i className="far fa-user-circle fa-2x"></i></div>
                                <div className="record-message">
                                    <div className= "content">
                                        {this.renderNameComment(value)}
                                        <div className="content-message">{value.content}</div>
                                    </div>
                                    <div className="action-comment btn-group"> 

                                    </div>
                                </div>
                            </article>
                        </div>
                </React.Fragment>
            );
        })
    }

    render() {
        if(Array.isArray(this.state.currentElement.comments) && this.state.currentElement.comments.length){
            return (
                <section className="comment-element">
                    <h4 className="comment-title"> Bình luận</h4>
                    <div className="comment-content form-group">
                        <div className="conversation-content-has-comment">
                            {this.renderListComment(this.state.currentElement.comments)}
                        </div>
    
                        <div className="form-send-comment-has-comment">
                            <form>
                                <div className="form-comment-area">
                                    <div className="form-group input-comment">
                                        <input type="text" onChange={this.changeComment} className="form-control" id="comment-element" placeholder="Trả lời..." />
                                    </div>
                                    <div className="button-send-comment">
                                        <Button onClick={(e) => this.saveCommentElement(e)} disabled={this.allowComment()} title="Comment">Bình luận</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )

        }else{
            return (
                <section className="comment-element">
                    <h4 className="comment-title"> Bình luận</h4>
                    <div className="comment-content form-group">
                        <div className="conversation-content">
                            <div className="no-conversation">
                                <i className="fas fa-comments fa-3x"></i>
                                <div className="no-conversation-message">
                                    <div className="title-add-comments"> Thêm mới</div>
                                    <div className="content-add-comments">Bạn có thể thêm bình luận cho từng phần tử trên quy trình.</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-send-comment">
                            <form>
                                <div className="form-comment-area">
                                    <div className="form-group input-comment">
                                        <input type="text" onChange={this.changeComment} className="form-control" id="comment-element" placeholder="Trả lời..." />
                                    </div>
                                    <div className="button-send-comment">
                                        <Button onClick={(e) => this.saveCommentElement(e)} disabled={this.allowComment()} title="Comment">Bình luận</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentElement: state.processReducers.elementReducers.current,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showAlert: (properties) => {
            dispatch(actions.showMessageAlert(properties))
          }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemViewComment);
