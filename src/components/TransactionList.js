import React, { Component } from "react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import * as actions from "../actions/transactionActions";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

class TransactionList extends Component {
  handleEdit = (index) => {
    this.props.updateTransactionIndex(index);
  };

  handleDelete = (index) => {
    this.props.deleteTransaction(index);
  };

  render() {
    return (
      <div className="container">
        <TransactionForm />
        <hr />
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.emailAddress}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.handleEdit(index)}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>{" "}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateTransactionIndex: actions.updateIndex,
      deleteTransaction: actions.Delete,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
