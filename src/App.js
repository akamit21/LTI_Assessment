import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { ListEvent } from "./component/events/ListEvent";
import { AddEvent } from "./component/events/AddEvent";
import { EditEvent } from "./component/events/EditEvent";
import Login from "./component/auth/Login";
import SignUp from "./component/auth/SignUp";

import { fetchUsers, userLogout } from "./redux/actions";

const App = () => {
  const { loggedIn } = useSelector((state) => (state.authReducer));
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const itemInStore = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (itemInStore) {
      setUser(itemInStore);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(userLogout());
    setUser({})
  };

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Eventoss
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {user.token ? (
              <>
                <ul className="navbar-nav me-auto">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/add-event" className="nav-link">
                      Add Event
                    </Link>
                  </li>

                </ul>
                <div className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <span className="nav-link">
                      {user.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-link nav-link" onClick={handleLogout}>
                      LogOut
                    </button>
                  </li>
                </div>
              </>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav >
      <Routes>
        <Route path="/" exact={true} element={itemInStore?.token ? <ListEvent /> : <Navigate to='/login' />} />
        <Route path="/event/:eventId" element={itemInStore?.token ? <EditEvent /> : <Navigate to='/login' />} />
        <Route path="/add-event" element={itemInStore?.token ? <AddEvent /> : <Navigate to='/login' />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;