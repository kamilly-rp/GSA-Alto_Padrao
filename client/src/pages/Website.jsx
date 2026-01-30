import React from "react";

import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Hero from "../components/Hero/Hero";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";
import ResidenciesSection from "./AllResidencies/ResidenciesSection";

const Website = () => {
  return (
    <div className="App">
      <Hero />

      {/* ===== MELHORES OPÇÕES ===== */}
      <Residencies />

      {/* ===== DEMAIS SEÇÕES ===== */}
      <ResidenciesSection />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
};

export default Website;
