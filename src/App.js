import React, { Component } from "react";
import "./App.css";
import { ListOfPost } from "./components/listOfPost/listOfPost";
import { APIRequest } from "./API/api";

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount = async () => {
    const posts = await APIRequest();
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;
    return (
      <main>
        <aside>
          <ListOfPost
            items={posts}
            dismissPost={postId => {
              this.setState({ posts: dismissPost(postId, posts) });
            }}
          />
        </aside>
      </main>
    );
  }
}

export default App;

export const dismissPost = (postId, listOfPost) => {
  return listOfPost.filter(post => postId !== post.id);
};
