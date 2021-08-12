import Head from "next/head";
import React from "react";
import Link from "next/link";
import Masonry from "react-masonry-css";

export default function FlowersList({ flowers }) {
  const breakpoints = {
    default: 3,
    1100: 2,
    800: 2,
    700: 1,
  };

  if (!flowers || flowers.length === 0) return <></>;

  function getSeasonClass(flower) {
    const season = flower?.blooming_season.toLowerCase();
    if (season.includes("winter")) return "winter";
    if (season.includes("spring")) return "spring";
    if (season.includes("summer")) return "summer";
    if (season.includes("fall") || season.includes("autumn")) return "autumn";
    return "";
  }

  return (
    <>
      {/* Head */}
      <Head>
        <title>Dmitrij V. - W&S Task</title>
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
      <main className="flowers-container">
        <Masonry breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {flowers.map((flower, index) => {
            return (
              <div className="clickable" key={`fli-` + index}>
                <Link href={`/flowers/${index}`}>
                  <div className={"flower-card " + getSeasonClass(flower)}>
                    <img src={flower?.cover_image || "/png/default.png"} alt="Flower." className={"flower-image"} />
                    <h2 className="flower-name">
                      {flower?.sun && <span>☀️</span>} {flower?.common_name}
                    </h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </Masonry>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://flowers-mock-data.firebaseio.com/flowers.json");
  let flowers = await res.json();

  return {
    props: { flowers: flowers },
  };
}
