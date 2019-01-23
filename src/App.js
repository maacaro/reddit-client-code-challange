import React, { Component } from "react";
import "./App.css";
import { ListOfPost } from "./components/listOfPost/listOfPost";

class App extends Component {
  render() {
    const items = [
      {
        id: 1,
        author: "Manuel Castro",
        title: "My test Post",
        thumbnailURL:
          "https://a.thumbs.redditmedia.com/hq5ioY9NRF8zt4j6xmvy0TpvsGFmr7c6YX-09yN0V_0.jpg",
        entryDate: 1548022476,
        numberOfComments: 2517
      }
    ];
    return (
      <main>
        <aside>
          <ListOfPost items={items} />
        </aside>
      </main>
    );
  }
}

export default App;
