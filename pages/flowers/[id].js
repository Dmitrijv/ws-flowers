import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import CommentKit from "../data/CommentKit";
import FlowerChat from "../components/FlowerChat";
import FlowerAbout from "../components/FlowerAbout";

export default function Flower({ flower, flowerId, comments }) {
  return (
    <>
      {/* Head */}
      <Head>
        <title>Flower: {flower?.common_name}</title>
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
      <main className="flower-container">
        <div className="flower-about">
          <FlowerAbout flower={flower}></FlowerAbout>
        </div>

        <div className="gallery-link">
          <Link href={`/flowers`}>← Back to gallery</Link>{" "}
        </div>

        <div className="flower-chat">
          <FlowerChat flowerId={flowerId} comments={comments}></FlowerChat>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const commentKit = new CommentKit();

  let res = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${params.id}.json`);
  const flower = await res.json();

  const comments = await commentKit.getComments(params.id);

  return {
    props: { flower: flower, flowerId: params.id, comments: comments },
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://flowers-mock-data.firebaseio.com/flowers.json");
  const flowers = await res.json();

  const paths = flowers.map((_, index) => ({
    params: { id: index.toString() },
  }));

  return { paths, fallback: false };
}
