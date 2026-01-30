// SESSÃO NOVA. CARDS CLICÁVEIS DE "TODOS OS IMOVEIS" "IMOVEIS PARA LOCAÇÃO" E "IMOVEIS A VENDA"

import React, { useState } from "react";
import "./ResidenciesSection.css";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    img: "https://res.cloudinary.com/dfwzpqhaz/image/upload/v1768398256/classe-media-contemporanea-bela-casa-moderna_1269188-24496_d2d1pr.avif",
    title: "IMÓVEIS PARA LOCAÇÃO",
    desc: "As melhores opções para locação da região!",
    info: "Imóveis para locação disponíveis. Consulte condições.",
    route: "/properties?business=LOCACAO"
  },
  {
    img: "https://res.cloudinary.com/dfwzpqhaz/image/upload/v1768398549/uma-casa-com-um-jardim-e-uma-palmeira_1103290-52670_ey8vvx.avif",
    title: "IMÓVEIS PARA VENDA",
    desc: "Encontre o imóvel dos seus sonhos!",
    info: "Imóveis à venda com condições especiais.",
    route: "/properties?business=VENDA"
  },
  {
    img: "https://res.cloudinary.com/dfwzpqhaz/image/upload/v1768396976/footer_img_gk4m4g.jpg",
    title: "OPÇÕES EXCLUSIVAS",
    desc: "Luxo e conforto em cada detalhe.",
    info: "Veja todas nossas opções exclusivas para você!",
    route: "/properties"
  }
];

export default function ResidenciesSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = (idx, route) => {
    setActiveIndex(idx);
    navigate(route);
  };

  return (
    <section className="imoveis-section">
      <div className="title">
        <h2>Imóveis Exclusivos</h2>
      </div>

      <div className="imoveis-cards">
        {cards.map((card, idx) => (
          <div
            className={`imovel-card ${activeIndex === idx ? "active" : ""}`}
            key={idx}
            onClick={() => handleClick(idx, card.route)}
          >
            <img src={card.img} alt={card.title} />

            <div className="imovel-overlay">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <button>Saiba Mais</button>

              {activeIndex === idx && (
                <div className="imovel-info">{card.info}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
