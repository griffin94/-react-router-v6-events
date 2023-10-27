import React from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";

const wrapper = {
  display: "flex",
  justifyContent: "center",
};

const card = {
  flexGrow: 0,
  flexBasis: "30%",
};

const img = {
  maxWidth: "100%",
  aspectRatio: "16/9",
};

const buttonWrapper = {
  display: "flex",
  justifyContent: "space-between",
};

const Event = () => {
  const event = useLoaderData();

  return (
    <>
      <div style={wrapper}>
        <div style={card}>
          <img src={event.image} style={img} />
          <h2>{event.title}</h2>
          <span>{event.date}</span>
          <p>{event.description}</p>
          <div style={buttonWrapper}>
            <Link to="..">Back</Link>
            <Link to="edit">Edit</Link>
            <Link to="delete">Remove</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Event;
