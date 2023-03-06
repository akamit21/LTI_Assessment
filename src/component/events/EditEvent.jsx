import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { editEvent, fetchEventById, reset } from "../../redux/actions";


export const EditEvent = (props) => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({})
  const { error, isLoading, data } = useSelector((state) => (state.eventReducer));
  const { isLoading: isFetching, eventData } = useSelector((state) => (state.fetchEventReducer));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId))
    }
  }, [eventId])

  useEffect(() => {
    if (eventData) {
      setFormData({ ...eventData })
    }
  }, [eventData])

  useEffect(() => {
    if (error && data == null) {
      new Swal({
        title: "Failure",
        text: "Error, Failed to update event!",
        icon: "warning",
        timer: 1500,
        button: false
      })
    }

    if (data) {
      new Swal({
        title: "Success!",
        text: "Event updated successfully!",
        icon: "success",
        timer: 1500,
        button: false
      }).then(() => {
        dispatch(reset())
        navigate("/")
      })
    }
  }, [data, error])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...formData
    }
    dispatch(editEvent(data, formData.id))
  }

  return (
    <div className="container jumbotron mt-5">
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <h1 className="display-4">EDIT EVENT</h1>
          <hr />
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group className="mb-4" controlId="formEventName">
              <Form.Label className="fw-bold">Event Name</Form.Label>
              <Form.Control
                type="text"
                name="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={e => handleChange(e)}
                required />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEventDate">
              <Form.Label className="fw-bold">Event Date</Form.Label>
              <Form.Control
                type="date"
                name="eventDate"
                placeholder="Enter event date"
                value={formData.eventDate}
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
                value={formData.eventDescription}
                onChange={e => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEventPrice">
              <Form.Label className="fw-bold">Base Price</Form.Label>
              <Form.Control
                type="number"
                name="eventPrice"
                placeholder="Enter base price"
                value={formData.eventPrice}
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
                defaultChecked={formData?.eventBookingType === "normal-booking" ? true : false}
                type="radio"
                id="inline-radio-1"
              />
              <Form.Check
                inline
                label="Premium Booking"
                name="eventBookingType"
                value="premium-booking"
                defaultChecked={formData?.eventBookingType === "premium-booking" ? true : false}
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
              EDIT
            </button>
          </Form>
        </>
      )}
    </div >
  );
}
