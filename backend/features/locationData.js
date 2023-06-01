let locationData = null;
let timeout = null;

module.exports = (io) => {
  console.log('locationData.js module loaded.')



  io.on('connection', (socket) => {
    // emit initial location data (could be null)
    socket.emit('locationUpdate', locationData);

    // someone is sharing their location
    socket.on('locationShare', (data) => {
      console.log('locationShare event. Data:', data);

      // save the location data with a timestamp
      locationData = {
        ...data,
        timestamp: Date.now(),
      };

      // clear the timeout if it exists
      if (timeout) {
        clearTimeout(timeout);
      }
      // set a timeout to clear the location data after 10 minutes
      timeout = setTimeout(() => clearLocationData(io), 10 * 60 * 1000);

      io.emit('locationUpdate', data);
    });
  });
}

// a function that clears the location data if it's older than 10 minutes
const clearLocationData = (io) => {
  console.log('clearing location data. Timestamp:', locationData.timestamp, 'Now:', Date.now());

  locationData = null;

  io.emit('locationUpdate', locationData);
};
