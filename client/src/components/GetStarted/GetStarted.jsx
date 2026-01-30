//FIRST PAGE. BLOCO DE MAPS DE ENDEREÇO IMOBILIARIA

import React from "react";
import "./GetStarted.css";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Encontre uma de nossas imobiliárias</span>
          <span className="secondaryText">
            <a href="https://www.google.com/maps/place/Rusig+Office+Tower/@-23.5449275,-46.4531453,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce67d9f5913169:0x4efd3e20dcfcb9bd!8m2!3d-23.5449275!4d-46.4531453!16s%2Fg%2F11f66h81gm?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D">Rua Fontoura Xavier, 1157, Sala 4A - Edifício Rusig Office Tower - Itaquera/SP</a> <br />
            
          </span>
          <button className="button" href>
            <a href="https://www.google.com/maps/place/Rusig+Office+Tower/@-23.5449275,-46.4531453,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce67d9f5913169:0x4efd3e20dcfcb9bd!8m2!3d-23.5449275!4d-46.4531453!16s%2Fg%2F11f66h81gm?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D">Veja no Maps</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
