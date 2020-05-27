import React, { Component } from 'react';
import Image from '../Image/logo.png';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail} from 'validator';
import axios from 'axios';
import Select from 'react-validation/build/select';
import '../Css/register.css';
import { connect } from 'react-redux'; 
import {updateCompanyInformationAfterRegisterInStore} from '../Actions/RegisterActions';
import  { Redirect } from 'react-router-dom';

const required = (value) => {
  if (!value.toString().trim().length) {
      return <small className="form-text text-danger error">Không được để trống</small>;
  }
}

const email = (value) => {
  if (!isEmail(value)) {
      return <small className="form-text text-danger error">Không đúng định dạng Email</small>;
  }
}

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name:'',
            ceo:'',
            signature:'',
            field: '',   
            workforce:'',
            address:'',
            emailContact:'',
            redirectAlert:'',
        }
    }

  handleChangeCompany = event => {
    this.setState({ name: event.target.value });
  }
  handleChangeSignature = event => {
    this.setState({ signature: event.target.value });
  }
  handleChangeCeo = event => {
    this.setState({ ceo: event.target.value });
  }
  handleChangeField = event => {
    this.setState({ field: event.target.value });
  }
  handleChangeWorkforce = event => {
    this.setState({ workforce: event.target.value });
  }
  handleChangeAddress = event => {
    this.setState({ address: event.target.value });
  }
  handleChangeContact = event => {
    this.setState({ emailContact: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    var checkBox = document.getElementById("agree");
    if(!checkBox.checked){
      var message = '<small class="form-text text-danger">Để sử dụng phần mềm bạn phải đồng ý với các điều khoản sử dụng</small>';
      document.getElementById("show-error").innerHTML = message;
    }else{
      var company = {
        name: this.state.name,
        signature: this.state.signature,
        address: this.state.address,
        field: this.state.field,
        workforce: this.state.workforce,
        ceo: this.state.ceo,
        contact: this.state.emailContact,
    };

    axios.post(`http://127.0.0.1:8000/api/company/register`, company)
      .then(res => {
        if(res.data.error != null){
            console.log(res.data.error);
        }else{
            console.log(res.data);
            this.props.updateCompanyInformation(company);
            this.setState({redirectAlert: true});
        }
      }).catch(function (error) {
        alert(error);
      });

    }
  }

  clickCheckBox = event =>{
    var checkBox = document.getElementById("agree");
    if(checkBox){
        document.getElementById("show-error").innerHTML = '';
    }
  }

  onSubmit = event => {
      event.preventDefault();
      this.form.validateAll();
  }
  
    render() {
        if(this.state.redirectAlert){
          return <Redirect to='/newletter'  />;
        }
        return (
          <div className="page-wrapper register--page">
            <div className="page-content--bge5">
              <div className="container">
                <div className="login-wrap">
                  <div className="login-content">
                    <div className="login-logo">
                      <a href="/">
                        <img src={Image} alt="Cool Admin" />
                      </a>
                    </div>
                    <div className="login-form">
                      <Form method="post" onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }}>
                        <div className="form-group required">
                          <label className="control-label">Công ty</label>
                          <Input validations={[required]} onChange={this.handleChangeCompany} className="au-input au-input--full" type="text" name="name-company" placeholder="Công ty trách nghiệm hữu hạn Kinh Đô" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Kí hiệu</label>
                          <Input validations={[required]} onChange={this.handleChangeSignature} className="au-input au-input--full" type="text" name="name-company" placeholder="CTTNHH KĐ" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Người đứng đầu</label>
                          <Input validations={[required]} onChange={this.handleChangeCeo} className="au-input au-input--full" type="text" name="ceo-company" placeholder="Sam Smith" />
                        </div>
                        <div className="form-group required">
                          <label value="" className="control-label">Lĩnh vực</label>
                          <Select validations={[required]} onChange={this.handleChangeField} className="form-control" name="field-company" id="field-company">
                            <option value="">Lựa chọn lĩnh vực</option>
                            <option value="Sale">Bán hàng</option>
                            <option value="Delivery">Vận chuyển</option>
                            <option value="IT">Công nghệ thông tin</option>
                            <option value="Manufactory">Sản xuất</option>
                            <option value="Others">Khác</option>
                          </Select>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Nhân lực</label>
                          <Select validations={[required]} onChange={this.handleChangeWorkforce} className="form-control" name="people-company" id="workforce-company">
                          <option value="">Lựa chọn khoảng nhân lực của công ty</option>
                            <option value="1">Ít hơn 50 nhân viên</option>
                            <option value="2">Từ 50 đến 100 nhân viên</option>
                            <option value="3">Từ 100 đến 200 nhân viên</option>
                            <option value="4">Từ 200 đến 300 nhân viên</option>
                            <option value="5">Nhiều hơn 300 nhân viên</option>
                          </Select>
                        </div>
                        <div className="form-group required">
                          <label validations={[required]} className="control-label">Địa chỉ</label>
                          <Input onChange={this.handleChangeAddress} className="au-input au-input--full" type="text" name="address-company" placeholder="Đê La Thành" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Email liên hệ </label>
                          <Input validations={[required, email]} onChange={this.handleChangeContact} className="au-input au-input--full" type="email" name="email" placeholder="jsmith@example.com" />
                        </div>
                        <div className="login-checkbox-register">
                          <div>
                            <input onClick={this.clickCheckBox} type="checkbox" name="aggree" id="agree"/> 
                            Đồng ý với các điều khoản và luật lệ
                          </div>
                          <div className="show-error-checkbox" id="show-error">
                          </div>
                        </div>
                        <CheckButton onClick={this.handleSubmit} ref={c => { this.checkBtn = c }} className="au-btn au-btn--block au-btn--green m-b-20 submit-register" type="submit">Đăng kí</CheckButton>
                      </Form>
                      <div className="register-link">
                        <p>
                          Bạn đã có tài khoản? 
                          <a href="/company/login">  Đăng nhập</a>
                        </p>
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
    companyRegister: state.registerReducers.companyRegister,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCompanyInformation: (company) => {
      dispatch(updateCompanyInformationAfterRegisterInStore(company));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);

