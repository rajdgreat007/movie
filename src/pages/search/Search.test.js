import React from "react";
import { mount } from "enzyme";

import Search from "./Search";
import mockImagesFn from "../../mock/images";

describe("Search Component", () => {
  const SearchComponent = mount(
    <Search match={{ params: { searchTerm: "" }, isExact: true }} />
  );
  SearchComponent.instance.containerRef = React.createRef();

  it("renders search component", () => {
    expect(SearchComponent.exists()).toBeTruthy();
    expect(SearchComponent.instance().containerRef).toBeTruthy();
  });

  it("renders search bar component", () => {
    expect(SearchComponent.find("SearchBar")).toHaveLength(1);
  });

  it("renders wrapper for gifs", () => {
    expect(SearchComponent.find(".Gifs")).toHaveLength(1);
  });

  it("renders mock images", () => {
    const defaultState = {
      gifs: mockImagesFn(),
      offset: 0,
      fetching: false,
      searchTerm: "happy",
      totalCount: 100
    };
    SearchComponent.instance.defaultState = defaultState;
    SearchComponent.setState(defaultState);
    expect(SearchComponent.state().gifs).toHaveLength(20);
  });

  it("sets state with mock data when setStateWithMockData function is called", () => {
    SearchComponent.setState({ gifs: [] });
    SearchComponent.instance().setStateWithMockData();
    expect(SearchComponent.state().gifs).toHaveLength(20);
  });

  it("sets search text correctly when user clicks back button (onpopstate event)", () => {
    const searchTerm = "happy";
    const event = { state: { searchTerm } };
    global.window.onpopstate(event);
    expect(SearchComponent.state().searchTerm).toEqual(searchTerm);
  });

  it("sets fetching to true in state when scroll event callback is called", () => {
    SearchComponent.instance().handleScroll();
    expect(SearchComponent.state().fetching).toEqual(true);
  });

  it("sets searchTerm in state correctly when onSearchSubmit is called", () => {
    const searchTerm = "happy";
    SearchComponent.instance().onSearchSubmit(searchTerm);
    expect(SearchComponent.state().searchTerm).toEqual(searchTerm);
  });
});
