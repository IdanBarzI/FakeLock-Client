import React, { useContext, useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import AppContext from "../../../context/AppContext";

const Map = () => {
    const {user, setUser} = useContext(AppContext);
    //const [latitude, setLatitude] = useState(() => user.latitude);
    //const [longtitude, setLongtitude] = useState(() => user.longtitude);
    const [latitude, setLatitude] = useState(() => 31.76);
    const [longtitude, setLongtitude] = useState(() => 35.21); //jerusalem coords, for now
    const [zoom, setZoom] = useState(() => 11);
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDTZivr0tn0CXiDE1jxKwoGDSKgHhnsAxo" }} //Actual key!
          defaultCenter={[latitude, longtitude]}
          defaultZoom={zoom}
          >
        </GoogleMapReact>
      </div>
    );
};
export default Map;
