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
  const [initialFilterApplied, setInitialFilterApplied] = useState(false);

  const [searchParams] = useSearchParams();

  // 🔹 aplica filtro da HOME UMA ÚNICA VEZ
  useEffect(() => {
    if (!data || initialFilterApplied) return;

    let result = data;

    const business = searchParams.get("business");
    const property = searchParams.get("property");
    const region = searchParams.get("region");

    if (business) {
      result = result.filter(
        (item) =>
          normalize(item.business) === normalize(business)
      );
    }

    if (property) {
      result = result.filter(
        (item) =>
          normalize(item.property) === normalize(property)
      );
    }

    if (region) {
      const r = normalize(region);
      result = result.filter(
        (item) =>
          normalize(item.region)?.includes(r)
      );
    }

    setFilteredData(result);
    setInitialFilterApplied(true);
  }, [data, searchParams, initialFilterApplied]);

  // 🔹 filtro da SEARCHBAR (manda em tudo depois)
  const handleSearch = (filters) => {
    if (!data) return;

    let result = data;

    if (filters.negocio) {
      result = result.filter(
        (item) =>
          normalize(item.business) === normalize(filters.negocio)
      );
    }

    if (filters.tipo) {
      result = result.filter(
        (item) =>
          normalize(item.property) === normalize(filters.tipo)
      );
    }

    if (filters.regiao) {
      const region = normalize(filters.regiao);
      result = result.filter(
        (item) =>
          normalize(item.region)?.includes(region)
      );
    }

    setFilteredData(result);
  };

  if (isError) {
    return (
      <div className="wrapper">
        <span>Erro ao carregar dados. Aguarde...</span>
      </div>
    );
  }

  if (isLoading || !initialFilterApplied) {
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
