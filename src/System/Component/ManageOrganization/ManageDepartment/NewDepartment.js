import React, { Component } from "react";
import Alert from '@material-ui/lab/Alert';
export default class NewDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert : false
        }
    }
    render() {
        if (this.props.isDisplayNewForm) {
            return (
                <>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field">Field</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group text-left">
                        <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={() => this.saveNewDepartment()}>
                        Save
                        </button>
                        <button
                        type="submit"
                        className="btn btn-primary mb-2 mr-2"
                        onClick={() => this.hideNewDepartment()}
                        >
                        Cancel
                        </button>
                    </div>
                    {
                        this.displayAlert()
                    }
                </>
            );
        } else {
            return <div></div>;
        }
    }

    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">Save success !!!</Alert>;
        }else{
            return <div></div>
        }
    }

    saveNewDepartment = () => {
        console.log('Save DataBase');
        this.setState({
            isDisplayAlert : true
        })
    };

    hideNewDepartment = () => {
        this.props.hideNewDepartment();
        this.setState({
            isDisplayAlert : false
        })
    };
}
