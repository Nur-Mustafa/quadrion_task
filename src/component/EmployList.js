import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import EditButton from "./EditButton";
import SearchForm from "./SearchForm";

const EmployList = () => {
  const [userData, setUserData] = useState([]);

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


  //pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(5)

  let count = userData.length;

  //fetching user data
  useEffect(() => {
    fetch("http://localhost:3030/users")
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

  //calculation for pagination
  const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = userData.slice(firstPostIndex, lastPostIndex);

    let pages = [];
    for (let i = 1; i <= Math.ceil(count / postsPerPage); i++) {
        pages.push(i)
    }
  


  //save user data
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { userName, firstName, lastName, email, contact, status };
    fetch("http://localhost:3030/users", {
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
      fetch("http://localhost:3030/users/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };


  // handle filter by status function
  const handleFilter = (value) => {
    
   fetch(`http://localhost:3030/users?status=${value}`)
   .then((res)=>res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.log(err.message));
  };
  

  return (
    <div className="container">
      <h1 className="text-center py-4 text-primary">
        Quad<span className="text-danger">RION</span>
        <span className="text-dark h6">Technology Ltd.</span>
      </h1>

      {/* search div */}
      <div className="border p-4 my-4 ">
        <SearchForm setUserData={setUserData} />
        <Button variant="success" className="m-2 me-5" onClick={handleShow}>
          Add New (+)
        </Button>{" "}
      </div>

      {/*----------- table to show info-------- */}

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
              currentPosts.map((item) => (
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

      {/* filter by status */}

      <div className="my-4">
        <h5 className="text-start">Filter by Status: </h5>
        <div className="d-flex flex-start">
        <Button variant="success" className="m-1" onClick={()=>handleFilter("Confirmed")}>
          Confirmed
        </Button>{" "}
        <Button variant="warning" className="m-1" onClick={()=>handleFilter("Waiting")}>
        Waiting
        </Button>{" "}
        </div>
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

      

      {/* ***********pagination*/}

      <div className='mx-auto mb-5'>
                {
                    pages.map((page, index) =>
                        <button
                            key={index}
                            className={currentPage === page ? 'btn btn-info mx-2' : 'mx-2 btn btn-outline-info'}
                            onClick={() => setCurrentPage(page)}>{page}
                        </button>)
                }
            </div>
    </div>
  );
};

export default EmployList;
