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
      return <small className="form-text text-danger error">This field is required</small>;
  }
}

const email = (value) => {
  if (!isEmail(value)) {
      return <small className="form-text text-danger error">Invalid email format</small>;
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
      var message = '<small class="form-text text-danger">You must agree with our terms and policy</small>';
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
                          <label className="control-label">Company</label>
                          <Input validations={[required]} onChange={this.handleChangeCompany} className="au-input au-input--full" type="text" name="name-company" placeholder="Công ty trách nghiệm hữu hạn Kinh Đô" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Signature</label>
                          <Input validations={[required]} onChange={this.handleChangeSignature} className="au-input au-input--full" type="text" name="name-company" placeholder="CTTNHH KĐ" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Ceo</label>
                          <Input validations={[required]} onChange={this.handleChangeCeo} className="au-input au-input--full" type="text" name="ceo-company" placeholder="Sam Smith" />
                        </div>
                        <div className="form-group required">
                          <label value="" className="control-label">Field</label>
                          <Select validations={[required]} onChange={this.handleChangeField} className="form-control" name="field-company" id="field-company">
                            <option value="">Select a field</option>
                            <option value="Sale">Sale</option>
                            <option value="Delivery">Delivery</option>
                            <option value="IT">Information Technology</option>
                            <option value="Manufactory">Manufactory</option>
                            <option value="Others">Others</option>
                          </Select>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Workforce</label>
                          <Select validations={[required]} onChange={this.handleChangeWorkforce} className="form-control" name="people-company" id="workforce-company">
                          <option value="">Select workforce range of company</option>
                            <option value="1">Less than 50 employees</option>
                            <option value="2">From 50 to 100 employees</option>
                            <option value="3">From 100 to 200 employees</option>
                            <option value="4">From 200 to 300 employees</option>
                            <option value="5">More than 300 employees</option>
                          </Select>
                        </div>
                        <div className="form-group required">
                          <label validations={[required]} className="control-label">Address</label>
                          <Input onChange={this.handleChangeAddress} className="au-input au-input--full" type="text" name="address-company" placeholder="Đê La Thành" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Email Contact</label>
                          <Input validations={[required, email]} onChange={this.handleChangeContact} className="au-input au-input--full" type="email" name="email" placeholder="jsmith@example.com" />
                        </div>
                        <div className="login-checkbox-register">
                          <div>
                            <input onClick={this.clickCheckBox} type="checkbox" name="aggree" id="agree"/> 
                            Agree the terms and policy
                          </div>
                          <div className="show-error-checkbox" id="show-error">
                          {/* <small className="form-text text-danger">You must agree with our terms and policy</small> */}
                          </div>
                        </div>
                        <CheckButton onClick={this.handleSubmit} ref={c => { this.checkBtn = c }} className="au-btn au-btn--block au-btn--green m-b-20 submit-register" type="submit">register</CheckButton>
                      </Form>
                      <div className="register-link">
                        <p>
                          Already have account? 
                          <a href="/company/login"> Sign In</a>
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

