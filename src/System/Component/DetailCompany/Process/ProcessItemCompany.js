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
        var result = '';
        switch (type) {
          case 1:
            result ="Cá nhân";
            break;
          case 2:
            result ="Chức vụ";
            break;
          case 3:
            result ="Phòng ban";
            break;
          case 4:
            result ="Công ty";
            break;
          case 5:
            result ="Kết hợp";
            break;
          default:
            break;
        }
        return result;
    }

    render() {
        if(this.state.isRedirectToViewProcess){
            return <Redirect to={'/system/view/process/' + this.state.idProcess} />
        }
        return (
            <tr>
                <td>
                    <span className="table-data__info">
                        <h6> {this.props.stt} </h6>
                    </span>
                </td>
                <td>
                <span className="table-data__info">
                    <h6> {this.props.code} </h6>
                </span>
                </td>
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
                {/* <td>
                <span className="date">{this.props.date}</span>
                </td> */}
                <td>
                <span className="table-data__info">
                    <h6> {this.convertTypeOfProcesses(this.props.type)} </h6>
                </span>
                </td>
                <td>
                    <div className="table-data-feature">
                        <button
                            className="item"
                            data-placement="top"
                            title="Chi tiết"
                            onClick={(e) => this.redirectViewProcess(e, this.props.id)}
                        >
                            <i className="fas fa-eye"></i>
                        </button>
                        <button
                            className="item"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Hành động"
                        >
                            <i className="zmdi zmdi-more" />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ProcessItemCompany;
