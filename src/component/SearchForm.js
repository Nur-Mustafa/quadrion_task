import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const SearchForm = ({setSearch}) => {
    // search
  const [searchUserName, setSearchUserName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const searchHandle = (event) => {
    event.preventDefault();
    setSearch({
      userName: searchUserName,
      email: searchEmail,
      status: searchStatus,
    })
  };
    return (
        <div>
             <form onSubmit={searchHandle} className=" d-flex flex-column flex-lg-row">
        <input
          value={searchUserName}
          onChange={(e) => setSearchUserName(e.target.value)}
          type="text"
          name='userName'
          placeholder="User Name"
          className="m-2 form-control"
        />
        <input
          value={searchEmail}
          onChange={(e) => setSearchEmail( e.target.value)}
          type="email"
          name='email'
          placeholder="Email"
          className="form-control m-2 "
        />
        <select
        name='status'
          value={searchStatus} 
          onChange={(e) => setSearchStatus(e.target.value)}
          className="form-control m-2"
        >
          <option defaultValue>Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Waiting">Waiting</option>
        </select>
        
        <Button variant="outline-warning" className="m-2" type="submit">
          Search
        </Button>{" "}
</form> 
        </div>
    );
};

export default SearchForm;