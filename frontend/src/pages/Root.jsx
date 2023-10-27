import React, { useEffect } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { getAuthTokenExpiration } from "../utils/auth";

const navigationContainer = {
  listStyle: "none",
  display: "flex",
  gap: "1rem",
  padding: "1rem",
};

const mainContainer = {
  padding: "2rem",
};

const Root = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;
    
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const duration = getAuthTokenExpiration();
    console.log(duration);
    
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, duration);
  }, [token, submit]);

  return (
    <div>
      <header>
        <nav>
          <ul style={navigationContainer}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>

            {token ? (
              <li>
                <Form action="/logout" method="post">
                  <button type="submit">Logout</button>
                </Form>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Log In</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main style={mainContainer}>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
