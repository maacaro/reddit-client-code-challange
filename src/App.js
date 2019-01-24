import React, { Component } from "react";
import "./App.css";
import { ListOfPost } from "./components/listOfPost/listOfPost";
import { APIRequest } from "./API/api";
import { PostDetail } from "./components/postDetail/postDetail";

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
        <section style={{ marginLeft: "390px" }}>
          <PostDetail
            author="manuel"
            title="hola mundo"
            imageURL="https://a.thumbs.redditmedia.com/hq5ioY9NRF8zt4j6xmvy0TpvsGFmr7c6YX-09yN0V_0.jpg"
          />
        </section>
      </main>
    );
  }
}

export default App;

export const dismissPost = (postId, listOfPost) => {
  return listOfPost.filter(post => postId !== post.id);
};
