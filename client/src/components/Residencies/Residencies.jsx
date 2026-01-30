// MELHORES OPÇÕES (HOME, HORIZONTAL)
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "./Residencies.css";
import "./ResidenciesCards.css";
import { PuffLoader } from "react-spinners";

import { getHighlights } from "../../utils/api";

const sliderSettings = {
  slidesPerView: 4,
  spaceBetween: 40,
  breakpoints: {
    1200: { slidesPerView: 4 },
    900: { slidesPerView: 2.5 },
    600: { slidesPerView: 1.2 },
    500: { slidesPerView: 1 },
    0: { slidesPerView: 1 }
  }
};

const Residencies = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getHighlights()
      .then((data) => {
        setCards(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    return (
      <div className="melhores-opcoes-wrapper">
        <span>Erro. Por favor, aguarde.</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="melhores-opcoes-wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader color="#4066ff" />
      </div>
    );
  }

  return (
    <div id="residencies" className="melhores-opcoes-wrapper">
      <div className="innerWidth">
        <div className="melhores-opcoes-title">Melhores opções</div>

        <Swiper {...sliderSettings}>
          <SlideNextButton />

          {cards.map((card) => (
            <SwiperSlide key={card.id || card._id}>
              <Link
                to={`/properties/${card.id || card._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card-imovel">
                  <img src={card.image} alt={card.title} />

                  <div className="card-info">
                    <div className="card-title">{card.title}</div>

                    <div className="card-preco-local">
                      <span>
                        {card.price?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      &nbsp;|&nbsp;
                      {card.city} - {card.region}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
