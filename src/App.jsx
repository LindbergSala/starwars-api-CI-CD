import React, { useState, useEffect } from "react";
import { searchPeople, searchPlanets } from "./services/swapi";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import FavoritesList from "./components/FavoritesList";
import CustomFavoriteForm from "./components/CustomFavoriteForm";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("people");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Ladda favoriter från localStorage när appen startar
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Hämta data från SWAPI när söksträngen ändras
  useEffect(() => {
    if (query.trim() === "") return;

    const fetchData = async () => {
      const data =
        category === "people"
          ? await searchPeople(query)
          : await searchPlanets(query);
      setResults(data);
    };

    fetchData();
  }, [query, category]);

  // Lägg till favorit + nollställ sökfältet och resultat
  const addFavorite = (item) => {
    const updated = [...favorites, item];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    // 🪄 Töm sökrutan och ta bort resultaten
    setQuery("");
    setResults([]);
  };

  // Ta bort favorit
  const removeFavorite = (name) => {
    const updated = favorites.filter((f) => f.name !== name);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Lägg till egen favorit (från formuläret)
  const addCustomFavorite = (fav) => {
    const newFav = { ...fav, custom: true, type: category };
    addFavorite(newFav);
  };

  return (
    <div className="app">
      <h1>⭐ Star Wars Search</h1>

      <div className="search-area">
        <SearchBar query={query} setQuery={setQuery} />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="people">People</option>
          <option value="planets">Planets</option>
        </select>
      </div>

      <ResultsList results={results} addFavorite={addFavorite} />

      <CustomFavoriteForm addCustomFavorite={addCustomFavorite} />

      <FavoritesList
        favorites={favorites}
        removeFavorite={removeFavorite}
      />
    </div>
  );
}
