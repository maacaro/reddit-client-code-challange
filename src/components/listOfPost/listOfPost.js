import React from "react";
import "./listOfPost.css";

export const ListOfPost = ({ items }) => {
  const postItems = items.map(post => {
    const hoursAgo = Math.floor(
      (Date.now() - post.entryDate * 1000) / (60 * 60 * 1000)
    );
    return (
      <div key={post.id}>
        <div className="postHeader">
          <h3>{post.author}</h3>
          <div className="entryDate">{`${hoursAgo} hours ago`}</div>
        </div>
        <div className="postMain">
          <div className="thumbnail">
            <img src={post.thumbnailURL} alt="" />
          </div>
          <small>{post.title}</small>
        </div>
        <div className="numberOfComments">{`${
          post.numberOfComments
        } Comments`}</div>
        <hr />
      </div>
    );
  });
  return <ul className="listOfPost">{postItems}</ul>;
};
