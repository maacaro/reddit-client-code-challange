import React from "react";

export const ListOfPost = ({ items }) => {
  const postItems = items.map(post => {
    const hoursAgo = Math.floor(
      (Date.now() - post.entryDate * 1000) / (60 * 60 * 1000)
    );
    return (
      <div key={post.id}>
        <h3>{post.author}</h3>
        <small>{post.title}</small>
        <div className="thumbnail">
          <img src={post.thumbnailURL} alt="" />
        </div>
        <div>
          <div className="entryDate">{`${hoursAgo} hours ago`}</div>
        </div>
        <div className="numberOfComments">{`${
          post.numberOfComments
        } Comments`}</div>
      </div>
    );
  });
  return <ul>{postItems}</ul>;
};
