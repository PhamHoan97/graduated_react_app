import React, { Component } from 'react';
import Image from '../Image/logo.png';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name:'',
            ceo:'',
            signature:'',
            field: '',   
            people:'',
            address:'',
            emailContact:'',

        }
    }

    render() {
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
                      <form method="post">
                        <div className="form-group required">
                          <label className="control-label">Company</label>
                          <input className="au-input au-input--full" type="text" name="name-company" placeholder="Công ty trách nghiệm hữu hạn Kinh Đô" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Signature</label>
                          <input className="au-input au-input--full" type="text" name="name-company" placeholder="CTTNHH KĐ" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Ceo</label>
                          <input className="au-input au-input--full" type="text" name="ceo-company" placeholder="Sam Smith" />
                        </div>
                        <div className="form-group">
                          <label>Field</label>
                          <select className="form-control" name="field-company" id="field-company">
                            <option value="Sale">Sale</option>
                            <option value="Delivery">Delivery</option>
                            <option value="IT">Information Technology</option>
                            <option value="Manufactory">Manufactory</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">Workforce</label>
                          <select className="form-control" name="people-company" id="workforce-company">
                            <option value="1">Less than 50 employees</option>
                            <option value="2">From 50 to 100 employees</option>
                            <option value="2">From 150 to 200 employees</option>
                            <option value="3">From 200 to 300 employees</option>
                            <option value="4">More than 300 employees</option>
                          </select>
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Address</label>
                          <input className="au-input au-input--full" type="text" name="address-company" placeholder="Đê La Thành" />
                        </div>
                        <div className="form-group required">
                          <label className="control-label">Email Contact</label>
                          <input className="au-input au-input--full" type="email" name="email" placeholder="jsmith@example.com" />
                        </div>
                        <div className="login-checkbox">
                          <label>
                            <input type="checkbox" name="aggree" />Agree the terms and policy
                          </label>
                        </div>
                        <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">register</button>
                      </form>
                      <div className="register-link">
                        <p>
                          Already have account? 
                          <a href="/"> Sign In</a>
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

export default Register;
