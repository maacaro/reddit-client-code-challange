import React from "react";
import { PostDetail } from "./postDetail";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <PostDetail title="Post title" imageURL="url" author="Manuel Castro" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
