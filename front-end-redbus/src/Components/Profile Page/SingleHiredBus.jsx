import React from "react";
import styles from "./SingleHiredBus.module.css";
import { BsCircleFill } from "react-icons/bs";

const SingleHiredBus = ({ booking }) => {
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
    <div className={styles.SingleHiredBus}>
      <div className={styles.SingleHiredBus__image}>
        <img
          src={imageArr[Math.floor(Math.random() * (18 - 0 + 1) + 0)].images}
          alt="bus"
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div className={styles.SingleHiredBus__persondetails}>
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
            Hired Bus Details
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
            Pick Up City: {booking.pickUp}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Drop City: {booking.drop}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Pick Up Date: {booking.pickUpDate}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Drop Date: {booking.dropDate}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Toal Passengers: {booking.totalPassengers}
          </p>
          <p>
            <BsCircleFill
              style={{ marginRight: "20px", fontSize: "7px", color: "green" }}
            />
            Total Fare: {booking.fare}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleHiredBus;
