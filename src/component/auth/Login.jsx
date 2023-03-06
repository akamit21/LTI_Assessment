import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Swal from "sweetalert2";
import "./auth.css";
import { reset, userLogin } from "../../redux/actions";

const Login = (props) => {
  const form = useRef();
  const authReducer = useSelector((state) => (state.authReducer));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authReducer.loginResponse)
      if (authReducer.loginResponse?.error) {
        new Swal({
          title: "Failure",
          text: "User record not found!",
          icon: "warning",
          timer: 1500,
          button: false
        })
      } else {
        new Swal({
          title: "Success!",
          text: "User loggedin successfully!",
          icon: "success",
          timer: 1500,
          button: false
        }).then(() => {
          const itemInStore = localStorage.getItem("loggedInUser");
          if (itemInStore) {
            props.setUser(JSON.parse(itemInStore))
          }
          dispatch(reset())
          navigate("/add-event")
        })
      }
  }, [authReducer.loginResponse])

  const handleLogin = e => {
    e.preventDefault();
    let userData = {
      email: form.current.userEmail.value,
      password: form.current.userPassword.value,
    };
    dispatch(userLogin(userData))
  };

  return (
    <div className="login-box">
      <Container fluid="md" className="gradient-form">
        <Row>
          <Col md="6">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{ width: '185px' }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">We are The Team Eventoss</h4>
              </div>

              <p>Please login to your account</p>
              <Form onSubmit={handleLogin} ref={form}>
                <Form.Group className="mb-3" controlId="userEmail">
                  <Form.Control type="email" placeholder="Enter your email id!" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userPassword">
                  <Form.Control type="password" placeholder="Enter your password!" required />
                </Form.Group>

                <div className="text-center pt-1 mb-5 pb-1">
                  <Button type="submit" className="mb-4 w-100 gradient-custom-2">Sign in</Button>
                </div>
              </Form>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account? <Link to="/signup" className="btn btn-link">Sign Up</Link></p>

              </div>
            </div>
          </Col>

          <Col md="6">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default Login;
