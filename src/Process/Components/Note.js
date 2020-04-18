import React, { Component } from 'react';
import '../Css/Process.css';

class Note extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <section className="note-element">
                <h4 className="note-title"> New Diagram</h4>
                <div className="note-content form-group">
                    <textarea className="note-content-textarea form-control" rows="14" id="note"></textarea>
                </div>
            </section>
        )
    }
}

export default Note
