import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import YearInformation from "../components/Dashboad/YearInformation";
import GeneralInformation from "../components/Dashboad/GeneralInformation";
import Numberofgoods from "../components/Dashboad/Numberofgoods";
import Address from "../components/Dashboad/GoogleMap";

const HomePage = () => {
  const socket = useRef<any>();
  const URL_ENV = process.env.REACT_APP_BASE_URL || "http://localhost:9000";

  useEffect(() => {
    socket.current = io(URL_ENV);
  }, [URL_ENV]);
  useEffect(() => {}, []);

  return (
    <div style={{ height: "auto", width: "auto" }}>
      <YearInformation />
      <GeneralInformation />
      <Numberofgoods />
      <Address />
    </div>
  );
};

export default HomePage;
