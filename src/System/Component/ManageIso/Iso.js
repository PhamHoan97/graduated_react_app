import React, { Component } from "react";
import MenuHorizontal from "../Menu/MenuHorizontal";
import MenuVertical from "../Menu/MenuVertical";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import '../../Style/Iso/Iso.css';
import TableIso from './TableIso';
import option from '../../Constants/Iso/Year';
import axios from 'axios';

class Iso extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      year: '',
      content: '',
      file: '',
      reload: false,
    }
  }

  handleChangeName = (event) => {
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  handleChangeYear = (event) => {
    event.preventDefault();
    this.setState({year: event.target.value});
  }

  handleChangeContent = event => {
    event.preventDefault();
    this.setState({content: event.target.value});
  }

  handleChangeFile = event => {
    event.preventDefault();
    this.setState({file: event.target.files[0]});
  }
  
  componentDidMount() {
    document.getElementById('select-year').innerHTML = option;
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    var token = localStorage.getItem('token');
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('year', this.state.year);
    data.append('isoContent',  this.state.content);
    if(this.state.file){
      data.append('document', this.state.file, this.state.file.name);
    }
    
    axios.post(`http://127.0.0.1:8000/api/system/iso/create`,
    data,
    {
        headers: { 'Authorization': 'Bearer ' + token, 'content-type': 'multipart/form-data'}
    }).then(res => {
      if(res.data.error != null){
          console.log(res.data.message);
      }else{
          console.log(res.data); 
          this.setState({reload:true});
      }
    }).catch(function (error) {
      alert(error);
    });
  }

  render() {
    return (
      <div className="page-wrapper">
        <MenuHorizontal/>
        <div className="page-container">
          <MenuVertical />
          <div className="main-content">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="title-iso">Create Standard</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 creat-iso-container">
                    <Form className="iso-create" onSubmit={(e) => this.handleSubmitForm(e)} encType="multipart/form-data">
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Name</Form.Label>
                          <Form.Control onChange={(e) => this.handleChangeName(e)} type="text" required placeholder="Name..." />
                        </Form.Group>

                        <Form.Group as={Col} controlId="select-year">
                          <Form.Label>Year</Form.Label>
                          <Form.Control onChange={(e) => this.handleChangeYear(e)} required as="select">

                          </Form.Control>
                        </Form.Group>
                      </Form.Row>

                      <Form.Group controlId="formGridAddress1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control onChange={this.handleChangeContent} as={"textarea"} required rows="10" placeholder="Content..." />
                      </Form.Group>

                      <Form.Group controlId="formGridAddress2">
                        <Form.File id="formcheck-iso-file">
                          <Form.File.Label>Iso File</Form.File.Label>
                          <Form.File.Input onChange={this.handleChangeFile} />
                        </Form.File>
                      </Form.Group>

                      <Button variant="primary submit-create-iso" type="submit">
                        Submit
                      </Button>
                    </Form>
                    </div>
                </div>
                <div className="row" style={{marginTop:'50px'}}>
                  <div className="col-md-12">
                    <h3 className="title-iso">List Standard </h3>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                      <TableIso reload ={this.state.reload} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="copyright">
                      <p>
                        Copyright © 2020 Colorlib. All rights reserved. Template
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

export default Iso;
