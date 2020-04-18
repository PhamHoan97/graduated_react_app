import React, { Component } from 'react';
import '../Css/Process.css';

class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <section className="comment-element">
                <h4 className="comment-title"> Comments</h4>
                <div className="comment-content form-group">
                    <div className="conversation-content">
                        <div className="no-conversation">
                            <i className="fas fa-comments fa-3x"></i>
                            <div className="no-conversation-message">
                                <div className="title-add-comments">Add comments</div>
                                <div className="content-add-comments">You can add comments about diagrams or specific BPMN elements.</div>
                            </div>
                        </div>

                        <div className="conversation">
                            <h6 className="date-comment">Today</h6>
                            <article className="article-area">
                                <div><i className="far fa-user-circle fa-2x"></i></div>
                                <div className="record-message">
                                    <div className= "content">
                                        <div className="name-and-time">You</div>
                                        <div className="content-message">Haha.</div>
                                    </div>
                                    <div className="action-comment btn-group"> 
                                        <button type="button" title="Delete">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    <div className="form-send-comment">
                        <form>
                            <div className="form-comment-area">
                                <div className="form-group input-comment">
                                    <input type="text" className="form-control" id="comment-element" placeholder="Reply..." />
                                </div>
                                <div className="button-send-comment">
                                    <button title="Save"><i className="far fa-paper-plane fa-2x"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default Comment
