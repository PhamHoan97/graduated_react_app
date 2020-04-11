import React, { Component } from "react";

export default class PopularField extends Component {
  render() {
    return (
      <div className="rs-select2--light rs-select2--sm">
        <select className="js-select2 select--field__dashboard" name="time">
          <option value>Field</option>
          <option value>IT</option>
          <option value>Marketing-Online</option>
          <option value>Real Estate</option>
        </select>
        <div className="dropDownSelect2" />
      </div>
    );
  }
}
