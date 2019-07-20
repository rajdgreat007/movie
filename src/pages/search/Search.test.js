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
    const defaultState = (SearchComponent.instance.defaultState = {
      gifs: mockImagesFn(),
      offset: 0,
      fetching: false,
      searchTerm: "happy",
      totalCount: 100
    });
    SearchComponent.setState(defaultState);
    expect(SearchComponent.state().gifs).toHaveLength(20);
  });
});
