import React from "react";
import { shallow } from "enzyme";
import { ListOfPost } from "./listOfPost";

describe("ListOfPost Component", () => {
  it("should render as many post as items have the item prop", () => {
    const oneItem = [{ foo: "bar", id: "1" }];
    const twoItems = [{ foo: "bar", id: "2" }, { foo: "bar", id: "1" }];
    const fiveItems = [
      { foo: "bar", id: "1" },
      { foo: "bar", id: "2" },
      { foo: "bar", id: "3" },
      { foo: "bar", id: "4" },
      { foo: "bar", id: "5" }
    ];

    const wrapper = shallow(<ListOfPost items={oneItem} />);
    const wrapperForTwoItems = shallow(<ListOfPost items={twoItems} />);
    const wrapperForFiveItems = shallow(<ListOfPost items={fiveItems} />);

    expect(wrapper.find("ul").children()).toHaveLength(oneItem.length);
    expect(wrapperForTwoItems.find("ul").children()).toHaveLength(
      twoItems.length
    );
    expect(wrapperForFiveItems.find("ul").children()).toHaveLength(
      fiveItems.length
    );
  });
  describe("Post Item", () => {
    it("should render the author", () => {
      const items = [{ id: 1, author: "Manuel Castro" }];

      const wrapper = shallow(<ListOfPost items={items} />);

      expect(
        wrapper
          .find("ul")
          .childAt(0)
          .find("h3")
      ).toHaveText("Manuel Castro");
    });

    it("should render the post title", () => {
      const items = [{ id: 1, title: "post title" }];

      const wrapper = shallow(<ListOfPost items={items} />);

      expect(
        wrapper
          .find("ul")
          .childAt(0)
          .find("small")
      ).toHaveText("post title");
    });

    it("should render a thumbnail", () => {
      const items = [{ id: 1, thumbnailURL: "URL" }];

      const wrapper = shallow(<ListOfPost items={items} />);

      expect(
        wrapper
          .find("ul")
          .childAt(0)
          .find(".thumbnail")
          .childAt(0)
          .find("img")
      ).toHaveProp("src", items[0].thumbnailURL);
    });

    it("should render the `entry date`", () => {
      Date.now = jest.fn(() => new Date(Date.UTC(2019, 1, 23, 8)).valueOf());
      const items = [{ id: 1, entryDate: 1548022476 }];

      const wrapper = shallow(<ListOfPost items={items} />);

      expect(
        wrapper
          .find("ul")
          .childAt(0)
          .find(".entryDate")
      ).toHaveText("801 hours ago");
    });

    it("should render the `Number of comments`", () => {
      const items = [{ id: 1, numberOfComments: 2517 }];

      const wrapper = shallow(<ListOfPost items={items} />);

      expect(
        wrapper
          .find("ul")
          .childAt(0)
          .find(".numberOfComments")
      ).toHaveText("2517 Comments");
    });
    describe("Dismiss Post Button", () => {
      it("should call the function removePost at on click", () => {
        const dismissPost = jest.fn(() => null);
        const items = [{ id: 1, numberOfComments: 2517 }];

        const wrapper = shallow(
          <ListOfPost dismissPost={dismissPost} items={items} />
        );
        const dismissButton = wrapper
          .find("ul")
          .childAt(0)
          .find("#dismissButton");
        dismissButton.simulate("click");

        expect(dismissPost).toBeCalledTimes(1);
      });
      it("should call the function removePost at on click with the correct argument", () => {
        const dismissPost = jest.fn(() => null);
        const items = [{ id: "idPost", numberOfComments: 2517 }];

        const wrapper = shallow(
          <ListOfPost dismissPost={dismissPost} items={items} />
        );
        const dismissButton = wrapper
          .find("ul")
          .childAt(0)
          .find("#dismissButton");
        dismissButton.simulate("click");

        expect(dismissPost).toHaveBeenCalledWith("idPost");
      });
    });
  });
});
