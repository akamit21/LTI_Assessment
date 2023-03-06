import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { reset, userSignUp } from "../../redux/actions";

const SignUp = () => {
  const form = useRef();
  const userReducer = useSelector((state) => (state.userReducer));
  const authReducer = useSelector((state) => (state.authReducer));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  useEffect(() => {
    if (authReducer.registrationResponse)
      if (authReducer?.registrationResponse?.error) {
        new Swal({
          title: "Failure",
          text: "Unable to register new user!",
          icon: "warning",
          timer: 1500,
          button: false
        })
      } else {
        new Swal({
          title: "Success!",
          text: "User registered successfully!",
          icon: "success",
          timer: 1500,
          button: false
        }).then(() => {
          dispatch(reset())
          navigate("/login")
        })
      }
  }, [authReducer.registrationResponse])


  const validate = (email, password) => {
    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (emailRegex.test(email)) {
      let filteredId = userReducer.users.find((user) => user.email === email)
      if (filteredId) {
        setEmailErr(true)
        return false;
      }
    }
    if (!passwordRegex.test(password)) {
      setPasswordErr(true)
      return false
    }

    return true
  }

  const handleSignUp = e => {
    e.preventDefault();
    let validated = validate(form.current.userEmail.value, form.current.userPassword.value);
    let userData = {
      name: form.current.userName.value,
      email: form.current.userEmail.value,
      password: form.current.userPassword.value,
    };

    if (validated) {
      dispatch(userSignUp(userData))
    }
  }

  return (
    <Container fluid="md">
      <Card className="text-black m-5" style={{ borderRadius: "25px" }}>
        <Card.Body>
          <Row>
            <Col md="10" lg="6" className="order-2 order-lg-1">
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-left text-uppercase ">Sign up</h2>
                <div className="mb-3">
                  <Form onSubmit={handleSignUp} ref={form}>
                    <Form.Group className="mb-3" controlId="userName">
                      <Form.Label className="text-center">
                        Name
                      </Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" onChange={e => setEmailErr(false)} required />
                      {emailErr && <p className="text-danger mt-1">Email Id already registered.</p>}
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="userPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" onChange={e => setPasswordErr(false)} required />
                      {passwordErr && <p className="text-danger mt-1">Password length should be 8 charaters including one uppercase, one lowercase, one number and one special character.</p>}
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    >
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Create Account
                      </Button>
                    </div>
                  </Form>

                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary fw-bold">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
              <Card.Img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SignUp;
