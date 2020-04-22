import React, { Component } from "react";
import DepartmentItemCompany from "../../Component/DetailCompany/Process/DepartmentItemCompany";
import ProcessItemCompany from "../../Component/DetailCompany/Process/ProcessItemCompany";
import * as host from "../../Constants/Url";
import axios from "axios";

export default class ProcessDetailCompanyContainer extends Component {
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    constructor(props) {
        super(props);
        this.state = {
            listDepartmentCompany : [],
            listProcessDepartmentCompany:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.getListDepartmentCompany();
        this.getListProcessDepartmentCompany();
    }

    getListDepartmentCompany = () => {
        var self =  this;
        axios.get(host.URL_BACKEND+"/api/system/dashboard/department/company/"+this.props.idCompany)
        .then(function (response) {
            self.setState({
                listDepartmentCompany:response.data.departmentCompany
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    getListProcessDepartmentCompany = () => {
        var self =  this;
        axios.get(host.URL_BACKEND+"/api/system/dashboard/process/company/"+this.props.idCompany)
        .then(function (response) {
            console.log(response.data.processes);
            self.setState({
                listProcessDepartmentCompany:response.data.processes
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    showProcesseDepartmentCompany = () =>{
        var listProcessDepartmentCompany =  this.state.listProcessDepartmentCompany;
        console.log(this.state.listProcessDepartmentCompany);
        if(listProcessDepartmentCompany.length > 0){
            var result = listProcessDepartmentCompany.map((process,index) => {
                return(
                    <ProcessItemCompany
                       key={index}
                       date={process.update_at}
                       description={process.description}
                       name={process.name}
                       employee={process.employee_name}
                    />
                )
            })
            return result;
        }else{
            return(
                <tr>No data</tr>
            )
        }
    }

    showDepartmentCompany = () => {
        var listDepartmentCompany =  this.state.listDepartmentCompany;
        if(listDepartmentCompany.length > 0){
            console.log(listDepartmentCompany);
            var result = listDepartmentCompany.map((department,index) => {
                return(
                    <DepartmentItemCompany
                       key={index}
                       name={department.name}
                       value={department.id}
                    />
                )
            })
            return result;
        }else{
            return(
                <option></option>
            )
        }
    }

    handleChange(e) {
        var idChooseDepartment = e.target.value;
        var self =  this;
        if(parseInt(idChooseDepartment) === 0){
            axios.get(host.URL_BACKEND+"/api/system/dashboard/process/company/"+this.props.idCompany)
            .then(function (response) {
                self.setState({
                    listProcessDepartmentCompany:response.data.processes
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            axios.get(host.URL_BACKEND+"/api/system/dashboard/process/department/"+idChooseDepartment+"/company/"+this.props.idCompany)
            .then(function (response) {
                self.setState({
                    listProcessDepartmentCompany:response.data.processes
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        console.log('Render detail company container');
        return (
        <div className="user-data m-b-40">
            <h3 className="title-3 m-b-30 detail--company__title">
            <i className="zmdi zmdi-account-calendar" />
            process data
            </h3>
            <div className="filters m-b-45">
            <div className="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
                <select
                className="js-select2 select--department__detail_company"
                name="idChooseDepartment"
                value={this.state.idChooseDepartment}
                onChange={(e)=>this.handleChange(e)}
                >
                <option value="0">Department</option>
                {
                    this.showDepartmentCompany()
                }
                </select>
                <div className="dropDownSelect2" />
            </div>
            <div className="rs-select2--dark rs-select2--sm rs-select2--border">
                <select
                className="js-select2 au-select-dark select--time__detail_company"
                name="time"
                >
                <option value="0">All Time</option>
                <option value>By Month</option>
                <option value>By Day</option>
                </select>
                <div className="dropDownSelect2" />
            </div>
            </div>
            <div className="table-responsive table-data">
            <table className="table">
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Admin</td>
                    <td>Date</td>
                    <td>Status</td>
                    <td>Detail</td>
                    <td />
                </tr>
                </thead>
                <tbody>
                    {this.showProcesseDepartmentCompany()}
                </tbody>
            </table>
            </div>
            <div className="user-data__footer">
            <button className="au-btn au-btn-load">load more</button>
            </div>
        </div>
        );
    }
}
