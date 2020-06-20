import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionAlerts from  '../../../Alert/Action/Index';
import host from '../../../Host/ServerDomain';

class ViewTemplates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            templates: [],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.editTemplates){
            this.setState({templates: nextProps.editTemplates});
        }
    }

    renderListTemplate = () => {
            var templates = this.state.templates;
            return Object.values(templates).map((value, key) => {
                return (
                    <React.Fragment key={key}>
                        <tr>
                            <th>{value.name}</th>
                            <td>
                                <div className="btn-group mr-2" role="group">
                                    <a className="btn btn-success" href={host + '/' + value.link}>Tải về <i className="fas fa-download"></i></a>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                )
            })
    }

    render() {
        return (
            <div className="detail-area-view-template-process">
                <div className="row">
                    <div className="col-md-5 title-footer">
                        <h4>Biểu mẫu</h4>
                    </div>
                </div>
              
                <div className="row">
                    <table className="table">
                        <thead>
                        </thead>
                        <tbody>
                            {this.renderListTemplate()}
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editTemplates: state.processReducers.templateReducers.editTemplates,
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showAlert: (properties) => {
            dispatch(actionAlerts.showMessageAlert(properties))
        },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewTemplates);

