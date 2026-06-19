import React from "react";
import styles from "./SingleTrip.module.css";
import { BsCircleFill } from "react-icons/bs";

const SingleTrip = ({ booking }) => {
  console.log("Booking is : ", booking);
  console.log(booking.passengerDetails);
  let imageArr = [
    {
      _id: {
        $oid: "6049b8a97501a24470b9a526",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a527",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a528",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a529",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52a",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52b",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52c",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52d",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52e",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "6049d3567501a24470b9a533",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bef",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf0",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf1",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf2",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf3",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf4",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf5",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf6",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf7",
      },
      images:
        "/local/placeholder.svg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf8",
      },
      images:
        "/local/placeholder.svg",
    },
  ];
  return (
    <div className={styles.SingleTrip}>
      <div className={styles.SingleTrip__image}>
        <img
          src={imageArr[Math.floor(Math.random() * (18 - 0 + 1) + 0)].images}
          alt="bus"
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div className={styles.SingleTrip__busdetails}>
          <div
            style={{
              color: "#d84e55",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Bus Details
          </div>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Departure Location: {booking.departureDetails.city}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Departure Time: {booking.departureDetails.time}:00 hrs
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Departure Date: {booking.departureDetails.date}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Arrival Location: {booking.arrivalDetails.city}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Arrival Time: {booking.arrivalDetails.time}:00 hrs
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Arrival Date:{booking.arrivalDetails.date}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Total Fare: {booking.fare}
          </p>
        </div>
        <div className={styles.SingleTrip__persondetails}>
          <div
            style={{
              color: "#d84e55",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "10px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Passenger Details
          </div>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Contact Email: {booking.email}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Conatct Phone Number: {booking.phoneNumber}
          </p>
          <div className={styles.SingleTrip__customerDetails__passenger}>
            {booking.passengerDetails.map((e) => (
              <div key={e.id}>
                <p>
                  <BsCircleFill
                    style={{
                      marginRight: "20px",
                      fontSize: "7px",
                      color: "green",
                    }}
                  />
                  Name: {e.name}
                </p>
                <p>
                  <BsCircleFill
                    style={{
                      marginRight: "20px",
                      fontSize: "7px",
                      color: "green",
                    }}
                  />
                  Gender: {e.gender}
                </p>
                <p>
                  <BsCircleFill
                    style={{
                      marginRight: "20px",
                      fontSize: "7px",
                      color: "green",
                    }}
                  />
                  Age: {e.age}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTrip;
