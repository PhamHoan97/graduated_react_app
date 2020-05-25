import React, { Component } from "react";
import * as host from '../../Url'
import axios from 'axios';
import {connect} from "react-redux";
import {showMessageAlert} from "../../../Alert/Action/Index"
class AccountItem extends Component {
    deleteAccount = (e,idAccount) =>{
        e.preventDefault();
        var self =  this;
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/company/account/delete', {
            idDeleteAccount:idAccount,
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                console.log(response.data.error);
            }else{
                self.props.rerenderParentCallback();
                self.props.showAlert({
                    message:'Xóa tài khoản thành công',
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'center'
                    },
                    title:'Success',
                    severity:'warning'
                  })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    sendEmailAccount(e,idEmployeeAccount,idAccountEmployee){
        e.preventDefault();
        var self = this;
        var token = localStorage.getItem('token');
        axios.post(host.URL_BACKEND+'/api/company/account/employee/send',
        {
            idEmployeeAccount: idEmployeeAccount,
            idAccountEmployee:idAccountEmployee,
            tokenData:token
        },
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
        if(res.data.error != null){
            console.log(res.data.message);
        }else{
            self.props.showAlert({
                message:'Gửi mail tài khoản thành công ',
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'center'
                },
                title:'Success',
                severity:'success'
              })
            console.log(res.data);
        }
        }).catch(function (error) {
            alert(error);
        })

    }
    render() {
        return (
            <tr className="row100 body">
                <td className="cell100 column1">{this.props.email}</td>
                <td className="cell100 column2">{this.props.username}</td>
                <td className="cell100 column3">{this.props.name}</td>
                <td className="cell100 column4">{this.props.department_name}</td>
                <td className="cell100 column5">
                <a
                    className="btn--trash__department mr-5"
                    href="###"
                    onClick={(e, idEmployee, idAccount) =>
                        this.sendEmailAccount(e,this.props.idEmployee,this.props.idAccount)
                    }
                >
                    <i className="fa fa-envelope-o fa-1x" />
                </a>
                <a
                    className="btn--trash__department"
                    href="###"
                    onClick={(e, id) => this.deleteAccount(e, this.props.idAccount)}
                >
                    <i className="fa fa-trash fa-1x" />
                </a>
                </td>
            </tr>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      showAlert: (properties) => {
        dispatch(showMessageAlert(properties))
      }
    }
  }
export default connect(null, mapDispatchToProps)(AccountItem);

