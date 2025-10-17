import React, { useEffect, useState } from "react";

export default function ResultsList({ results, addFavorite }) {
  const [homeworlds, setHomeworlds] = useState({});

  // Hämta hemvärldar (bara relevant för people)
  useEffect(() => {
    const fetchHomeworlds = async () => {
      const urls = results.map((r) => r.homeworld).filter(Boolean);
      const uniqueUrls = [...new Set(urls)];
      const fetched = {};
      await Promise.all(
        uniqueUrls.map(async (url) => {
          try {
            const res = await fetch(url);
            const data = await res.json();
            fetched[url] = data.name;
          } catch {
            fetched[url] = "Unknown";
          }
        })
      );
      setHomeworlds(fetched);
    };

    if (results.length) fetchHomeworlds();
  }, [results]);

  if (!results.length) return <p>No results yet...</p>;

  return (
    <div className="results">
      <h2>Results</h2>
      {results.map((r) => (
        <div key={r.name} className="card">
          <h3>{r.name}</h3>

          {/* --- PEOPLE --- */}
          {r.height && <p>Height: {r.height} cm</p>}
          {r.mass && <p>Mass: {r.mass} kg</p>}
          {r.hair_color && <p>Hair: {r.hair_color}</p>}
          {r.skin_color && <p>Skin: {r.skin_color}</p>}
          {r.eye_color && <p>Eyes: {r.eye_color}</p>}
          {r.birth_year && <p>Birth Year: {r.birth_year}</p>}
          {r.homeworld && (
            <p>Homeworld: {homeworlds[r.homeworld] || "Loading..."}</p>
          )}

          {/* --- PLANETS --- */}
          {r.climate && <p>Climate: {r.climate}</p>}
          {r.terrain && <p>Terrain: {r.terrain}</p>}
          {r.population && r.population !== "unknown" && (
            <p>Population: {r.population}</p>
          )}
          {r.gravity && <p>Gravity: {r.gravity}</p>}
          {r.diameter && <p>Diameter: {r.diameter} km</p>}

          <button onClick={() => addFavorite(r)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
}
