import { useLoaderData, Link } from "react-router-dom";

const wrapper = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
};

const card = {
  flexGrow: 0,
  flexBasis: "calc((100% - 2rem) / 3)",
};

const img = {
  maxWidth: "100%",
  aspectRatio: "16/9",
};

const Events = () => {
  const events = useLoaderData();
  return (
    <div style={wrapper} key={event.id}>
      {events.map((event) => (
        <div style={card} key={event.id}>
          <img src={event.image} style={img} />
          <h2>{event.title}</h2>
          <span>{event.date}</span>
          <p>{event.description}</p>
          <Link to={event.id}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Events;
