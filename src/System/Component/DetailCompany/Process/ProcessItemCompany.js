import React, { Component } from "react";
import  { Redirect } from 'react-router-dom';

class ProcessItemCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRedirectToViewProcess: false,
            idProcess: '',
        };
    }

    redirectViewProcess = (e, id) => {
        e.preventDefault();
        this.setState({isRedirectToViewProcess:true, idProcess: id});
    }

    convertTypeOfProcesses(type){
        return type === 1 ? "Cá nhân" : "Chức vụ";
    }

    render() {
        if(this.state.isRedirectToViewProcess){
            return <Redirect to={'/view/process/' + this.state.idProcess} />
        }
        return (
            <tr>
                <td>
                <span className="table-data__info">
                    <h6> {this.props.name} </h6>
                </span>
                </td>
                <td>
                <div className="table-data__info">
                    <h6>{this.props.deadline}</h6>
                </div>
                </td>
                <td>
                <span className="date">{this.props.date}</span>
                </td>
                <td>
                <span className="table-data__info">
                    <h6> {this.convertTypeOfProcesses(this.props.type)} </h6>
                </span>
                </td>
                <td>
                <span className="role admin">
                    <a href="##" className="btn--detail__process" onClick={(e) => this.redirectViewProcess(e, this.props.id)} >
                        Chi tiết
                    </a>
                </span>
                </td>
            </tr>
        );
    }
}

export default ProcessItemCompany;
