// Adds the locations of the Seabuses to the map

const endpoint = 'https://maritimo.digital/api/vessel/'

const seabusData = {
  316028554: {
    MMSI: 316028554,
    name: "BURRARD OTTER II",
    data: null,
  },
  316014621: {
    MMSI: 316014621,
    name: "BURRARD PACIFIC BRZE",
    data: null,
  },
  316042365: {
    MMSI: 316042365,
    name: "BURRARD CHINOOK",
    data: null,
  },
  316011649: {
    MMSI: 316011649,
    name: "BURRARD BEAVER",
    data: null,
  },
};

module.exports = async (io) => {
  console.log('seabus.js module loaded.');

  let intervalId;

  const fetchSeabusLocations = async () => {
    console.log('fetching seabus locations');
    await Object.keys(seabusData).forEach(async (MMSI) => {
      const response = await fetch(endpoint + MMSI);
      const data = await response.json();
      seabusData[MMSI].data = data;
    });
    console.log('seabus locations fetched', seabusData);
  };

  const sendSeabusUpdate = (socket) => {
    if (socket) {
      socket.emit('seabusUpdate', Object.values(seabusData));
    } else {
      io.emit('seabusUpdate', Object.values(seabusData));
    }
  };

  io.on('connection', async (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Emit initial location data if available
    sendSeabusUpdate(socket);

    if (!intervalId) {
      await fetchSeabusLocations();
      io.emit('seabusUpdate', Object.values(seabusData));

      intervalId = setInterval(async () => {
        if (io.engine.clientsCount > 0) {
          await fetchSeabusLocations();
          io.emit('seabusUpdate', Object.values(seabusData));
        } else {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 30 * 1000);
    }

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      if (io.engine.clientsCount === 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
  });
};
