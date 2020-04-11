import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
export default class EditDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayAlert : false
        }
    }
    render() {
        console.log(this.props.idEditDepartment);
        if(this.props.isDisplayEditForm){
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
                         <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={()=>this.saveEditDepartment()}>
                         Save
                         </button>
                         <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={()=>this.hideEditDepartment()}>
                         Cancel
                         </button>
                    </div>
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
        console.log('Edit');
        this.setState({
            isDisplayAlert : true
        })
    }

    hideEditDepartment = () => {
        this.props.hideEditDepartment();
        this.setState({
            isDisplayAlert : false
        })
    }
}
