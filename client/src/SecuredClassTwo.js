import React, {Component} from "react";

export default class SecuredClassTwo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/SecuredClassTwo");

  }
  render() {
    return (

      <h3>SecuredClassTwo</h3>

    );


  }
}
