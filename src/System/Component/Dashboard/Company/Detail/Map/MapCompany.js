import React, { Component } from "react";

export default class MapCompany extends Component {
  render() {
    return (
      <div className="map-data m-b-40">
        <h3 className="title-3 m-b-30 detail--company__title">
          <i className="zmdi zmdi-map" />
          map data
        </h3>
        {/* Map Company */}
        <div className="map-wrap m-t-45 m-b-80">
          <div id="vmap" style={{ height: "284px" }} />
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
