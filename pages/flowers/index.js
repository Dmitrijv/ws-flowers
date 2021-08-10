import Head from "next/head";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

import { FlowerContext } from "./../contexts/FlowerContext";

export default function FlowersList() {
  const { flowersById } = useContext(FlowerContext);

  if (!flowersById || Object.values(flowersById).length === 0) return <></>;

  return (
    <>
      {/* Head */}
      <Head>
        <title>Dmitrij V. - W&S Interview Task</title>
        <meta name="description" content="Made in Sweden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Content */}
      <h1>{Object.values(flowersById).length} flowers on this list</h1>
      <ul>
        {Object.values(flowersById).map((flower) => {
          return (
            <li key={`fli-` + flower["ws_id"]}>
              <Link href={`/flowers/${flower["ws_id"]}`}>{flower.common_name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
