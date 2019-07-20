import React from "react";
import { shallow } from "enzyme";

import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const SearchBarComponent = shallow(<SearchBar />);

  it("should render search bar component", () => {
    expect(SearchBarComponent.exists).toBeTruthy();
  });

  it("should render search input box", () => {
    expect(SearchBarComponent.find("input")).toHaveLength(1);
  });

  it("should render search button", () => {
    expect(SearchBarComponent.find("button")).toHaveLength(1);
  });
});
