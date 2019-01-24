import React, { Component } from "react";
import "./App.css";
import { ListOfPost } from "./components/listOfPost/listOfPost";
import { APIRequest } from "./API/api";
import { PostDetail } from "./components/postDetail/postDetail";

class App extends Component {
  state = {
    posts: [],
    selectedPost: null
  };

  componentDidMount = async () => {
    const posts = await APIRequest();
    this.setState({ posts });
  };

  render() {
    const { posts, selectedPost } = this.state;
    const postDetail =
      (selectedPost && (
        <PostDetail
          author={selectedPost.author}
          title={selectedPost.title}
          imageURL={selectedPost.thumbnailURL}
        />
      )) ||
      null;
    return (
      <main>
        <aside>
          <ListOfPost
            items={posts}
            dismissPost={postId => {
              this.setState({ posts: dismissPost(postId, posts) });
            }}
            displayDetail={postId => {
              this.setState({ selectedPost: selectPost(postId, posts) });
            }}
          />
        </aside>
        <section style={{ marginLeft: "390px" }}>{postDetail}</section>
      </main>
    );
  }
}

export default App;

export const dismissPost = (postId, listOfPost) => {
  return listOfPost.filter(post => postId !== post.id);
};

export const selectPost = (postId, listOfPost) => {
  return listOfPost.reduce((acum, post) => {
    if (postId === post.id) return post;
    return acum;
  }, {});
  // this.setState({ selectedPost: { title, author, imageURL } });
};
