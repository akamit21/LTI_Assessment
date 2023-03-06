import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  const style = {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "height": "85vh",
    "backgroundColor": "#0000000d",
    "borderRadius": "8px",
  }
  return (
    <div className="container" style={style}>
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default Loader;
