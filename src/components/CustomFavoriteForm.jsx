import React, { useState } from "react";

export default function CustomFavoriteForm({ addCustomFavorite }) {
  const [form, setForm] = useState({
    name: "",
    birth_year: "",
    homeworld: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    addCustomFavorite(form);
    setForm({ name: "", birth_year: "", homeworld: "" });
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <h2>Add Custom Favorite</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Birth Year"
        value={form.birth_year}
        onChange={(e) => setForm({ ...form, birth_year: e.target.value })}
      />
      <input
        placeholder="Homeworld"
        value={form.homeworld}
        onChange={(e) => setForm({ ...form, homeworld: e.target.value })}
      />
      <button type="submit">Add Custom Favorite</button>
    </form>
  );
}
