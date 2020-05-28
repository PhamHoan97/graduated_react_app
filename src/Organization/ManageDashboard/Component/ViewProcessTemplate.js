import React, { Component } from 'react';
import "../../Style/Organization.scss";
import Header from "../../Header";
import LinkPage from "../../LinkPage";
import Menu from "../../Menu";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Process from './Process';
import axios from 'axios';
import * as actions from '../Action/Index';
import {connect} from 'react-redux';
import host from '../../../Host/ServerDomain'; 

class ViewProcessTemplate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            xml: '',
        }
    }

    componentDidMount() {
        var idProcess = this.props.match.params.id;
        var token = localStorage.getItem('token');
        axios.get(host + `/api/company/template/process/` + idProcess,
        {
            headers: { 'Authorization': 'Bearer ' + token}
        }).then(res => {
          if(res.data.error != null){
              console.log(res.data.message);
          }else{
            this.setState({name: res.data.process.name, xml: res.data.process.xml});
        }
        }).catch(function (error) {
          alert(error);
        });
    }

    exportBpmnFile = (e) => {
        e.preventDefault();
        this.props.exportBpmnFile();
    }

    render() {
        return (
            <div className="inner-wrapper manage-organization_template">
            <Header />
            <div
              className="page-wrapper_organization"
              style={{ transform: "none" }}
            >
              <div className="container-fluid" style={{ transform: "none" }}>
                <div className="row" style={{ transform: "none" }}>
                  <div
                    className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar"
                    style={{
                      position: "relative",
                      overflow: "visible",
                      boxSizing: "border-box",
                      minHeight: "1px",
                    }}
                  >
                    <Menu/>
                  </div>
                  <div className="col-xl-9 col-lg-8  col-md-12">
                    <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card ">
                       <LinkPage linkPage=""/>
                    </div>
                    <div className="row">
                      <div className="col-md-12 d-flex">
                        <div className="card ctm-border-radius shadow-sm flex-fill ">
                            <div className="card-header">
                                <h4 className="card-title mb-0">{this.state.name}</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">

                                    </div>
                                    <div className="col-md-4">
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="success" onClick={(e)=>this.exportBpmnFile(e)}>
                                                Xuất File BPMN <i className="fas fa-save"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <Process init={this.state.xml} />
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        exportBpmnFile: () => {
            dispatch(actions.exportBpmnFile());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, )(ViewProcessTemplate)
