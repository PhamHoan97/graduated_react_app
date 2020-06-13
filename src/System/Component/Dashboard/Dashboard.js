import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVerticalDashboard from "../Menu/MenuVerticalDashboard";
import CompanyContainer from "../../Container/Dashboard/CompanyContainer";
import ProcessDashboardContainer from "../../Container/Dashboard/ProcessDashboardContainer";
import {getTextSearchProcess}  from "../../Action/Dashboard/Process/Index"; 
import {connect} from "react-redux";
import * as actions from '../../../Alert/Action/Index';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search: '',  
    }
  }
  
  handleSearch = event => {
    var searchValue = event.target.value;
    this.setState({search: searchValue});
  }

  searchProcesses = (e) => {
    e.preventDefault(); 
    var search = this.state.search;
    this.props.getTextSearchProcess(search);
  }

  render() {
    return (
      <div className="page-wrapper">
        <MenuHorizontal/>
        <div className="page-container">
          <MenuVerticalDashboard/>
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <CompanyContainer/>
                <div className="row text-left" style={{height:"36px"}}>
                  <div className="col-md-12">
                    <h3 className="title-5 m-b-35 dashboard__title--process">
                      Danh sách quy trình
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-data__tool">
                      <div className="table-data__tool-left">
                    
                      </div>
                      <div className="table-data__tool-right">
                          <div className="rs-select2--light-search-company">
                              <form className="form-search-employee">
                                  <input className="form-control" onChange={this.handleSearch} placeholder="Tìm kiếm quy trình ..." />
                                  <button className="employee-btn--search__process" type="button" onClick={(e) => this.searchProcesses(e)}><i className="zmdi zmdi-search"></i></button>
                              </form>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{marginTop:"5px"}}> 
                  <div className="col-md-12">
                     <ProcessDashboardContainer/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="copyright">
                      <p>
                        Copyright © 2018 Colorlib. All rights reserved. Template
                        by <a href="https://colorlib.com">Colorlib</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getTextSearchProcess: (textSearch) => {
          dispatch(getTextSearchProcess(textSearch))
      },
      showAlert: (properties) => {
        dispatch(actions.showMessageAlert(properties))
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

