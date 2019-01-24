import React from "react";
import "./listOfPost.css";

export const ListOfPost = ({ dismissPost, items }) => {
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
          <div
            className="thumbnail"
            style={{
              background: `url(${post.thumbnailURL}) 50% 50% no-repeat`
            }}
          >
            <button />
          </div>
          <small>{post.title}</small>
        </div>
        <div className="footerPost">
          <button id="dismissButton" onClick={() => dismissPost(post.id)}>
            <i
              className="fa fa-times-circle-o"
              style={{
                fontSize: "large",
                color: "#FFA500",
                marginRight: "10px"
              }}
            />
            Dismiss Post
          </button>
          <div className="numberOfComments">{`${
            post.numberOfComments
          } Comments`}</div>
        </div>
        <hr />
      </div>
    );
  });
  return <ul className="listOfPost">{postItems}</ul>;
};
