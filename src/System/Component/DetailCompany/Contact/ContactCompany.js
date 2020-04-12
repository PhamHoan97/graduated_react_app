import React, { Component } from "react";
import comany from '../../../Images/Company/company1.jpg'

export default class ContactCompany extends Component {
  render() {
    return (
      <div className="map-data m-b-40">
        <h3 className="title-3 m-b-30 detail--company__title">
          <i className="zmdi zmdi-map" />
          map data
        </h3>
        {/* Map Company */}
        <div className="map-wrap m-t-40 m-b-60">
          <img src={comany} style={{ height: "284px"}} alt="img-company"></img>
        </div>
        <div className="table-wrap">
          <div className="table-responsive table-style1">
            <table className="table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>$119,366.96</td>
                </tr>
                <tr>
                  <td>Field</td>
                  <td>$70,261.65</td>
                </tr>
                <tr>
                  <td>Achievement</td>
                  <td>$46,399.22</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>$46,399.22</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>$46,399.22</td>
                </tr>
                <tr>
                  <td>Contact</td>
                  <td>$46,399.22</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
