import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import {
  authAction,
  eventFormAction,
  getEvent,
  getEvents,
  logoutAction,
  tokenLoader,
  removeEvent,
} from "./api";
import { revalidateEvent } from "./revalidation";
import Root from "./Root";
import Events from "./Events";
import Event from "./Event";
import DeleteEventModal from "./DeleteEventModal";
import AddEvent from "./AddEvent";
import EventsRoot from "./EventsRoot";
import EditEventModal from "./EditEventModal";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} loader={tokenLoader}>
      <Route path="logout" action={logoutAction} />
      <Route path="login" element={<LoginPage />} action={authAction} />
      <Route path="signup" element={<SignupPage />} action={authAction} />
      <Route path="events" element={<EventsRoot />}>
        <Route index={true} element={<Events />} loader={getEvents} />
        <Route path="new" element={<AddEvent />} action={eventFormAction} />
        <Route
          path=":id"
          id="EVENT"
          element={<Event />}
          loader={getEvent}
          shouldRevalidate={revalidateEvent}
        >
          <Route
            path="delete"
            element={<DeleteEventModal />}
            action={removeEvent}
          />
          <Route
            path="edit"
            element={<EditEventModal />}
            action={eventFormAction}
          />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
