import React from "react";
import { imageURL } from "../helpers/helper";
import PlaceHolderPoster from "../assets/images/placeholder_for_missing_posters.png";

const MovieItem = ({ items }) => {
  // Function to handle error when image fails to load
  const handleImageError = (event) => {
    event.target.onerror = null; // Prevent infinite loop
    event.target.src = PlaceHolderPoster; // Replace with the path to your placeholder image
    event.target.alt = "Default Image"; // Alternative text for the missing image
  };
  return (
    <div className="flex flex-wrap mt-16">
      {items &&
        items.length > 0 &&
        items.map((item, index) => {
          return (
            <div className="p-3 basis-4/12" key={index}>
              <img
                src={`${imageURL}${item?.["poster-image"]}`}
                alt="Poster"
                onError={handleImageError}
                style={{ objectFit: "cover" }}
              />
              <div className="font-extralight mt-2"> {item.name} </div>
            </div>
          );
        })}
      {items && items.length === 0 ? (
        <div className="p-3">"No Results Found"</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieItem;
