import { useState, useEffect } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import dot from '/dot-red.png'
import styles from './MapComponent.module.css';

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



const MapComponent = ({ center }) => {

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

  return (
    <div className={styles.map}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom} options={mapOptions}>
        <MarkerF options={markerOptions} />
        {/* <MarkerF position={center} /> */}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
