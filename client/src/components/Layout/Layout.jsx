// ARQUIVO ESTRUTURAL GLOBAL (Esqueleto)
//Ele define como TODAS as páginas do site são fixas
//Define cabeçalho fixo, Rodapé fixo, Área central onde as páginas mudam

import React from 'react';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <div style={{background: "var(--black)", overflow: "hidden"}}>
                <Header/>
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;