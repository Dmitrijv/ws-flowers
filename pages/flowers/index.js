import Head from "next/head";
import React from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";

export default function FlowersList({ flowers }) {
  if (!flowers || flowers.length === 0) return <></>;

  return (
    <>
      {/* Head */}
      <Head>
        <title>Dmitrij V. - W&S Interview Task</title>
        <meta name="description" content="Made in Sweden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Content */}
      <h1>{flowers.length} flowers on this list</h1>
      <ul>
        {flowers.map((flower, index) => {
          return (
            <li key={`fli-` + index}>
              <Link href={`/flowers/${index}`}>{flower.common_name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://flowers-mock-data.firebaseio.com/flowers.json");
  const flowers = await res.json();

  return {
    props: { flowers: flowers },
  };
}
