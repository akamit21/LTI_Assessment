import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventCard } from "./Card";
import { Filter } from "./Filter";
import Loader from "../common/Loader";
import { fetchAllEvents } from "../../redux/actions"

export const ListEvent = React.memo(() => {
  const itemInStore = JSON.parse(localStorage.getItem('loggedInUser'));
  const { error, isLoading, allEvents } = useSelector((state) => (state.fetchEventReducer));
  const dispatch = useDispatch();
  const [events, setEvents] = useState([])

  useEffect(() => {
    dispatch(fetchAllEvents())
  }, [])

  const calculateEventPrice = (data) => {
    return data.reduce((acc, item) => acc += Number(item.eventPrice), 0)
  }

  useEffect(() => {
    const data = [...allEvents].filter(eve => eve.userId === itemInStore.id)
    setEvents([...data])
  }, [allEvents])

  const handleFilter = (e) => {
    e.preventDefault();
    const data = [...allEvents].filter(eve => eve.userId === itemInStore.id && eve.eventBookingType === e.target.value)
    calculateEventPrice(data)
    setEvents([...data])
  }

  const pricing = useMemo(() => {
    return calculateEventPrice(events)
  }, [events]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container my-5">
          <Filter handleFilter={handleFilter} pricing={pricing} />
          <div className="row">
            {events.map((ev, index) => <EventCard key={index} data={ev} />)}
          </div>
        </div>
      )}
    </>
  );
})


