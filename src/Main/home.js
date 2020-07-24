import React, { Component } from "react";
import { connect } from "react-redux";
import Welcome from "./welcome";
import "./main.css";

class Home extends Component {
  render() {
    return (
      <Welcome />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.store,
  };
};

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(Home);
