import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.userData.name}</td>
        <td>{this.props.userData.gender}</td>
        <td>{this.props.userData.email}</td>
        <td>{this.props.userData.mobile}</td>
        <td>{this.props.userData.category}</td>
        <td>
          {this.props.userData.technology.map((lang, idx) => (
            <p key={idx}>{lang}</p>
          ))}
        </td>
        <td>
          <img
            style={{ width: "100px", height: "100px" }}
            src={this.props.userData.profilePic}
          />
        </td>
        <td>
          <Link
            className="edit-link btn btn-outline-primary"
            to={"/edit-user/" + this.props.userData._id}
          >
            Edit
          </Link>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={this.deleteStudent}
            size="sm"
            variant="danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default UserTable;
