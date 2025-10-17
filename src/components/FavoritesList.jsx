import React, { useState } from "react";

export default function FavoritesList({ favorites, removeFavorite }) {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? favorites
      : favorites.filter((f) => f.type === filter);

  if (!filtered.length) return null;

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <label>Filter:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="people">People</option>
        <option value="planets">Planets</option>
      </select>

      {filtered.map((f) => (
        <div key={f.name} className="card fav-card">
          <h3>{f.name} {f.custom && "(Custom)"}</h3>

          {/* --- PEOPLE --- */}
          {f.height && <p>Height: {f.height} cm</p>}
          {f.mass && <p>Mass: {f.mass} kg</p>}
          {f.hair_color && <p>Hair: {f.hair_color}</p>}
          {f.skin_color && <p>Skin: {f.skin_color}</p>}
          {f.eye_color && <p>Eyes: {f.eye_color}</p>}
          {f.birth_year && <p>Birth Year: {f.birth_year}</p>}
          {f.homeworld && !f.climate && !f.terrain && (
            <p>Homeworld: {f.homeworld_name || f.homeworld}</p>
          )}

          {/* --- PLANETS --- */}
          {f.climate && <p>Climate: {f.climate}</p>}
          {f.terrain && <p>Terrain: {f.terrain}</p>}
          {f.gravity && <p>Gravity: {f.gravity}</p>}
          {f.diameter && <p>Diameter: {f.diameter} km</p>}
          {f.population && f.population !== "unknown" && (
            <p>Population: {f.population}</p>
          )}

          <button onClick={() => removeFavorite(f.name)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
