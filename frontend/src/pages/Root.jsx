import React, { useEffect } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { getAuthTokenExpiration } from "../utils/auth";
import { Header, Nav } from "../components";
import { ThemeProvider } from "styled-components";

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

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, duration);
  }, [token, submit]);

  return (
    <div>
      <ThemeProvider
        theme={{
          breakpoints: {
            xs: 0,
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            xxl: "1400px",
          },
        }}
      >
        <Header>
          <Nav>
            <Nav.Item>
              <NavLink to="/">Home</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/events">Events</NavLink>
            </Nav.Item>
            {token ? (
              <Nav.Item>
                <Form action="/logout" method="post">
                  <button type="submit">Logout</button>
                </Form>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <NavLink to="/login">Log In</NavLink>
              </Nav.Item>
            )}
          </Nav>
        </Header>
        <main style={mainContainer}>
          <Outlet />
        </main>
      </ThemeProvider>
    </div>
  );
};

export default Root;
