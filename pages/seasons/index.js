import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Seasons({ flowers = [] }) {
  const [filteredFlowers, setFilteredFlowers] = useState(flowers);
  const [filter, setFilter] = useState("winter");

  useEffect(() => {
    console.log({ flowers });
    const f = flowers.filter((f) => f.blooming_season.toLowerCase().includes(filter));
    setFilteredFlowers(f);
  }, [filter]);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      {/* Head */}
      <Head>
        <title>Seasons</title>
        <meta name="description" content="Made in Sweden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header>
        <div className="container">
          <h1>
            Dmitrij Velström<span className="desktop-only"> - W&S Task</span>
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="seasons-container">
        <div className="seasons-grid">
          {/* Winter */}
          <div className={"season winter" + (filter == "winter" ? " active" : "")}>
            <h2 className="text-center">Winter</h2>
            <img src={"/png/winter.png"} className="season-image clickable" onClick={() => setFilter("winter")} />
          </div>
          {/* Spring */}
          <div className={"season spring" + (filter == "spring" ? " active" : "")}>
            <h2 className="text-center">Spring</h2>
            <img src={"/png/spring.png"} className="season-image clickable" onClick={() => setFilter("spring")} />
          </div>
          {/* Summer */}
          <div className={"season summer" + (filter == "summer" ? " active" : "")}>
            <h2 className="text-center">Summer</h2>
            <img src={"/png/summer.png"} className="season-image clickable" onClick={() => setFilter("summer")} />
          </div>
          {/* Autumn */}
          <div className={"season autumn" + (filter == "autumn" ? " active" : "")}>
            <h2 className="text-center">Autumn</h2>
            <img src={"/png/autumn.png"} className="season-image clickable" onClick={() => setFilter("autumn")} />
          </div>
        </div>

        <div className="filtered-list">
          <h2>
            {filteredFlowers.length} flowers bloom in {capitalize(filter)}
          </h2>

          <table className="result-table">
            <tr>
              <th className="text-left">
                <b>Flower</b>
              </th>
              <th className="text-left">
                <b>Blooming Season</b>
              </th>
            </tr>
            {filteredFlowers
              .sort((a, b) => a.blooming_season < b.blooming_season)
              .map((f, index) => {
                return (
                  <tr key={`flower-row-` + index}>
                    <td>
                      <Link href={`/flowers/${f["ws_id"]}`}>{f.common_name}</Link>
                    </td>
                    <td>{f.blooming_season}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </main>
      <div className="gallery-link">
        <Link href={`/flowers`}>← Back to gallery</Link>{" "}
      </div>
      <div className="fluff"></div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://flowers-mock-data.firebaseio.com/flowers.json");
  let flowers = await res.json();
  flowers = flowers.map((f, index) => {
    f["ws_id"] = index;
    return f;
  });

  return {
    props: { flowers: flowers },
  };
}
