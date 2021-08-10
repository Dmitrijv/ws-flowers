import Head from "next/head";
import Router from "next/router";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";

import { FlowerContext } from "../contexts/FlowerContext";

export default function Flower() {
  const router = useRouter();
  const id = router.query["id"] || router.asPath.match(new RegExp(`[&?]id=(.*)(&|$)`)); // wtf?
  const { flowersById } = useContext(FlowerContext);
  const [flower, setFlower] = useState(null);

  useEffect(() => {
    if (flowersById[id]) {
      setFlower(flowersById[id]);
    } else if (id) {
      fetch(`https://flowers-mock-data.firebaseio.com/flowers/${id}.json`)
        .then((res) => res.json())
        .then((data) => {
          setFlower(data);
        });
    }
  }, []);

  return (
    <>
      {/* Head */}
      <Head>
        <title>{flower?.common_name}</title>
        <meta name="description" content="Made in Sweden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Content */}
      <h1>{flower?.common_name}</h1>
    </>
  );
}
