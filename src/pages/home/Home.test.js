import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home Component", () => {
  const HomeComponent = shallow(<Home />);

  it("renders home component", () => {
    expect(HomeComponent.hasClass("Home")).toEqual(true);
  });

  it("renders header", () => {
    expect(HomeComponent.find("header")).toHaveLength(1);
  });

  it("renders logo", () => {
    expect(HomeComponent.find("img").hasClass("Logo")).toEqual(true);
  });

  it("renders search bar", () => {
    expect(HomeComponent.find("SearchBar")).toHaveLength(1);
  });

  it("renders a Redirect if redirect key is set to true in state", () => {
    HomeComponent.setState({ redirect: true });
    expect(HomeComponent.find("Redirect")).toHaveLength(1);
  });

  it("sets redirect flag to true in state when onSearchSubmit is called", () => {
    HomeComponent.instance().onSearchSubmit("happy");
    expect(HomeComponent.state().redirect).toEqual(true);
  });
});
