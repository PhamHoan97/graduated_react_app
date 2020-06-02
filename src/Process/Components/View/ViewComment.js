import React, { Component } from 'react';
import '../../Css/Process.css';
import Button from 'react-bootstrap/Button';
import {isEmpty} from 'validator';
import {connect} from 'react-redux';
import host from '../../../Host/ServerDomain';
import axios from 'axios';
import * as actions from  '../../../Alert/Action/Index';

class Comment extends Component {
    _isMounted = false;
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

    getCurrentTime (){
        var date = new Date();
        var yyyy = date.getFullYear();
        var dd = date.getDate();
        var mm = (date.getMonth() + 1);
        if (dd < 10){
          dd = "0" + dd;
        }
        if (mm < 10){
          mm = "0" + mm;
        }
        var current = dd + "-" + mm + "-" + yyyy;
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (hours < 10){
          hours = "0" + hours;
        }
        if (minutes < 10){
          minutes = "0" + minutes;
        }
        if (seconds < 10){
          seconds = "0" + seconds;
        }
        return current + " " + hours + ":" + minutes + ":" + seconds;
    }

    saveCommentElement = (event) =>{
        event.preventDefault();
        var tokenData = localStorage.getItem('token');
        var data = {
            idProcess : this.state.idProcess,
            comment: this.state.content,
            element_name: this.state.currentElement.id,
            time: this.getCurrentTime(),
            token: tokenData,
            typeElement: this.state.currentElement.type,
        }
        axios.post(host + `/api/employee/add/comment`,data,
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
            var newCurrentElement = this.state.currentElement;
            var comments = newCurrentElement.comments;
            if(comments){
                comments.push({
                    time: res.data.comment.update_at, 
                    content: res.data.comment.comment,
                    employee_id: res.data.comment.employee_id,
                    id:  res.data.comment.id,
                    employee_name: this.state.currentEmployee.name,
                })
            }else{
                comments = [];
                comments.push({
                    time: res.data.comment.update_at, 
                    content: res.data.comment.comment,
                    employee_id: res.data.comment.employee_id,
                    id:  res.data.comment.id,  
                    employee_name: this.state.employee.name,
                });
            }
            newCurrentElement.comments = comments;
            this.setState({currentElement: newCurrentElement, reload: true});
          }
        }).catch(function (error) {
          alert(error);
        });
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

    componentDidMount() {
        this._isMounted = true;
        var self = this;
        var tokenData = localStorage.getItem('token');
        axios.get(host + `/api/employee/information/` + tokenData,
        {
            headers: { 'Authorization': 'Bearer ' + tokenData}
        }).then(res => {
            if(res.data.error != null){
                console.log(res.data.message);
            }else{
                if(self._isMounted){
                    self.setState({currentEmployee: res.data.employee});
                }
            }
        }).catch(function (error) {
          alert(error);
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    renderDeleteButton = (value) => {
        if(!value.employee_id){
            return (<div></div>);
        }else if(value.employee_id === this.state.currentEmployee.id){
            return (                                  
                <button type="button" title="Delete" onClick={this.deleteComment.bind(this,value)}>
                    <i className="far fa-trash-alt"></i>
                </button>
            ); 
        }else{
            return (<div></div>);
        }
    }

    renderNameComment = (value) => {
        if(!value.employee_id){
            return (<div className="name-and-time">Admin</div>);
        }else{
            return (<div className="name-and-time">{value.employee_name}</div>);
        }
    }

    deleteComment = (comment) => {
        var tokenData = localStorage.getItem('token');
        var data = {
            idComment: comment.id,
        }
        axios.post(host + `/api/employee/delete/comment`, data,
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
            var newCurrentElement = this.state.currentElement;
            var oldComments = newCurrentElement.comments;
            var newComments = [];
            for (let index = 0; index < oldComments.length; index++) {
                if(oldComments[index].id !== comment.id){
                    newComments.push(oldComments[index]);
                }                
            }
            newCurrentElement.comments = newComments;
            this.setState({currentElement: newCurrentElement, reload: true});
          }
        }).catch(function (error) {
          alert(error);
        });
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
                                        {this.renderDeleteButton(value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
