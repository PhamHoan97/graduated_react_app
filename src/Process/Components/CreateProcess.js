import React, { Component } from 'react'
import Process from './Process';
import Note from './Note';
import Comment from './Comment';
import Header from './Header';
import '../Css/Process.css';


class CreateProcess extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <Header />
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <Process />
                    </div>
                    <div className="right-column-popup">
                        <Note />
                        <Comment />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CreateProcess;
