import styled from "styled-components";
import { NavLink } from "react-router-dom";

const EVENTS_LINKS = [
  { path: "/events", name: "All" },
  { path: "/events/new", name: "Add new event" },
];

const Nav = styled.nav``;
const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;
const Item = styled.li``;

const StyledNavLink = styled(NavLink)`
  &.active {
    text-decoration: underline;
  }
`

const EventsNavigation = () => {
  return (
    <Nav>
      <List>
        {EVENTS_LINKS.map((link) => (
          <Item key={link.path}>
            <NavLink to={link.path} end={link === EVENTS_LINKS[0]}>{link.name}</NavLink>
          </Item>
        ))}
      </List>
    </Nav>
  );
};

export default EventsNavigation;
