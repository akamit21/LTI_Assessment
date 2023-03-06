import React from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./event.css";

export const EventCard = props => {
  const { data } = props

  return (
    <div className="col-md-4 my-4">
      <Card >
        <div className="box">
          <div className="ribbon ribbon-top-left"><span className="text-uppercase">{data.eventBookingType}</span></div>
          <Card.Img src="https://placeimg.com/400/280/tech" position='top' alt='...' />
          <Card.Body>
            <Card.Title>{data.eventName} on <em>{data.eventDate}</em></Card.Title>
            <div className="card-text">
              <div style={{ height: "30px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", }}>{data.eventDescription}</div>
              <br />
              <span className="float-right">
                <em>Price: </em>{data.eventPrice}
              </span>
            </div>
            <Link to={`/event/${data.id}`} className="btn btn-dark">
              Edit
            </Link>
          </Card.Body>
        </div>
      </Card >
    </div >
  );
};

export default EventCard;