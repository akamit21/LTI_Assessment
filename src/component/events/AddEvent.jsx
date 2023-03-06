import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";
import Loader from "../common/Loader";
import Swal from "sweetalert2";
import { addNewEvent, reset } from "../../redux/actions";

export const AddEvent = () => {
  const itemInStore = JSON.parse(localStorage.getItem('loggedInUser'));
  const [formData, setFormData] = useState({})
  const eventReducer = useSelector((state) => (state.eventReducer));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventReducer.error && eventReducer.data == null) {
      new Swal({
        title: "Failure",
        text: "Error, Failed to add new event!",
        icon: "warning",
        timer: 1500,
        button: false
      })
    }

    if (eventReducer.data) {
      new Swal({
        title: "Success!",
        text: "Event added successfully!",
        icon: "success",
        timer: 1500,
        button: false
      }).then(() => {
        dispatch(reset())
        navigate("/")
      })
    }
  }, [eventReducer])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userId: itemInStore.id,
      ...formData
    }
    dispatch(addNewEvent(data))
  }

  return (
    <div className="container jumbotron mt-5">
      {eventReducer.isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="display-4">ADD NEW EVENT</h1>
          <hr />
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group className="mb-4" controlId="formEventName">
              <Form.Label className="fw-bold">Event Name</Form.Label>
              <Form.Control type="text" name="eventName" placeholder="Enter event name" onChange={e => handleChange(e)} required />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEventDate">
              <Form.Label className="fw-bold">Event Date</Form.Label>
              <Form.Control
                type="date"
                name="eventDate"
                placeholder="Enter event date"
                onChange={e => handleChange(e)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEventDescription">
              <Form.Label className="fw-bold">Event Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="eventDescription"
                placeholder="Enter event description"
                onChange={e => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEventPrice">
              <Form.Label className="fw-bold">Base Price</Form.Label>
              <Form.Control
                type="number"
                name="eventPrice"
                placeholder="Enter base price"
                onChange={e => handleChange(e)}
                required
              />
            </Form.Group>

            <div key={`inline-radio`} className="mb-3" onChange={e => handleChange(e)}>
              <Form.Check
                inline
                label="Normal Booking"
                name="eventBookingType"
                value="normal-booking"
                type="radio"
                id="inline-radio-1"
              />
              <Form.Check
                inline
                label="Premium Booking"
                name="eventBookingType"
                value="premium-booking"
                type="radio"
                id="inline-radio-2"
              />
            </div>

            <div key="checkbox" className="mb-3">
              <Form.Check type="checkbox" id="terms-and-conditions-check">
                <Form.Check.Input type="checkbox" defaultChecked={true} />
                <Form.Check.Label>I accept terms & conditions.</Form.Check.Label>
              </Form.Check>
            </div>

            <button type="submit" className="btn btn-outline-dark float-right">
              ADD
            </button>
          </Form>
        </>
      )}
    </div >
  );
}