import React, { Component } from "react";
import host from '../../../Host/ServerDomain'; 
import axios from 'axios';
import {connect} from "react-redux";
import {showMessageAlert} from "../../../Alert/Action/Index";
import avatarMale from "../Image/avatar_employee1.png";
import avatarFeMale from "../Image/avatar_employee2.png";
class AccountItem extends Component {
    deleteAccount = (e,idAccount) =>{
        e.preventDefault();
        var self =  this;
        var token = localStorage.getItem('token');
        axios.post(host + '/api/company/account/delete', {
            idDeleteAccount:idAccount,
        },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if (response.data.error != null) {
                self.props.showAlert({
                    message:response.data.error,
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    title:'Thất bại',
                    severity:'error'
                  });
                console.log(response.data.error);
            }else{
                self.props.rerenderParentCallback();
                self.props.showAlert({
                    message:response.data.message,
                    anchorOrigin:{
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    title:'Thành công',
                    severity:'success'
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
        axios.post(host +'/api/company/account/employee/send',
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
                    horizontal: 'right'
                },
                title:'Thành công',
                severity:'success'
              })
        }
        }).catch(function (error) {
            alert(error);
        })

    }
    render() {
        return (
            <tr className="row100 body">
                <td style={{ width: "5%" }} className="cell-breakWord text-center ">
                {this.props.stt}
                </td>
                <td style={{ width: "15%" }} className="cell-breakWord text-left">
                {this.props.avatar !== null &&
                    this.props.avatar !== "" ? (
                    <img
                        alt="avatar employee 1"
                        src={
                        host +
                        this.props.avatar
                        }
                        style={{width:"50px",height:"50px",borderRadius:"50%"}}
                        className="img-fluid"
                    />
                    ) : (this.props.gender) ===
                    'Nam' ? (
                    <img
                        alt="avataremployee 1"
                        src={avatarMale}
                        style={{width:"50px",height:"50px",borderRadius:"50%"}}
                        className="img-fluid"
                    />
                    ) : (
                    <img
                        alt="avatar employee 1"
                        src={avatarFeMale}
                        style={{width:"50px",height:"50px",borderRadius:"50%"}}
                        className="img-fluid"
                    />
                    )}
                </td>
                <td style={{ width: "20%" }} className="cell-breakWord text-left">{this.props.name}</td>
                <td style={{ width: "20%" }} className="cell-breakWord text-left">{this.props.email}</td>
                <td style={{ width: "20%" }} className="cell-breakWord text-left">{this.props.username}</td>
                <td style={{ width: "20%" }} className="cell-breakWord text-left">
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

