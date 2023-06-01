module.exports = (io) => {
  console.log('locationData.js module loaded.')

  const timer = setInterval(() => {

    const randomLat = Number(process.env.CENTER_LAT) + Math.random() * 0.01;
    const randomLng = Number(process.env.CENTER_LNG) + Math.random() * 0.01;

    const data = {
      lat: randomLat,
      lng: randomLng,
    };

    io.emit('locationUpdate', data);

  }, 500);

  io.on('connection', (socket) => {
    socket.on('locationShare', (data) => {

      console.log('locationShare', data);

      io.emit('locationUpdate', data);
    });
  });
}
