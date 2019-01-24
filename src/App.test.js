import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { dismissPost, selectPost } from "./App";
import { APIRequest } from "./API/api";
import { ListOfPost } from "./components/listOfPost/listOfPost";
import { PostDetail } from "./components/postDetail/postDetail";

jest.mock("./API/api");
const response = [
  {
    id: "2hqlxp",
    title: "Man trying to return a dog's toy gets tricked into playing fetch",
    author: "washedupwornout",
    entryDate: 1411946514,
    thumbnail:
      "http://b.thumbs.redditmedia.com/9N1f7UGKM5fPZydrsgbb4_SUyyLW7A27um1VOygY3LM.jpg",
    numberOfComments: 958,
    unreadStatus: false
  },
  {
    id: "2hozly",
    title:
      "The secret to raising well behaved teens? Maximise their sleep: While paediatricians warn sleep deprivation can stack the deck against teenagers, a new study reveals youth’s irritability and laziness aren’t down to attitude problems but lack of sleep",
    author: "mubukugrappa",
    entryDate: 1411908784,
    thumbnail: null,
    numberOfComments: 3740,
    unreadStatus: false
  }
];
APIRequest.mockImplementation(
  () => new Promise((resolve, reject) => resolve(response))
);
describe("App", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
  describe("Render", () => {
    it("should render a ListOfPost component", () => {
      const wrapper = shallow(<App />);

      expect(wrapper.find(ListOfPost)).toHaveLength(1);
    });
    it("should render a ListOfPost with the prop `dismissPost`", () => {
      const wrapper = shallow(<App />);

      expect(wrapper.find(ListOfPost)).toHaveProp("dismissPost");
    });
  });
  describe("behavior", () => {
    it("should remove from items the item with the post id passed to the dismissPost function", async () => {
      const wrapper = await shallow(<App />);
      expect(wrapper.find(ListOfPost)).toHaveProp("items", response);

      wrapper
        .find(ListOfPost)
        .props()
        .dismissPost(response[0].id);
      wrapper.update();

      expect(wrapper.find(ListOfPost)).toHaveProp("items", [response[1]]);
    });

    it("should display post detail at click on thumbnails button", async () => {
      const wrapper = await shallow(<App />);
      expect(wrapper.find(PostDetail)).toHaveLength(0);
    });

    it("should NOT display post detail at first", async () => {
      const wrapper = await shallow(<App />);
      wrapper
        .find(ListOfPost)
        .props()
        .displayDetail(response[0].id);
      expect(wrapper.find(PostDetail)).toHaveLength(1);
    });
  });
});

describe("dismissPost function", () => {
  it("should return an array without the dismissed post", () => {
    const postIdToRemove = "2hozly";
    const listOfPost = [
      {
        id: "2hqlxp",
        title:
          "Man trying to return a dog's toy gets tricked into playing fetch",
        author: "washedupwornout"
      },
      {
        id: "2hozly",
        title:
          "The secret to raising well behaved teens? Maximise their sleep: While paediatricians warn sleep deprivation can stack the deck against teenagers, a new study reveals youth’s irritability and laziness aren’t down to attitude problems but lack of sleep",
        author: "mubukugrappa"
      }
    ];
    const expectedRemaingPost = [
      {
        id: "2hqlxp",
        title:
          "Man trying to return a dog's toy gets tricked into playing fetch",
        author: "washedupwornout"
      }
    ];

    const remainingPosts = dismissPost(postIdToRemove, listOfPost);

    expect(expectedRemaingPost).toEqual(remainingPosts);
  });
});

describe("selectPost function", () => {
  it("should return the selected item from the array of object", () => {
    const posts = [
      { id: 1, foo: "bar" },
      { id: 2, foo: "bar2" },
      { id: 3, foo: "bar3" }
    ];
    const postID = 2;
    const selectedPost = selectPost(postID, posts);

    expect(selectedPost).toEqual({ id: 2, foo: "bar2" });
  });
});
