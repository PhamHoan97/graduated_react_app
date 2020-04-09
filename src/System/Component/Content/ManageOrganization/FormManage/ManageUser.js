import React, { Component } from 'react'

export default class ManageUser extends Component {
    render() {
        return (
            <div className="col-md-3 org--chart_property text-left bg-light">
            <div className="property--lable mt-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-8">
                    <h4>Manager User</h4>
                  </div>
                  <div className="col-md-4 text-md-right">
                    <a href="##">
                      <i className="fas fa-times fa-4x" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="field">Position</label>
              <input type="text" className="form-control" id="position" />
            </div>
            <div className="form-group">
              <label htmlFor="field">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Department</label>
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>
            <div className="form-group">
              <div className="container-fluid">
                <div className="row mt-5">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-stripe list-member">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Position</th>
                            <th scope="col">Department</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>nhatvan023@gmail.com</td>
                            <td>
                              Manager
                            </td>
                            <td>
                              Sales
                            </td>
                            <td className="text-right">
                              <i className="fa fa-trash fa-2x" />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>nhatvan023@gmail.com</td>
                            <td>
                              Manager
                            </td>
                            <td>
                              Sales
                            </td>
                            <td className="text-right">
                              <i className="fa fa-trash fa-2x" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group text-left">
              <button type="submit" className="btn btn-primary mb-2 mr-2">New</button>
              <button type="submit" className="btn btn-primary mb-2 mr-2">Edit</button>
              <button type="submit" className="btn btn-primary mb-2 mr-2">Cancel</button>
            </div>
          </div>
        )
    }
}
