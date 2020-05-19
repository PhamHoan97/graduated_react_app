import React, { Component } from "react";
import  { Redirect } from 'react-router-dom';

class ProcessItem extends Component {

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

  render() {
    if(this.state.isRedirectToViewProcess){
      return <Redirect to={'/view/process/' + this.state.idProcess} />
    }
    return (
        <tr>
            <td>{this.props.name}</td>
            <td>{this.props.company}</td>
            <td>{this.props.description.substring(0,50) + '...'}</td>
            <td>{this.props.date}</td>
            <td>
            <span className="role admin">
                <a href="##" onClick={(e) => this.redirectViewProcess(e, this.props.id)} style={{ color: "white", textDecoration: "none" }}>
                Chi tiết
                </a>
            </span>
            </td>
        </tr>
    );
  }
}

export default ProcessItem;
