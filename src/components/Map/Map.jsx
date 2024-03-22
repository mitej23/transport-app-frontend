import React, { useState } from "react";
import "./Map.css";

import ReactMapGl, {
  Marker,
} from "react-map-gl";


const Map = ({ viewport, setViewport }) => {
  const accessToken =
    "pk.eyJ1IjoibWl0ZWoyMyIsImEiOiJja3N3emFwYWYyNTJ6MnFuMXUwajB5NWZyIn0.U0RbP_BIA9AXV1rjPQ8YqA";

  const handleViewPortChange = (viewport) => {
    setViewport(viewport)
  }

  return (
    <div className="Map">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => handleViewPortChange(viewport)}
      >
        {/* <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        /> */}
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetLeft={-10}
          offsetTop={-34}
        >
          <div>
            <svg
              width="20"
              height="34"
              viewBox="0 0 10 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="5" cy="5.00009" rx="5" ry="5.00009" fill="black" />
              <circle cx="4.99998" cy="5.00001" r="1.66667" fill="white" />
              <line
                x1="5.125"
                y1="9.99942"
                x2="5.16779"
                y2="16.9992"
                stroke="black"
                stroke-width="0.25"
              />
            </svg>
          </div>
        </Marker>
      </ReactMapGl>
    </div>
  );
};

export default Map;
