import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import DBinformation from "../components/Dashboad/YearInformation";
import DBinformation2 from "../components/Dashboad/GeneralInformation";
import DBinformation3 from "../components/Dashboad/Numberofgoods";
import Address from "../components/Dashboad/GoogleMap";

const HomePage = () => {
  const socket = useRef<any>();
  const URL_ENV = process.env.REACT_APP_BASE_URL || "http://localhost:9000";

  console.log("««««« process.env »»»»»", process.env);
  useEffect(() => {
    socket.current = io(URL_ENV);
  }, [URL_ENV]);
  useEffect(() => {}, []);

  return (
    <div style={{ height: "auto", width: "auto" }}>
      <DBinformation />
      <DBinformation2 />
      <DBinformation3 />
      <Address />
    </div>
  );
};

export default HomePage;
