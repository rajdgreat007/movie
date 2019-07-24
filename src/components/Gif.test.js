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

  it("should update rows in state after image is rendered", () => {
    expect(GifComponent.state().rows).toEqual(0);
  });

  it("sets image data-grifffer attribute when passed through props", () => {
    const imgSrc = "www.abc.com/awesome.gif";
    GifComponent.setProps({ src: imgSrc });
    expect(GifComponent.find("img").prop("data-gifffer")).toEqual(imgSrc);
  });
});
