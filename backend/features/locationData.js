let locationData = null;
let timeout = null;

module.exports = (io) => {
  console.log('locationData.js module loaded.');

  let interval;

  const sendLocationUpdate = () => {
    if (locationData) {
      io.emit('locationUpdate', locationData);
    }
  };

  io.on('connection', (socket) => {
    // Emit initial location data if available
    sendLocationUpdate();

    // Start interval if not already started
    if (!interval) {
      interval = setInterval(sendLocationUpdate, 30 * 1000);
    }

    // Someone is sharing their location
    socket.on('locationShare', (data) => {
      console.log('locationShare event. Data:', data);

      // Save the location data with a timestamp
      locationData = {
        ...data,
        timestamp: Date.now(),
      };

      // Clear the timeout if it exists
      if (timeout) {
        clearTimeout(timeout);
      }
      // Set a timeout to clear the location data after 10 minutes
      timeout = setTimeout(() => clearLocationData(io), 10 * 60 * 1000);
    });

    // Clear interval on disconnect if no clients connected
    socket.on('disconnect', () => {
      if (io.engine.clientsCount === 0) {
        clearInterval(interval);
        interval = null;
      }
    });
  });
};