// src/components/SearchBar/SearchBar.jsx
import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    negocio: "",
    tipo: "",
    regiao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <div className="field">
          <label>Tipo de negócio</label>
          <select name="negocio" value={filters.negocio} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="locacao">Locação</option>
            <option value="venda">Venda</option>
          </select>
        </div>

        <div className="field">
          <label>Tipo de imóvel</label>
          <select name="tipo" value={filters.tipo} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="casa">Casa</option>
            <option value="sobrado">Sobrado</option>
            <option value="apartamento">Apartamento</option>
          </select>
        </div>

        <div className="field">
          <label>Região</label>
          <input
            type="text"
            name="regiao"
            value={filters.regiao}
            onChange={handleChange}
            placeholder="Digite a região"
          />
        </div>

        <button className="search-button" onClick={handleSearch}>
          <HiSearch size={18} />
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
