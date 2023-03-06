import React from "react";
import { Badge, Button, ButtonGroup, Col, Row } from 'react-bootstrap';

export const Filter = (props) => {
  const { handleFilter, pricing } = props
  return (
    <Row>
      <Col sm="6">
        <ButtonGroup className="float-right">
          <Button
            variant="secondary"
            value="normal-booking"
            onClick={e => handleFilter(e)}
          >
            Normal Booking
          </Button>
          <Button
            variant="secondary"
            value="premium-booking"
            onClick={e => handleFilter(e)}
          >
            Premium Booking
          </Button>
        </ButtonGroup>
      </Col>
      <Col sm={{ span: 3, offset: 3 }} className="text-end"><h3><Badge bg="secondary">Total: {pricing}</Badge></h3></Col>
    </Row>
  );
}