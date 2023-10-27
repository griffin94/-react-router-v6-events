import { json, redirect, createSearchParams } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
const API_BASE_URL = "http://localhost:8080";

export async function api({ request, api, payload, requiredAuth }) {
  const authToken = getAuthToken();

  if (requiredAuth && !authToken) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    throw redirect("/login?redirectTo=" + pathname);
  }

  try {
    const response = await fetch(api, {
      method: request.method,
      signal: request.signal,
      headers: {
        "Content-Type": "application/json",
        ...(authToken
          ? {
              Authorization: ["Bearer", " ", authToken].join(""),
            }
          : {}),
      },
      ...(payload ? { body: JSON.stringify(payload) } : {}),
    });

    return response;
  } catch (e) {
    return json({
      message: e.message,
      name: e.name,
    });
  }
}

export async function tokenLoader() {
  const token = getAuthToken();
  console.log(["getAuthToken", token]);
  return token;
}

export async function authAction({ request }) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  const formData = await request.formData();
  const exctractedData = Object.fromEntries(formData.entries());
  const pathname = {
    LOGIN: "/login",
    SIGNUP: "/signup",
  }[exctractedData.intent];
  const API_URL = API_BASE_URL + pathname;

  const response = await api({
    api: API_URL,
    payload: exctractedData,
    request,
  });

  if (response.ok || response.status === 422 || response.status === 401) {
    const data = await response.json();
    console.log([`authAction - ${pathname.slice(1)}`, data]);
    if (response.ok) {
      const token = data.token;
      localStorage.setItem("event-app-token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem(
        "event-app-token-expiration",
        expiration.toISOString()
      );
      return redirect(redirectTo || "/");
    }
    return data;
  }

  if (!response.ok) {
    return json({
      message: {
        LOGIN: "Could not login.",
        SIGNUP: "Could not create an account.",
      }[exctractedData.intent],
    });
  }
}

export function logoutAction() {
  console.log(["logoutAction"]);
  localStorage.removeItem("event-app-token");
  return redirect("/");
}

export async function eventFormAction({ request, params }) {
  const formData = await request.formData();
  const exctractedData = Object.fromEntries(formData.entries());
  const pathname = {
    POST: "/events",
    PATCH: "/events/" + params.id,
  }[request.method];
  const API_URL = API_BASE_URL + pathname;

  const response = await api({
    api: API_URL,
    payload: exctractedData,
    request,
    requiredAuth: true,
  });
  console.log(response);
  try {
    const data = await response.json();
    console.log([`eventFormAction - ${request.method}`, data]);
    return data;
  } catch {
    return json(
      {
        message: {
          POST: "Could not add event.",
          PATCH: "Could not edit event.",
        }[request.method],
      },
      {
        status: response.status,
        statusText: response.statusText,
      }
    );
  }
}

export async function getEvents({ request }) {
  const API_URL = API_BASE_URL + "/events";

  const response = await api({ api: API_URL, request });

  if (response.ok) {
    const data = await response.json();
    console.log(["getEvents", data.events]);
    return data.events;
  } else {
    return json(
      { message: "Could not fetch events." },
      {
        status: response.status,
        statusText: response.statusText,
      }
    );
  }
}

export async function getEvent({ request, params }) {
  const API_URL = API_BASE_URL + "/events/" + params.id;

  const response = await api({ api: API_URL, request });

  if (response.ok) {
    const data = await response.json();
    console.log(["getEvent", data.event]);
    return data.event;
  } else {
    return json(
      { message: "Could not fetch event." },
      {
        status: response.status,
        statusText: response.statusText,
      }
    );
  }
}

export async function removeEvent({ request, params }) {
  const API_URL = API_BASE_URL + "/events/" + params.id;
  const response = await api({ api: API_URL, request, requiredAuth: true });

  if (response.ok || response.status === 422 || response.status === 401) {
    const data = await response.json();
    console.log(["removeEvent", data]);
    return data;
  } else {
    return json(
      { message: "Could not fetch event." },
      {
        status: response.status,
        statusText: response.statusText,
      }
    );
  }
}
