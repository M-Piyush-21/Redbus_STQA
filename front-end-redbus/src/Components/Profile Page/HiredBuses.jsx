import React from "react";
import styles from "./HiredBuses.module.css";
import SingleHiredBus from "./SingleHiredBus";
import axios from "axios";
import { apiUrl } from "../../config";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const HiredBuses = () => {
  const [allBookingsHire, setAllBookingsHire] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);

  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );

  React.useEffect(() => {
    if (currentCustomer?.email) {
      fetchData(currentCustomer.email);
    } else {
      setAllBookingsHire([]);
      setLoadError(false);
    }
  }, [currentCustomer]);

  async function fetchData(email) {
    setIsLoading(true);
    setLoadError(false);
    try {
      const res = await axios.get(apiUrl(`/v1/api/bookingHire/${email}`));
      setAllBookingsHire(Array.isArray(res.data) ? res.data : []);
    } catch {
      setAllBookingsHire([]);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className={styles.HiredBuses}>Loading hired buses...</div>;
  }

  if (loadError) {
    return (
      <div className={styles.HiredBuses}>
        Unable to load hired bus bookings right now.
      </div>
    );
  }

  if (allBookingsHire.length === 0) {
    return (
      <div className={styles.HiredBuses}>
        <h1>No Hired Bus Bookings Found!</h1>
      </div>
    );
  }

  return (
    <div className={styles.HiredBuses}>
      {[...allBookingsHire].reverse().map((booking) => (
        <SingleHiredBus key={uuidv4()} booking={booking} />
      ))}
    </div>
  );
};

export default HiredBuses;
