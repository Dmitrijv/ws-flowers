import React from "react";

export default function FlowerAbout({ flower }) {
  function getSoilHtml(flower) {
    return { __html: flower?.soil.map((s) => `<strong>${s}</strong>`).join(", ") };
  }

  return (
    <>
      <div className="titles">
        <h2>{flower?.latin_name}</h2>
        <h1>{flower?.common_name}</h1>
      </div>
      <img src={flower?.cover_image || "/png/default.png"} alt="Flower." className="flower-image" />
      {/* Notes */}
      <p className="notes">{flower?.notes}</p>
      {/* Details */}
      <div className="details">
        {/* Soil */}
        <p>
          Prefers <span dangerouslySetInnerHTML={getSoilHtml(flower)} /> soil
        </p>
        {/* Sun */}
        {flower?.sun && (
          <p>
            Thrives under the <strong>sun</strong>
          </p>
        )}
        {/* Blooming season */}
        {flower?.blooming_season && (
          <p>
            Blooming season is <strong>{flower?.blooming_season}</strong>
          </p>
        )}
        {/* Blooming height */}
        {flower?.height && (
          <p>
            Average <strong>height</strong> is between {flower?.height[0]?.numberInt || "??"} and{" "}
            {flower?.height[1]?.numberInt || "??"} cm
          </p>
        )}
        {/* Blooming spacing */}
        {flower?.spacing && (
          <p>
            Ideal <strong>spacing</strong> is {flower?.spacing.numberInt} cm
          </p>
        )}
      </div>
    </>
  );
}
