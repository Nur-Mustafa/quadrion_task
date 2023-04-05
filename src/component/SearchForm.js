import React, { useState } from "react";
import { Button } from "react-bootstrap";


const SearchForm = ({setUserData }) => {
  
  // search state

  const [value, setValue] = useState("");

  //sort state
  const [sortValue, setSortValue] = useState("");

  const sortOption = ["userName", "email", "status"];


  // search handle function
  const searchHandle = (event) => {
    event.preventDefault();
   fetch(`http://localhost:3030/users?q=${value}`)
   .then((res)=>res.json())
      .then((data) => {
        setUserData(data);
        setValue("");
      })
      .catch((err) => console.log(err.message));
  };

  //----sort data function
  const handleSort = (e) => {
    let value=e.target.value;
    setSortValue(value)
   fetch(`http://localhost:3030/users?_sort=${value}&_order=asc`)
   .then((res)=>res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="border p-4 my-4 bg-secondary bg-opacity-25 d-flex flex-column justify-content-md-between  justify-content-lg-evenly flex-lg-row">
      <form onSubmit={searchHandle} className="d-flex flex-lg-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          
          placeholder="User Name"
          className="m-2 form-control"
        />
       
        <Button variant="outline-primary" className="m-2" type="submit">
          Search
        </Button>{" "}
      </form>

       {/* -------sort ----- */}

       <div className="d-flex flex-row">
        <h5 className="me-2">Sort by: </h5>
        <select
        
          style={{  borderRadius: "2px", height: "35px" }}
          onChange={handleSort}
          value={sortValue}
        >
          <option>Select option</option>
          {sortOption.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchForm;
