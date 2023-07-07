const {storeActivity} = require('../utils/firestore')

let locationData = null;
let timeout = null;
let recording = false;
let activity = null;
let recordedPoints = [];

const ACTIVITY_START = 'activityStart';
const ACTIVITY_STOP = 'activityStop';

module.exports = (io) => {
  console.log('locationData.js module loaded.');

  let interval;

  // sending null sets tracker status to "offline"
  const sendLocationUpdate = (socket) => {
    if (socket) {
      socket.emit('locationUpdate', locationData);
    } else {
      io.emit('locationUpdate', locationData);
    }
  };

  io.on('connection', (socket) => {
    // Emit initial location data if available
    sendLocationUpdate(socket);

    // Start interval if not already started
    if (!interval) {
      interval = setInterval(sendLocationUpdate, 30 * 1000);
    }

    // Someone is sharing their location
    socket.on('locationShare', (data) => {
      console.log('locationShare event. Data:', data);

      const previousLocationData = locationData;

      // Save the location data with a timestamp
      locationData = {
        ...data,
        timestamp: Date.now(),
      };

      // Save the location data if recording
      if (recording) {
        recordedPoints.push(locationData);
      }

      // If the previous location data was null, send initial location immediately
      if (!previousLocationData) {
        sendLocationUpdate();
      }

      // Clear the timeout if it exists
      if (timeout) {
        clearTimeout(timeout);
      }
      // Set a timeout to clear the location data after 10 minutes
      timeout = setTimeout(() => clearLocationData(io), 10 * 60 * 1000);
    });

    socket.on(ACTIVITY_START, (data) => {
      console.log('activityStart event. Data:', data);
      recordedPoints = [];
      recording = true;
      activity = data.activity;
    });

    socket.on(ACTIVITY_STOP, (data) => {
      console.log('activityStop event. Data:', data);
      storeActivity(activity, recordedPoints);
      recording = false;
      activity = null;
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

// a function that clears the location data if it's older than 10 minutes
const clearLocationData = (io) => {
  console.log('clearing location data. Timestamp:', locationData.timestamp, 'Now:', Date.now());

  locationData = null;

  io.emit('locationUpdate', locationData);
};
