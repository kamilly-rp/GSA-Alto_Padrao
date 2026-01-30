// CARD INDIVIDUAL DO IMÓVEL

import React from 'react'
import './PropertyCard.css'
import { AiFillHeart } from 'react-icons/ai'
import { truncate } from 'lodash'
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {

    const navigate = useNavigate();

    return (
        <div
            className="flexColStart r-card"
            onClick={() => navigate(`../properties/${property.id}`)}
        >

            <AiFillHeart size={24} color="white" />

            {/* IMG MANTIDA */}
            <img src={property.image} alt="home" />

            <span className="secondaryText r-price">
                <span style={{ color: "orange" }}>R$</span>
                <span>
                    {property.price.toLocaleString('pt-BR', {
                        minimumFractionDigits: 0
                    })}
                </span>
            </span>

            <span className="primaryText">
                {truncate(property.title, { length: 15 })}
            </span>

            <span className="secondaryText">
                {truncate(property.description, { length: 80 })}
            </span>

            {/* TAG DE NEGÓCIO (ADIÇÃO NECESSÁRIA) */}
            {property.business === "VENDA" && <span className="property-tag venda">Venda</span>}
            {property.business === "LOCACAO" && <span className="property-tag locacao">Locação</span>}

        </div>
    );
};

export default PropertyCard;
