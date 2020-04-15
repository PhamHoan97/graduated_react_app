import React, { Component } from 'react'
import axios from "axios";
import {connect} from 'react-redux';


class AdminAcountTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            admins: '',
            currentCompany: '',
            activePage: 1,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.idCompany);
        if(this.props.idCompany && this.props.idCompany !== this.state.currentCompany){
            var token = localStorage.getItem('token');
            axios.get(`http://127.0.0.1:8000/api/system/company/`+ this.props.idCompany + `/admin/accounts`,
            {
                headers: { 'Authorization': 'Bearer ' + token}
            }).then(res => {
              if(res.data.error != null){
                  console.log(res.data.message);
              }else{
                console.log(res.data);
                this.setState({admins:res.data.admins, currentCompany: this.props.idCompany});
              }
            }).catch(function (error) {
              alert(error);
            })
        }
    }

    renderAcountTableRow = (pageNumber) =>{
        var admins = this.state.admins;
        var locationStart = pageNumber * 8 - 8;
        return Object.values(admins).map((value, key) => {
            if ((key >= locationStart)&&(key<= (locationStart + 7))){
                return (
                <React.Fragment key={key}>
                        <tr className="tr-shadow">
                            <td>
                                <label className="au-checkbox">
                                <input type="checkbox" />
                                <span className="au-checkmark" />
                                </label>
                            </td>
                            <td>{value.username}</td>
                            <td className="desc">Sent</td>
                            <td className="desc">{value.updated_at}</td>
                            <td className="desc">
                                <button type="button" className="btn btn-danger">Resend</button>
                            </td>
                        </tr>
                        <tr className="spacer" />
                </React.Fragment>
                )
            }else{
                return <tr key={key}></tr>;
            }
        })
    }

    render() {
        return (
        <div className="col col-md-12">
            <div className="table-responsive table-responsive-data2">
                <table className="table table-data2">
                    <thead>
                        <tr>
                            <th/>
                            <th>Username</th>
                            <th>Send</th>
                            <th>Updated At</th>
                            <th>Action</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAcountTableRow(this.state.activePage)}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        idCompany: state.systemReducers.manageSystemReducer.registrationReducer.idCompany
    }
}

export default connect(mapStateToProps)(AdminAcountTable)
