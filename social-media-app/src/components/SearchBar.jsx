import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import axiosService from "../helpers/axios";


function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosService.get("/user/search/", {
        params: {
          search: searchText,
        },
      });
      // Handle the response data here
      console.log(response.data);
    } catch (error) {
      // Handle error here
      console.log(error);
    }
  };

  return (
    <Form className="my-3" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <FormControl
          type="text"
          placeholder="Search"
          className="py-2 rounded-pill border-primary text-primary"
          value={searchText}
          onChange={handleInputChange}
        />
        <div style={{ marginLeft: "10px" }}>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default SearchBar;