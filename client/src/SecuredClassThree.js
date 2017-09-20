import React, {Component} from "react";

export default class SecuredClassThree extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/SecuredClassThree");

  }
  render() {
    return (

      <h3>SecuredClassThree</h3>

    );


  }
}
