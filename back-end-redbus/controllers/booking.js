const Booking = require("../models/boooking");
exports.addBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.send(booking);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
exports.getBooking = async (req, res) => {
  // code here
  let { id } = req.params;
  const bookings = await Booking.find().lean().exec();
  let filteredBookings = bookings.filter(
    (booking) => booking.customerId.toString() == id
  );
  res.send(filteredBookings);
};
