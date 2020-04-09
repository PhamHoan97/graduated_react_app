import React, { Component } from "react";
import ProcessCompany from "./Process/ProcessCompany";
import MapCompany from "./Map/MapCompany";

export default class DetailCompany extends Component {
  render() {
    return (
        <div className="section__content section__content--p30 detail--company__page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8">
              {/* process data*/}
              <ProcessCompany />
              {/* END process data*/}
            </div>
            <div className="col-xl-4">
              {/* MAP DATA*/}
              <MapCompany />
              {/* END MAP DATA*/}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="copyright">
                <p>
                  Copyright © 2018 Colorlib. All rights reserved. Template by{" "}
                  <a href="https://colorlib.com">Colorlib</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
