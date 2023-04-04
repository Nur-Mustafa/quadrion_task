import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import EditButton from "./EditButton";
import SearchForm from "./SearchForm";

const EmployList = () => {
  const [userData, setUserData] = useState(null);

  //offcanvas state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // add form state
  const [userName, userNameChange] = useState("");
  const [firstName, firstNameChange] = useState("");
  const [lastName, lastNameChange] = useState("");
  const [email, emailChange] = useState("");
  const [contact, contactChange] = useState("");
  const [status, statusChange] = useState("");

  
// search state
  const [search, setSearch] = useState({
    userName: "",
    email: "",
    status: "",
  });

  //fetching user data
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUserData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //search by username
  const searchByUserName = (item) => {
    console.log(search);
    if (search?.userName.toLowerCase().includes(item?.userName.toLowerCase())) {
      return true;
    }else if(search?.userName===''){
      return true;
    }
    return false;
  };

  //search by email
  const searchByEmail = (item) => {
    if (search.email.toLowerCase().includes(item.email.toLowerCase())) {
      return true;
    }else if(search.email===''){
      return true;
    }
    return false;
  };

  //search by status
  const searchByStatus = (item) => {
    if (search.status.toLowerCase().includes(item.status.toLowerCase())) {
      return true;
    }else if(search.status===''){
      return true;
    }
    return false;
  };

  
  //save user data
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { userName, firstName, lastName, email, contact, status };
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        alert("Saved successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  
  //---- remove data function
  const RemoveData = (id) => {
    if (window.confirm("Do you want to delete?")) {
    }
  };
  return (
    <div className="container">
      <div className="border p-4 my-4 d-flex flex-column flex-lg-row">
 <SearchForm setSearch={setSearch}/>
    
        <Button variant="success" className="m-2 me-5" onClick={handleShow}>
          Add New (+)
        </Button>{" "}
      </div>

      <div>
        <Table striped bordered hover>
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.filter(searchByUserName).filter(searchByEmail).filter(searchByStatus).map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userName}</td>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.status}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => RemoveData(item.id)}
                    >
                      clear
                    </Button>{" "}
                   
                    <EditButton item={item}></EditButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      {/* -----------user info drawer-------- */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="bg-info">
          <Offcanvas.Title>New User</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              value={userName}
              onChange={(e) => userNameChange(e.target.value)}
              type="text"
              placeholder=""
              className="form-control mb-3"
              required
            />
            <label>First Name</label>
            <input
              value={firstName}
              onChange={(e) => firstNameChange(e.target.value)}
              type="text"
              placeholder=""
              className="form-control mb-3"
              required
            />
            <label>Last Name</label>
            <input
              value={lastName}
              onChange={(e) => lastNameChange(e.target.value)}
              type="text"
              placeholder=""
              className="form-control mb-3"
              required
            />
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => emailChange(e.target.value)}
              type="email"
              placeholder=""
              className="form-control mb-3"
              required
            />
            <label>Contact Number</label>
            <input
              value={contact}
              onChange={(e) => contactChange(e.target.value)}
              type="phone"
              placeholder=""
              className="form-control mb-3"
            />
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => statusChange(e.target.value)}
              className="form-control mb-4"
            >
              <option>Select...</option>
              <option>Confirmed</option>
              <option>Waiting</option>
            </select>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      
    </div>
  );
};

export default EmployList;
