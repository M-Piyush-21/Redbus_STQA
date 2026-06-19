import React from "react";
import styles from "./MyTrips.module.css";
import SingleTrip from "./SingleTrip";
import axios from "axios";
import { apiUrl } from "../../config";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const MyTrips = () => {
  const [allBookings, setAllBookings] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);

  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );

  React.useEffect(() => {
    if (currentCustomer?._id) {
      fetchData(currentCustomer._id);
    } else {
      setAllBookings([]);
      setLoadError(false);
    }
  }, [currentCustomer]);

  async function fetchData(id) {
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await axios.get(apiUrl(`/v1/api/booking/${id}`));
      setAllBookings(Array.isArray(res.data) ? res.data : []);
    } catch {
      setAllBookings([]);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className={styles.MyTrips}>Loading your trips...</div>;
  }

  if (loadError) {
    return (
      <div className={styles.MyTrips}>
        Unable to load trip bookings right now.
      </div>
    );
  }

  if (allBookings.length === 0) {
    return (
      <div className={styles.MyTrips}>
        <h1>No Bookings Found!</h1>
      </div>
    );
  }

  return (
    <div className={styles.MyTrips}>
      {[...allBookings].reverse().map((booking) => (
        <SingleTrip key={uuidv4()} booking={booking} />
      ))}
    </div>
  );
};

export default MyTrips;
