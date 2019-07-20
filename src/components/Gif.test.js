import React from "react";
import { mount } from "enzyme";

import Gif from "./Gif";

describe("Gif Component", () => {
  const GifComponent = mount(<Gif />);
  GifComponent.instance.imageRef = React.createRef();

  it("should render gif component", () => {
    expect(GifComponent.exists).toBeTruthy();
  });

  it("should render an image", () => {
    expect(GifComponent.find("img")).toHaveLength(1);
  });

  it("sets image src when passed through props", () => {
    const imgSrc = "www.abc.com/awesome.gif";
    GifComponent.setProps({ src: imgSrc });
    expect(GifComponent.find("img").prop("src")).toEqual(imgSrc);
  });
});
