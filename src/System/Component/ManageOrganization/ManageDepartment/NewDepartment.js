import React, { Component } from "react";
import Alert from '@material-ui/lab/Alert';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';
import { isEmpty } from 'validator';
import axios from "axios";
import * as host from '../../../Constants/Url'

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">This field is required</small>;
    }
}
export default class NewDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert : false,
            newNameDepartment :'',
            newRoleDepartment:'',
            newDescriptionDepartment:''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }
    onSubmit = event => {
        event.preventDefault();
        this.form.validateAll();
    }

    render() {
        if (this.props.isDisplayNewForm) {
            return (
                <>
                    <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input type="text"
                            className="form-control"
                            name="newNameDepartment"
                            onChange={(event)=>this.handleChange(event)
                            }
                            validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <Input type="text" className="form-control"
                            name="newRoleDepartment"
                            onChange={(event)=>this.handleChange(event)}
                            validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Textarea className="form-control"
                            name="newDescriptionDepartment"
                            onChange={(event)=>this.handleChange(event)}
                            validations={[required]}
                            id="exampleFormControlTextarea1" rows="3"/>
                        </div>
                        <div className="form-group text-left">
                            <CheckButton type="submit" className="btn btn-primary mb-2 mr-2" onClick={() => this.saveNewDepartment()} ref={c => { this.checkBtn = c }}>
                            Save
                            </CheckButton>
                            <button
                            type="submit"
                            className="btn btn-primary mb-2 mr-2"
                            onClick={() => this.hideNewDepartment()}
                            >
                            Cancel
                            </button>
                        </div>
                    </Form>
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
        var self = this;
        var idCompany = localStorage.getItem('company_id');
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/system/organization/department/new', {
            newNameDepartment: this.state.newNameDepartment,
            newRoleDepartment: this.state.newRoleDepartment,
            newDescriptionDepartment:this.state.newDescriptionDepartment,
            idCompany:idCompany
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                self.setState({
                    isDisplayAlert : true
                })
                setTimeout(() => {
                    self.setState({isDisplayAlert : false});
                    self.props.hideNewDepartment();
                }, 2000);
                self.props.rerenderParentCallback();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    hideNewDepartment = () => {
        this.props.hideNewDepartment();
        this.setState({
            isDisplayAlert : false
        })
    };
}
