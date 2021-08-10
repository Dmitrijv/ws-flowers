import React, { useState, useEffect } from "react";
import "../styles/globals.css";

import { FlowerContext } from "./contexts/FlowerContext";

function MyApp({ Component, pageProps }) {
  const [flowersById, setFlowersById] = useState({});

  useEffect(() => {
    fetch("https://flowers-mock-data.firebaseio.com/flowers.json")
      .then((res) => res.json())
      .then((data) => {
        const fbi = data.reduce((cache, flower, index) => {
          flower["ws_id"] = index;
          cache[index] = flower;
          return cache;
        }, {});
        setFlowersById(fbi);
      });
  }, []);

  return (
    <FlowerContext.Provider value={{ flowersById }}>
      <Component {...pageProps} />
    </FlowerContext.Provider>
  );
}

export default MyApp;
