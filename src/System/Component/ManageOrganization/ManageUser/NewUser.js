import React, { Component } from 'react'
import Alert from "@material-ui/lab/Alert";
export default class NewUser extends Component {
    constructor(props) {
        super(props);
            this.state = {
            isDisplayAlert: false,
        };
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
                        <label htmlFor="field">Role</label>
                        <input type="text" className="form-control" id="position" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="field">Phone</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlSelect1">Department</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>IT</option>
                            <option>IT</option>
                            <option>Sales</option>
                        </select>
                    </div>
                    <div className="form-group text-left">
                        <button
                        type="submit"
                        className="btn btn-primary mb-2 mr-2"
                        onClick={() => this.saveNewUser()}
                        >
                        Save
                        </button>
                        <button
                        type="submit"
                        className="btn btn-primary mb-2 mr-2"
                        onClick={() => this.hideNewUser()}
                        >
                        Cancel
                        </button>
                    </div>
                    {this.displayAlert()}
                </>
            );
        } else {
            return <div></div>;
        }
    }

    displayAlert = () => {
        if (this.state.isDisplayAlert) {
            return <Alert severity="success">New success !!!</Alert>;
        } else {
            return <div></div>;
        }
    };

    saveNewUser = () => {
        console.log("Edit");
        this.setState({
            isDisplayAlert: true,
        });
    };

    hideNewUser = () => {
        this.props.hideNewUser();
        this.setState({
            isDisplayAlert: false,
        });
    };
}
