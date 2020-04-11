import React, { Component } from 'react'
import company from '../../../../Images/Company/company1.jpg'
export default class CompanyList extends Component {
    render() {
        return (
            <div className="col-md-3">
              <div className="card text-center">
                <a href="DetailCompany.html">
                  <img
                    className="card-img-top"
                    src={company}
                    alt="AAA"
                  />
                  <div className="card-body">
                    <h6 className="card-title mb-3 dashboard__name--company">
                      Cong ty 1
                    </h6>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </a>
              </div>
            </div>
        )
    }
}
