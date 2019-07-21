import React from "react";
import { shallow } from "enzyme";

import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const onSearchSubmit = jest.fn();
  const SearchBarComponent = shallow(
    <SearchBar onSearchSubmit={onSearchSubmit} />
  );

  it("should render search bar component", () => {
    expect(SearchBarComponent.exists).toBeTruthy();
  });

  it("should render search input box", () => {
    expect(SearchBarComponent.find("input")).toHaveLength(1);
  });

  it("should update text in input box when user types", () => {
    const searchText = "happy";
    SearchBarComponent.find("input").simulate("change", {
      target: { value: searchText }
    });
    expect(SearchBarComponent.state().searchTerm).toEqual(searchText);
  });

  it("should render search button", () => {
    expect(SearchBarComponent.find("button")).toHaveLength(1);
  });

  it("calls props.onSearchSubmit when the form is submitted", () => {
    SearchBarComponent.instance().onFormSubmit({ preventDefault: jest.fn() });
    expect(onSearchSubmit).toHaveBeenCalled();
  });

  it("resets the value of searchTerm in state when input is clicked", () => {
    SearchBarComponent.find(".SearchInput").simulate("click");
    expect(SearchBarComponent.state().searchTerm).toEqual("");
  });
});
