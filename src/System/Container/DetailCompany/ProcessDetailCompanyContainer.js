import React, { Component } from "react";
import DepartmentItemCompany from "../../Component/DetailCompany/Process/DepartmentItemCompany";
import ProcessItemCompany from "../../Component/DetailCompany/Process/ProcessItemCompany";
import host from '../../../Host/ServerDomain';
import axios from "axios";

export default class ProcessDetailCompanyContainer extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            listDepartmentCompany : [],
            listProcessDepartmentCompany:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.getListDepartmentCompany();
        this.getListProcessDepartmentCompany();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    getListDepartmentCompany = () => {
        this._isMounted = true;
        var self =  this;
        var token = localStorage.getItem('token');
        axios.get(host + "/api/system/dashboard/department/company/"+this.props.idCompany,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            if(self._isMounted){
                self.setState({
                    listDepartmentCompany:response.data.departmentCompany
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    mergeProcesses(process1, process2){
        console.log(process1);
        console.log(process2);
        var processes = [];
        for (let index1 = 0; index1 < process1.length; index1++) {
            processes.push(process1[index1]);
        }
        for (let index2 = 0; index2 < process2.length; index2++) {
            processes.push(process2[index2]);
        }
        return processes;
    }

    getListProcessDepartmentCompany = () => {
        var self =  this;
        var token = localStorage.getItem("token");
        axios.get(host + "/api/system/dashboard/process/company/"+this.props.idCompany,{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            var prosesses = self.mergeProcesses(response.data.processes1, response.data.processes2);
            self.setState({
                listProcessDepartmentCompany: prosesses
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    showProcesseDepartmentCompany = () =>{
        var listProcessDepartmentCompany =  this.state.listProcessDepartmentCompany;
        if(listProcessDepartmentCompany.length > 0){
            var result = listProcessDepartmentCompany.map((process,index) => {
                return(
                    <ProcessItemCompany
                       key={index}
                       id={process.id}
                       date={process.date}
                       description={process.description}
                       name={process.name}
                       deadline={process.deadline}
                       type={process.type}
                    />
                )
            })
            return result;
        }else{
            return(
                <tr>
                    <td>
                        Không có dữ liệu
                    </td>
                </tr>

            )
        }
    }

    showDepartmentCompany = () => {
        var listDepartmentCompany =  this.state.listDepartmentCompany;
        if(listDepartmentCompany.length > 0){
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
            axios.get(host + "/api/system/dashboard/process/company/"+this.props.idCompany)
            .then(function (response) {
                var prosesses = self.mergeProcesses(response.data.processes1, response.data.processes2);
                self.setState({
                    listProcessDepartmentCompany: prosesses
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            axios.get(host + "/api/system/dashboard/process/department/"+idChooseDepartment+"/company/"+this.props.idCompany)
            .then(function (response) {
                var prosesses = self.mergeProcesses(response.data.processes1, response.data.processes2);
                self.setState({
                    listProcessDepartmentCompany: prosesses
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        return (
        <div className="user-data m-b-40">
            <h3 className="title-3 m-b-30 detail--company__title">
            <i className="zmdi zmdi-account-calendar" />
            Danh sách quy trình
            </h3>
            {/* <div className="filters m-b-45">
                <div className="rs-select2--dark rs-select2--md m-r-10 rs-select2--border">
                    <select
                    className="js-select2 select--department__detail_company"
                    name="idChooseDepartment"
                    value={this.state.idChooseDepartment}
                    onChange={(e)=>this.handleChange(e)}
                    >
                    <option value="0">Phòng ban</option>
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
                    <option value="0">Tất cả</option>
                    <option value>Theo tháng</option>
                    <option value>Theo ngày</option>
                    </select>
                    <div className="dropDownSelect2" />
                </div>
            </div> */}
            <div className="table-responsive table-data">
            <table className="table">
                <thead>
                <tr>
                    <td>Quy trình</td>
                    <td>Deadline</td>
                    <td>Cập nhật</td>
                    <td>Thể loại</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                    {this.showProcesseDepartmentCompany()}
                </tbody>
            </table>
            </div>
            <div className="user-data__footer">
            <button className="au-btn au-btn-load">Tải thêm</button>
            </div>
        </div>
        );
    }
}
