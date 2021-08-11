import Head from "next/head";
import Link from "next/link";

export default function Flower({ flower }) {
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

export async function getStaticProps({ params }) {
  const res = await fetch(`https://flowers-mock-data.firebaseio.com/flowers/${params.id}.json`);
  const flower = await res.json();

  return {
    props: { flower: flower },
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
