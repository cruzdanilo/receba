'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import ReactMap, { Marker } from 'react-map-gl/maplibre';

export default function Map() {
  return (
    <ReactMap
      style={{ height: '100vh', width: '100%' }}
      initialViewState={{ latitude: 37.8, longitude: -122.4, zoom: 14 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </ReactMap>
  );
}
