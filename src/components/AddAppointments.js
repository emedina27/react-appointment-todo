import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";

/* + means looking for a variable.
   ? means ternary ___:___ true:false./ Also evaluates to true by default
   Passing this.props.formDisplay to main App in constructor. Thus main will have control over Addapointments, not just the Addapointments component 
   -In Constructor all local variables.
   */

class AddAppointments extends Component {
  constructor() {
    super();
    this.state = {
      petName: "",
      ownerName: "",
      aptDate: "",
      aptTime: "",
      aptNotes: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    let tempApt = {
      petName: this.state.petName,
      ownerName: this.state.ownerName,
      aptDate: this.state.aptDate + " " + this.state.aptTime,
      aptNotes: this.state.aptNotes
    };

    this.props.addAppointment(tempApt);

    // Clears Out Form
    this.setState({
      petName: "",
      ownerName: "",
      aptDate: "",
      aptTime: "",
      aptNotes: ""
    });

    this.props.toggleForm();
  }

  /* Make Methods Here 
    Create Handle change method()
   - Whenever an event takes place we can recieve that event in a varibale    in any of these methods
   - By setting target to to the current event:
   ----------------------------------------------------------------------
   - Then target is pointing to the current input field a user is typing in   any point in time. 
    ------------
   -Create Value variable for keeping track of the value some has chnage 
   -Create Name variable for keeping track of the value some has chnage
  */

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  //-----------------------------------------------------------------------------
  render() {
    return (
      <div
        className={
          "card textcenter mt-3 " +
          (this.props.formDisplay ? "" : "add-appointment")
        }
      >
        <div
          className="apt-addheading card-header bg-primary text-white"
          onClick={this.props.toggleForm}
        >
          <FaPlus />
          Add Appointment
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="petName"
                readOnly
              >
                Pet Name
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  placeholder="Pet's Name"
                  //Create refreneces to value of the state variables above   in the constructor
                  value={this.state.petName}
                  //Trigger an event each time a change occurs
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="ownerName"
              >
                Pet Owner
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  placeholder="Owner's Name"
                  //Create refreneces to value of the state variables above   in the constructor
                  value={this.state.ownerName}
                  //Trigger an event each time a change occurs
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  //Create refreneces to value of the state variables above   in the constructor
                  value={this.state.aptDate}
                  //Trigger an event each time a change occurs
                  onChange={this.handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  //Create refreneces to value of the state variables above   in the constructor
                  value={this.state.aptTime}
                  //Trigger an event each time a change occurs
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                Apt. Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Appointment Notes"
                  //Create refreneces to value of the state variables above   in the constructor
                  value={this.state.aptNotes}
                  //Trigger an event each time a change occurs
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAppointments;
