import React, { Component } from 'react';
import '../../Css/Process.css';
import Button from 'react-bootstrap/Button';
import {isEmpty} from 'validator';
import * as actions from '../../Actions/Index';
import {connect} from 'react-redux';


class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentElement: "",
            content: "",
            reload: false,
        }
    }

    allowComment = function() {
        if((typeof this.state.currentElement.id === "undefined")){
            return true;
        }else if(isEmpty(this.state.content)){
            return true;
        }
        return false;
    }

    changeComment = event => {
        this.setState({content:event.target.value});
    } 

    saveCommentElement = (event) =>{
        event.preventDefault();
        this.props.saveCommentForElement(this.state.content);
        this.setState({reload:true});
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        this.setState({
            currentElement: nextProps.currentElement,
            content: ""
        });
        document.getElementById("comment-element").value = "";
    }

    deleteComment = (comment) => {
        this.props.deleteCommentOfElement(comment);
        this.setState({reload:true});
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
                                        <div className="name-and-time">Admin</div>
                                        <div className="content-message">{value.content}</div>
                                    </div>
                                    <div className="action-comment btn-group"> 
                                        <button type="button" title="Delete" onClick={this.deleteComment.bind(this,value)}>
                                            <i className="far fa-trash-alt"></i>
                                        </button>
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
                    <h4 className="comment-title"> B??nh lu???n <i className="fas fa-comment"></i></h4>
                    <div className="comment-content form-group">
                        <div className="conversation-content-has-comment">
                            {this.renderListComment(this.state.currentElement.comments)}
                        </div>
    
                        <div className="form-send-comment-has-comment">
                            <form>
                                <div className="form-comment-area">
                                    <div className="form-group input-comment">
                                        <input type="text" onChange={this.changeComment} className="form-control" id="comment-element" placeholder="Tr??? l???i..." />
                                    </div>
                                    <div className="button-send-comment">
                                        <Button onClick={(e) => this.saveCommentElement(e)} disabled={this.allowComment()} title="Comment">B??nh lu???n</Button>
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
                    <h4 className="comment-title"> B??nh lu???n <i className="fas fa-comment"></i></h4>
                    <div className="comment-content form-group">
                        <div className="conversation-content">
                            <div className="no-conversation">
                                <i className="fas fa-comments fa-3x"></i>
                                <div className="no-conversation-message">
                                    <div className="title-add-comments">Th??m m???i</div>
                                    <div className="content-add-comments">B???n c?? th??? th??m b??nh lu???n cho t???ng ph???n t??? tr??n quy tr??nh.</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-send-comment">
                            <form>
                                <div className="form-comment-area">
                                    <div className="form-group input-comment">
                                        <input type="text" onChange={this.changeComment} className="form-control" id="comment-element" placeholder="Tr??? l???i..." />
                                    </div>
                                    <div className="button-send-comment">
                                        <Button onClick={(e) => this.saveCommentElement(e)} disabled={this.allowComment()} title="Comment">B??nh lu???n</Button>
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
        saveCommentForElement: (comment) => {
            dispatch(actions.saveCommentForElement(comment));
        },
        deleteCommentOfElement: (comment) => {
            dispatch(actions.deleteCommentOfElemment(comment));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comment);
