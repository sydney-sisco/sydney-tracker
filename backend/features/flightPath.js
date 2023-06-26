const turf = require('@turf/turf');

const startPoint = { lat: 43.03450027599469, lng: -81.14790302422296 }; // yxu
const endPoint = { lat: 49.19345074485577, lng: -123.18030632490304 }; // yvr
const numberOfPoints = 500;

function generateLatLngPoints(start, end, numPoints) {
  const startPoint = turf.point([start.lng, start.lat]);
  const endPoint = turf.point([end.lng, end.lat]);
  const line = turf.lineString([[start.lng, start.lat], [end.lng, end.lat]]);
  const distance = turf.length(line, { units: 'kilometers' });
  const intervalDistance = distance / (numPoints - 1);
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const currentPosition = intervalDistance * i;
    const point = turf.along(line, currentPosition, { units: 'kilometers' });
    points.push({
      lat: point.geometry.coordinates[1],
      lng: point.geometry.coordinates[0]
    });
  }

  return points;
}


module.exports = async (io) => {
  const points = generateLatLngPoints(startPoint, endPoint, numberOfPoints);
  console.log(points);

  function emitPoints(points, interval) {
    let currentIndex = 0;

    setInterval(() => {
      if (currentIndex < points.length) {
        const point = points[currentIndex];

        io.sockets.emit('locationUpdate', { lat: point.lat, lng: point.lng });
        currentIndex++;
      }
    }, 1000);
  }

  io.on('connection', (socket) => {
    emitPoints(points, 1000);
  });
};

