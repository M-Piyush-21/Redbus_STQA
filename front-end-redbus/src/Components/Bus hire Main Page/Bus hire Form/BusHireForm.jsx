import React from "react";
import Styles from "./BusHireForm.module.css";
import { FaRegDotCircle } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
let initState = {
  pickUp: "",
  drop: "",
  totalPassengers: "",
  email: "",
  pickUpDate: "",
  dropDate: "",
};
const BusHireForm = ({ handleClick }) => {
  const history = useHistory();
  const [formValues, setFormValues] = React.useState(initState);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleProceed = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const params = new URLSearchParams({
      pickUp: fd.get("pickUp") || formValues.pickUp,
      drop: fd.get("drop") || formValues.drop,
      pickUpDate: fd.get("pickUpDate") || formValues.pickUpDate,
      dropDate: fd.get("dropDate") || formValues.dropDate,
      totalPassengers: fd.get("totalPassengers") || formValues.totalPassengers,
    });
    history.push(`/bus-hire-card?${params.toString()}`);
  };
  return (
    <div>
      <div className={Styles.BusHireFormcontainer} data-testid="bus-hire-form">
        <div className={Styles.outstationHeading}>
          <FaLongArrowAltLeft onClick={handleClick} />
          <div style={{ marginLeft: "20px" }}>Outstation</div>
        </div>
        <form onSubmit={handleProceed}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: " #e6f2ff",
              padding: "20px",
            }}
          >
            <div className={Styles.pickUpDestnationDiv}>
              <div className={Styles.pickupDestiationHeading}>Pick up</div>
              <div className={Styles.pickUpDestnationEachDiv}>
                <FaRegDotCircle style={{ color: "red", fontSize: "20px" }} />
                <input
                  className={Styles.inputBox}
                  type="text"
                  placeholder="Enter your Pickup location"
                  value={formValues.pickUp}
                  name="pickUp"
                  data-testid="hire-pickup-input"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={Styles.pickUpDestnationEachDiv}>
                <div className={Styles.dottedDiv}></div>
                <div className={Styles.pickupDestiationHeading}>
                  Destination
                </div>
              </div>
              <div className={Styles.pickUpDestnationEachDiv}>
                <HiLocationMarker
                  style={{ color: "green", fontSize: "20px" }}
                />
                <input
                  className={Styles.inputBox}
                  type="text"
                  placeholder="Enter your Destination "
                  value={formValues.drop}
                  name="drop"
                  data-testid="hire-drop-input"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className={Styles.pickUpDestnationDiv}>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    width: "65%",
                  }}
                >
                  <div className={Styles.fromWhenHeading}>From When</div>
                  <input
                    className={Styles.inputBox}
                    type="date"
                    value={formValues.pickUpDate}
                    name="pickUpDate"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    width: "65%",
                  }}
                >
                  <div className={Styles.fromWhenHeading}>Till When</div>
                  <input
                    className={Styles.inputBox}
                    type="date"
                    value={formValues.dropDate}
                    name="dropDate"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className={Styles.pickUpDestnationDiv}>
              <div className={Styles.fromWhenHeading}>Number of Passengers</div>
              <input
                className={Styles.inputBox}
                type="number"
                placeholder="Enter number of passangers"
                value={formValues.totalPassengers}
                name="totalPassengers"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              type="submit"
              className={Styles.proceedDiv}
              data-testid="hire-proceed-btn"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusHireForm;
