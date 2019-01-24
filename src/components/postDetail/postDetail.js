import React from "react";

export const PostDetail = ({ title, imageURL, author }) => {
  return (
    <div>
      <h3>{author}</h3>
      <img src={imageURL} alt="" />
      <p>{title}</p>
    </div>
  );
};
