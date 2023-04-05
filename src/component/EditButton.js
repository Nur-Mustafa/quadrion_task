import React, { useEffect, useState } from 'react';
import { Button, Form, Offcanvas } from 'react-bootstrap';

const EditButton = ({item}) => {
     
//sidebar state
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


 
  const [userName, userNameChange] = useState(item?.userName);
  const [firstName, firstNameChange] = useState(item?.firstName);
  const [lastName, lastNameChange] = useState(item?.lastName);
  const [email, emailChange] = useState(item?.email);
  const [contact, contactChange] = useState(item?.contact);
  const [status, statusChange] = useState(item?.status);

 //update information
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { userName, firstName, lastName, email, contact, status };
    fetch("http://localhost:3030/users/"+item.id, {
      method: "PUT",
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

    return (
        <>
      <Button variant="success" onClick={handleShow}>
        Edit
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update Information</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input readOnly disabled
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
            <input readOnly disabled
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
              <option value='' defaultValue>Select...</option>
              <option value='Confirmed'>Confirmed</option>
              <option value='Waiting'>Waiting</option>
            </select>

            <Button variant="success" type="submit">
              Update
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
    );
};

export default EditButton;