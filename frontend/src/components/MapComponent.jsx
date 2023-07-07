import { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, Polyline } from '@react-google-maps/api';
import dot from '/dot-red.png'
import styles from './MapComponent.module.css';
import ShipIcon from './ShipIcon';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const zoom = 13;

const customMapStyle = [
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 13
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#144b53"
      },
      {
        "lightness": 14
      },
      {
        "weight": 1.4
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#08304b"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0c4152"
      },
      {
        "lightness": 5
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#0b434f"
      },
      {
        "lightness": 25
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#0b3d51"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "color": "#146474"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#021019"
      }
    ]
  }
]

const mapOptions = {
  styles: customMapStyle,
  disableDefaultUI: true,
};



const MapComponent = ({ center, ships, locations }) => {

  const [markerOpacity, setMarkerOpacity] = useState(0.7);

  useEffect(() => {
    // update marker opacity every 1 second
    const interval = setInterval(() => {
      setMarkerOpacity(markerOpacity => (markerOpacity === 0.7 ? 1 : 0.7));
    }
    , 1000);

    return () => clearInterval(interval);
  }, []);

  const markerOptions = {
    position: center,
    icon: dot,
    clickable: false,
    opacity: markerOpacity,
  };

  const seabusMarkers = ships.map(({data}, index) => {

    if (!data) {
      return null;
    }

    const icon = {
      url: ShipIcon(data),
      scaledSize: new window.google.maps.Size(16, 16),
    }

    return (
      <MarkerF
        key={index}
        position={{ lat: Number(data.latitude), lng: Number(data.longitude) }}
        icon={icon}
        clickable={false}
      />
    )
  });

  return (
    <div className={styles.map}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} options={mapOptions}>
        <MarkerF key="sydney" options={markerOptions} />
        <Polyline
          path={locations.map(location => ({
            lat: Number(location.lat),
            lng: Number(location.lng),
          }))}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            clickable: false,
          }}
        />
        {seabusMarkers}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
