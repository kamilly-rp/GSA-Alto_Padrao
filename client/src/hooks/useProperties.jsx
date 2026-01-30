//A pasta hooks guarda funções que concentram lógica complexa para que seus componentes só se preocupem em mostrar a interface.

//HOOK RESPONSAVEL POR MOSTRAR IMÓVEIS
//Ele centraliza a lógica de: Buscar imóveis no backend. Controlar loading. Controlar erro. Cachear dados


import React from 'react';
import { useQuery } from 'react-query';
import { getAllProperties } from '../utils/api';

const useProperties = () => {

    const {data, isLoading, isError, refetch} = useQuery(
        "allProperties", 
        getAllProperties, 
        { refetchOnWindowFocus: false }
    );

    return {
        data,
        isError, 
        isLoading, 
        refetch,
    }; 
};

export default useProperties;