// FIRST PAGE - PRINCIPAL

import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Hero = () => {
  const navigate = useNavigate();

  // AGORA recebe um OBJETO, não string
  const handleSearch = (filters) => {
    const params = new URLSearchParams();

    if (filters.negocio) {
      params.append("business", filters.negocio.toUpperCase());
    }

    if (filters.tipo) {
      params.append("property", filters.tipo.toUpperCase());
    }

    if (filters.regiao) {
      params.append("region", filters.regiao);
    }

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">

        {/* LEFT */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "ease-in" }}
            >
              O Lar perfeito <br />
              você encontra <br /> aqui!
            </motion.h1>
          </div>

          <div className="flexColStart secondaryText flexhero-des">
            <span>
              Encontre o imóvel perfeito com quem valoriza cada conquista!
            </span>
          </div>

          {/* SEARCHBAR CORRETA */}
          <SearchBar onSearch={handleSearch} />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={1800} end={2000} duration={4} />+
              </span>
              <span className="secondaryText">
                Clientes <br /> atendidos
              </span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={950} end={1000} duration={4} />+
              </span>
              <span className="secondaryText">
                Negócios <br /> fechados
              </span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={800} />+
              </span>
              <span className="secondaryText">
                Famílias <br /> Satisfeitas
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "ease-in" }}
            className="image-container"
          >
            <img
              src="https://res.cloudinary.com/dfwzpqhaz/image/upload/v1767706560/r3_w6rsol.png"
              alt="houses"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
