import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';
import axios from "axios";
import * as host from '../../../Constants/Url'
import { isEmpty } from 'validator';
const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">This field is required</small>;
    }
}
export default class EditDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert : false,
            editNameDepartment:'',
            editRoleDepartment:'',
            editDescriptionDepartment:''
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

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        if(this.props.detailDepartment.length !== 0 ){
            this.setState({
                editNameDepartment:this.props.detailDepartment.name,
                editRoleDepartment:this.props.detailDepartment.role,
                editDescriptionDepartment:this.props.detailDepartment.description
            })
        }
    }


    render() {
        if(this.props.isDisplayEditForm && this.props.detailDepartment !== null){
            return (
                <>
                    <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input type="text"
                            className="form-control"
                            name="editNameDepartment"
                            validations={[required]}
                            value={this.state.editNameDepartment}
                            onChange={(event)=>this.handleChange(event)
                            }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <Input type="text" className="form-control"
                            name="editRoleDepartment"
                            validations={[required]}
                            value={this.state.editRoleDepartment}
                            onChange={(event)=>this.handleChange(event)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Textarea className="form-control"
                            name="editDescriptionDepartment"
                            validations={[required]}
                            value={this.state.editDescriptionDepartment}
                            onChange={(event)=>this.handleChange(event)}
                            id="exampleFormControlTextarea1" rows="3"/>
                        </div>
                        <div className="form-group text-left">
                            <CheckButton type="submit" className="btn btn-primary mb-2 mr-2" onClick={() => this.saveEditDepartment()} ref={c => { this.checkBtn = c }}>
                            Save
                            </CheckButton>
                            <button
                            type="submit"
                            className="btn btn-primary mb-2 mr-2"
                            onClick={() => this.hideEditDepartment()}
                            >
                            Cancel
                            </button>
                        </div>
                    </Form>
                    {
                        this.displayAlert()
                    }
                </>
             )
        }else{
            return (
                <div></div>
            )
        }
    }

    displayAlert = () =>{
        if(this.state.isDisplayAlert){
            return <Alert severity="success">Edit success !!!</Alert>;
        }else{
            return <div></div>
        }
    }

    saveEditDepartment = () =>{
        var self = this;
        var token = localStorage.getItem('token');
        axios.patch(host.URL_BACKEND+'/api/system/organization/department/update', {
            editNameDepartment: this.state.editNameDepartment,
            editRoleDepartment: this.state.editRoleDepartment,
            editDescriptionDepartment:this.state.editDescriptionDepartment,
            idDepartment:this.props.detailDepartment.id
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
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        // update value edited department and display to form 
        axios.get(host.URL_BACKEND+'/api/system/organization/department/detail/'+this.props.detailDepartment.id,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                var detailDepartment =  JSON.parse(JSON.stringify(response.data.department));
                self.props.showDetailDepartment(detailDepartment);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        self.props.rerenderParentCallback();
    }

    hideEditDepartment = () => {
        this.props.hideEditDepartment();
        this.setState({
            isDisplayAlert : false
        })
    }
}
