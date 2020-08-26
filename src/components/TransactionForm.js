import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/transactionActions";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

class TransactionForm extends Component {
  state = {
    ...this.returnStateObject(),
  };

  returnStateObject() {
    if (this.props.currentIndex === -1)
      return {
        name: "",
        emailAddress: "",
        phone: "",
      };
    else return this.props.list[this.props.currentIndex];
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentIndex !== this.props.currentIndex ||
      prevProps.list.length !== this.props.list.length
    ) {
      this.setState({ ...this.returnStateObject() });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.currentIndex === -1)
      this.props.insertTransaction(this.state);
    else this.props.updateTransaction(this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} autoComplete="off" className="my-4">
          <h3 className="text-center">Employees</h3>
          <div className="form-group">
            <input
              name="name"
              className="form-control"
              placeholder="Ingrese nombre"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <input
              name="emailAddress"
              className="form-control"
              placeholder="Ingrese email"
              onChange={this.handleInputChange}
              value={this.state.emailAddress}
            />
          </div>

          <div className="form-group">
            <input
              name="phone"
              className="form-control"
              placeholder="Ingrese un telefono"
              onChange={this.handleInputChange}
              value={this.state.phone}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-info my-2" type="submit">
              <FontAwesomeIcon icon={faUserPlus} /> Add Employees
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    currentIndex: state.currentIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      insertTransaction: actions.insert,
      updateTransaction: actions.update,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
