import React, { Component } from "react";
import "../css/App.css";
import AddAppointments from "./AddAppointments";
import SearchAppointments from "./SearchAppointments";
import ListAppointments from "./ListAppointments";
import { findIndex, without } from "lodash";

class App extends Component {
  //when you want to use .this in your class component you need the constructor

  constructor() {
    //when you want to use state you need to use super()
    //allows you to get info form parent component
    //can pass things from other components to this one.
    //bind toggleForm() .this in constructor.

    super();
    this.state = {
      myAppointments: [],
      formDisplay: true,
      orderBy: "petName",
      orderDir: "asc",
      queryText: "",
      lastIndex: 0
    };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  //Create OnCLick Function toggleForm
  //Note when using state ina submethod must bind .this in constructor for proper .this
  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  searchApts(query) {
    this.setState({ queryText: query });
  }

  //changeOrder method from searchApt
  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  //updateInfo
  updateInfo(name, value, id) {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
  }

  //Add Appointment
  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  /*  Cannot directly change apt->must be  Use lodash library Without(array,itemToDelete)      method->s Takes an array and then feeds a record that wants to be deleted/2 arguments^. / Will return record without the apt.
-Because creating a method that deletes matching records can be slightly complex.*/

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;

    tempApts = without(tempApts, apt);

    //Will then have an updated record and must setState
    //must bind del apt .this obj in class constructor fot the use of the correct .this
    this.setState({
      myAppointments: tempApts
    });
  }

  //Real Apps use data from another source
  //Lifecycle Component
  componentDidMount() {
    fetch("./data.json")
      /*because fecth api works with promises we can use .then to get the value of the resposnse from the server -> then specify the data will come in as json obj*/
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        /* Never change state directly. Create a temp variable and push it using setState */
        this.setState({
          myAppointments: apts
        });
      });
  }
  //------------------------------------------------------------
  render() {
    let order;

    let filteredApts = this.state.myAppointments;
    if (this.state.orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter(eachItem => {
        return (
          eachItem["petName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["ownerName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["aptNotes"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    /*To render a the items we need to use a simple expression. We cannot directly inject into .container below.
    Created and outputed in components
    
    
   ListAppointments -> appointments is adding a new vairable  (like an attribute) & is being passed props by { }*/

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments
                  appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
