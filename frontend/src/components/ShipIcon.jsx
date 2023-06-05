export default function ShipIcon({ dimension_to_bow, dimension_to_port, dimension_to_starboard, dimension_to_stern, ship_type, true_heading, updated }) {
  const width = 100 * (dimension_to_port + dimension_to_starboard);
  const height = 100 * (dimension_to_bow + dimension_to_stern);
  const triangleHeight = 500; // used for the bow

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height + triangleHeight}" viewBox="0 0 ${width} ${height + triangleHeight}">
      <g transform="rotate(${true_heading}, ${width / 2}, ${(height + triangleHeight) / 2})">
        <rect x="0" y="${triangleHeight}" width="${width}" height="${height}" fill="white" />
        <polygon points="${width / 2},0 ${width},${triangleHeight} 0,${triangleHeight}" fill="white" />
      </g>
    </svg>`;
  const url = `data:image/svg+xml;base64,${btoa(svg)}`;
  return url;
};
