import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { useSearchParams } from "react-router-dom";

const normalize = (value) =>
  value
    ?.toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filteredData, setFilteredData] = useState([]);
  const [lastFilters, setLastFilters] = useState(null);

  const [searchParams] = useSearchParams();

  // 🔹 FUNÇÃO CENTRAL DE FILTRO (única fonte de verdade)
  const applyFilters = (baseData, filters) => {
    let result = baseData;

    if (filters?.negocio) {
      result = result.filter(
        (item) =>
          normalize(item.business) === normalize(filters.negocio)
      );
    }

    if (filters?.tipo) {
      result = result.filter(
        (item) =>
          normalize(item.property) === normalize(filters.tipo)
      );
    }

    if (filters?.regiao) {
      const region = normalize(filters.regiao);
      result = result.filter(
        (item) =>
          normalize(item.region)?.includes(region)
      );
    }

    return result;
  };

  // 🔹 Sempre que data OU searchParams mudarem → aplicar filtro
  useEffect(() => {
    if (!data) return;

    const business = searchParams.get("business");
    const property = searchParams.get("property");
    const region = searchParams.get("region");

    // Se veio da HOME
    if (business || property || region) {
      const homeFilters = {
        negocio: business || "",
        tipo: property || "",
        regiao: region || "",
      };

      setLastFilters(homeFilters);
      const result = applyFilters(data, homeFilters);
      setFilteredData(result);
    }
    // Se veio de filtro interno
    else if (lastFilters) {
      const result = applyFilters(data, lastFilters);
      setFilteredData(result);
    }
    // Se não há filtro → mostra tudo
    else {
      setFilteredData(data);
    }

  }, [data, searchParams]);

  // 🔹 Filtro interno da SearchBar
  const handleSearch = (filters) => {
    if (!data) return;

    setLastFilters(filters);
    const result = applyFilters(data, filters);
    setFilteredData(result);
  };

  if (isError) {
    return (
      <div className="wrapper">
        <span>Erro ao carregar dados. Aguarde...</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader color="#4066ff" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar onSearch={handleSearch} />

        <div className="paddings flexCenter properties">
          {filteredData.length > 0 ? (
            filteredData.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))
          ) : (
            <p>Nenhum imóvel encontrado com esses filtros.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
