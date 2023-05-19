import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const Address = () => {
  // Setup Map Marker
  const [Markers, setMarker] = useState<any>({
    name: "Current position",
    position: {
      lat: 37.77,
      lng: -122.42,
    },
  });

  // Define the position for the marker
  const markerPosition = {
    lat: 10.762622, // Replace with the desired latitude
    lng: 106.660172, // Replace with the desired longitude
  };

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: markerPosition,
      map,
      title: "Hello World!",
    });
    return marker;
  };

  return (
    <div className="Address">
      {/* Delivery Section  */}
      <div className="delivery active">
        Vị trí khách hàng đã đặt hàng
        <div style={{ height: "50vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "YOUR_GOOGLE_MAPS_API_KEY",
            }}
            defaultCenter={markerPosition}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
