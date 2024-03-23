import React, { useEffect, useState } from "react";
import "./Map.css";

import ReactMapGl, {
  FlyToInterpolator,
  Marker,
} from "react-map-gl";

const MapContainer = ({ setIsMapVisible, mapSelectedFor = null, productData = null, setProductData = null, markers = [] }) => {
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: 19.236988,
    longitude: 72.846595,
    width: "100%",
    height: "100%",
    zoom: 14,
  });

  const handleMapClicked = (e) => {
    e.stopPropagation()
  }

  const handleSelectLocation = () => {
    if (productData) {
      let data = {
        ...productData,
        [mapSelectedFor]: {
          latitude: viewport.latitude,
          longitude: viewport.longitude
        }
      }

      setProductData(data)
      setIsMapVisible(false)
    }

  }

  useEffect(() => {
    console.log("Setting initial Location")
    setLoading(true)
    if (markers.length > 0) {
      const tempViewport = {
        ...viewport,
        ...markers[0]
      }
      setViewport(tempViewport)
      console.log("Initial Location set to Pickup location")
      console.log(tempViewport)
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location) => {
          const tempViewport = {
            ...viewport,
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude
          }
          console.log("Initial Location set to Current Location")
          setViewport(tempViewport)
          console.log(tempViewport)

        }, () => {
          console.log("Geolocation Error!!!")
        });
      } else {
        console.log("Geolocation not supported");
      }
    }
    setLoading(false)
  }, [])

  return (
    <div className='h-full w-full bg-black/75 z-10 absolute top-0 left-0' onClick={() => setIsMapVisible(false)}>
      <div className='fixed top-[10%] left-[10%] w-[80%] h-[80%] bg-blue-300 rounded-md shadow-2xl' onClick={(e) => handleMapClicked(e)}>
        {
          !loading ?
            <Map viewport={viewport} setViewport={setViewport} mapForSettingLocation={productData ? true : false} markers={markers} /> : <p>Loading</p>
        }
        {
          productData && (
            <button
              onClick={handleSelectLocation}
              className='class="w-max mt-4 ml-auto flex flex-end bg-[#fe100e] border-none text-white shadow-sm rounded-md border px-4 py-2 text-sm font-medium focus:relative"'
            >Select Location</button>
          )
        }
      </div>
    </div>
  )
}

// viewport is for center marker
const Map = ({ viewport, setViewport, mapForSettingLocation, markers }) => {
  console.log(markers)
  const accessToken =
    "pk.eyJ1IjoibWl0ZWoyMyIsImEiOiJja3N3emFwYWYyNTJ6MnFuMXUwajB5NWZyIn0.U0RbP_BIA9AXV1rjPQ8YqA";

  const handleViewPortChange = (viewport) => {
    setViewport(viewport)
  }

  const handleGoToMarker = (location) => {
    if (location === 'pickupLocation') {
      setViewport({
        ...viewport,
        ...markers[0],
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
      })
    } else {
      setViewport({
        ...viewport,
        ...markers[1],
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
      })
    }
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
        {/* Center Maker */}
        {
          mapForSettingLocation && (
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
          )
        }
        {
          markers.map((marker) =>
            <Marker
              latitude={marker.latitude}
              longitude={marker.longitude}
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
          )
        }
        {/* go to marker labels */}
        {
          markers.length > 0 && (
            <div className="mt-4 ml-4">
              <div onClick={() => handleGoToMarker('pickupLocation')} className="flex flex-row justify-center items-center  bg-gray-800/30 p-[0.375rem] w-max text-xs rounded-sm hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 stroke-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className="flex items-center text-xs group text-white ml-1 mb-[-1px]">
                  Pickup
                  <span className='hidden group-hover:block ml-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </p>
              </div>
              <div onClick={() => handleGoToMarker('dropLocation')} className="flex flex-row justify-center items-center  bg-gray-800/30 p-[0.375rem] w-max text-xs rounded-sm hover:cursor-pointer mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 stroke-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className="flex items-center text-xs group text-white ml-1 mb-[-1px]">
                  Drop
                  <span className='hidden group-hover:block ml-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          )
        }

      </ReactMapGl>
    </div>
  );
};

export default MapContainer;
