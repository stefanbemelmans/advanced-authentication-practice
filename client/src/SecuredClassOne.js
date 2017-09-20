import React, {Component} from "react";

export default class SecuredClassOne extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/SecuredClassOne");

  }
  render() {
    return (

      <h3>SecuredClassOne</h3>

    );


  }
}
