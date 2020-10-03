import React, { Component } from "react";
import Modal from "./Modal";
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateNameRegex = RegExp(/^[a-zA-Z ]{2,30}$/);
const validMobileRegex = RegExp(/^[0-9\b]+$/);

const getBase64 = (f) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
  });
};

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "",
      email: "",
      mobile: "",
      category: "General",
      profilePic: "",
      showModal: false,
      technology: {
        C: false,
        "C++": false,
        Java: false,
        Python: false,
        Javascript: false,
      },
      techArr: [],
      errors: false,
      errorMessageName: "",
      errorMessageEmail: "",
      errorMessageMobile: "",
      errorMessageCheckbox: "",
      formErrors: {
        name: "",
        gender: "",
        email: "",
        mobile: "",
        category: "",
        techArr: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        if(value.length>0){
            if(validateNameRegex.test(value)){
                formErrors.name=""
            }else{
                formErrors.name="Name is invalid"
            }
        }else{
            formErrors.name="Name is empty"
        }
        break;
      case "email":
        if(value.length>0){
            if(validEmailRegex.test(value)){
                formErrors.email=""
            }else{
                formErrors.email="Email is invalid"
            }
        }else{
            formErrors.email="Email is empty"
        }
        break;
      case "mobile":
        if(value.length===10&&validMobileRegex.test(value)){
            formErrors.mobile=""
        }else{
            formErrors.mobile="Mobile is empty"
        }
        break;
      case "techArr":
          let arr=[...value]
        formErrors.techArr =
          arr.length > 0 ? "" : "please select atleast one technology";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  // validateUserName = (name) => {
  //     if (validateNameRegex.test(name)) {
  //         this.setState({
  //             errors: false,
  //             errorMessageName: ""
  //         })
  //         return true;
  //     } else {
  //         this.setState({
  //             errors: true,
  //             errorMessageName: "Name is incorrect"
  //         })
  //         return false;
  //     }
  // };

  // validateUserEmail = (email) => {
  //     if (validEmailRegex.test(email)) {
  //         this.setState({
  //             errors: false,
  //             errorMessageEmail: ""
  //         })
  //         return true;
  //     } else {

  //         this.setState({
  //             errors: true,
  //             errorMessageEmail: "Email is invalid"
  //         })
  //         return false;
  //     }
  // };

  // validateUserPhone = (phone) => {
  //     if (validMobileRegex.test(phone) && phone.length === 10) {
  //         this.setState({
  //             errors: false,
  //             errorMessageMobile: ""
  //         })
  //         return true;
  //     } else {
  //         this.setState({
  //             errors: true,
  //             errorMessageMobile: "Mobile number is invalid"
  //         })
  //         return false;
  //     }
  // };

  validateCheckBox = () => {
    if (this.state.techArr.length > 0) {
      this.setState({
        errors: false,
        errorMessageCheckbox: "",
      });
      return true;
    } else {
      this.setState({
        errors: true,
        errorMessageCheckbox: "Select at least one technology",
      });
      return false;
    }
  };
  fillArr = () => {
    const temp = [];
    Object.keys(this.state.technology).forEach((tech) => {
      if (this.state.technology[tech] === true) {
        temp.push(tech);
      }
      this.setState({ techArr: temp });
    });
  };

  handleCheckBox = (e) => {
    new Promise((resolve, reject) => {
      const language = e.target.value;
      const currValue = this.state.technology[language];
      this.setState({
        technology: { ...this.state.technology, [language]: !currValue },
      });
      resolve();
    }).then(() => {
      this.fillArr();
    });
  };

  imageUpload = async (e) => {
    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["fileBase64"] = base64;
      this.setState({
        profilePic: base64,
      });
    });
  };
  // handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (
  //         this.validateUserName(this.state.name) !== true ||
  //         this.validateUserEmail(this.state.email) !== true ||
  //         this.validateUserPhone(this.state.mobile) !== true ||
  //         this.validateCheckBox() !== true) {
  //         return;
  //     }
  //     this.setState({ showModal: !this.state.showModal });

  // };
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)&&this.validateCheckBox) {
      //
      this.setState({showModal:!this.state.showModal})
      // const userObject = {
      //   name: this.state.name,
      //   gender: this.state.gender,
      //   email: this.state.email,
      //   mobile: this.state.mobile,
      //   category: this.state.category,
      //   technology: this.state.techArr,
      //   profilePic: this.state.profilePic,
      // };
      

        // .then((res) => {console.log(res)
            //   this.setState({
            //       name:"",
            //       gender:"",
            //       email: "",
            //       mobile: "",
            //       category: "",
            //       technology: {
            //           C: false,
            //           "C++": false,
            //           Java: false,
            //           Python: false,
            //           Javascript: false,
            //         },
            //       techArr: [],
            //       profilePic: "",
            // })
        // });
        // window.location.reload(true)
        // console.log(this.state);

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="fname" className="col-sm-2 col-form-label">
                Name{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.name.length > 0 ? "error" : null
                  }`}
                  id="name"
                  name="name"
                  placeholder="Name"
                  required={true}
                  onChange={this.handleChange}
                  formNoValidate
                />
                {/* {this.state.errors && <p className="alert-danger">{this.state.errorMessageName}</p>}
                 */}
                {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
                )}
              </div>
            </div>
            <div className="row" style={{ marginBottom: "15px" }}>
              <label htmlFor="gender" className="col-sm-2 col-form-label">
                Gender{" "}
              </label>
              <div
                className="col-auto"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    onChange={(e) => {
                      this.setState({ gender: e.target.value });
                    }}
                    required={true}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={(e) => {
                      this.setState({ gender: e.target.value });
                    }}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className={`form-control ${
                    formErrors.email.length > 0 ? "error" : null
                  }`}
                  id="email"
                  placeholder="Email"
                  name="email"
                  required={true}
                  onChange={this.handleChange}
                  formNoValidate
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="mobile" className="col-sm-2 col-form-label">
                Mobile{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className={`form-control ${
                    formErrors.mobile.length > 0 ? "error" : null
                  }`}
                  id="mobile"
                  placeholder="Mobile"
                  name="mobile"
                  required={true}
                  onChange={this.handleChange}
                  formNoValidate
                />
                {formErrors.mobile.length > 0 && (
                  <span className="errorMessage">{formErrors.mobile}</span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="category" className="col-sm-2 col-form-label">
                Category{" "}
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="category"
                  onChange={(e) => {
                    this.setState({ category: e.target.value });
                  }}
                >
                  <option>General</option>
                  <option>SC/ST</option>
                  <option>OBC</option>
                </select>
              </div>
            </div>
            <div
              className="row"
              style={{ marginBottom: "15px", alignItems: "center" }}
            >
              <label className="col-sm-2 col-form-label">Technology </label>
              <div className="col-auto" style={{}}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="c"
                    value="C"
                    onChange={this.handleCheckBox}
                  />
                  <label className="form-check-label" htmlFor="c">
                    C
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="cpp"
                    value="C++"
                    onChange={this.handleCheckBox}
                  />
                  <label className="form-check-label" htmlFor="cpp">
                    C++
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="java"
                    value="Java"
                    onChange={this.handleCheckBox}
                  />
                  <label className="form-check-label" htmlFor="java">
                    Java
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="python"
                    value="Python"
                    onChange={this.handleCheckBox}
                  />
                  <label className="form-check-label" htmlFor="python">
                    Python
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="javascript"
                    value="Javascript"
                    onChange={this.handleCheckBox}
                  />
                  <label className="form-check-label" htmlFor="javascript">
                    Javascript
                  </label>
                </div>
              </div>
            </div>
            {this.state.errors && (
              <span className="errorMessage">
                {this.state.errorMessageCheckbox}
              </span>
            )}
            <div className="form-group row">
              <label htmlFor="col" className="col-sm-2 col-form-label">
                Upload Profile Picture{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  id="colFormLabelLg"
                  placeholder="Choose Profile Pic"
                  required={true}
                  onChange={this.imageUpload}
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            {this.state.showModal && (<Modal name={this.state.name}
                            gender={this.state.gender}
                            email={this.state.email}
                            mobile={this.state.mobile}
                            category={this.state.category}
                            languages={this.state.techArr}
                            profilePic={this.state.profilePic}
                            openModal={this.state.showModal} />)}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(DataForm);
