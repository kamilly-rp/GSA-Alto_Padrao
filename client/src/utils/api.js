import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: `${baseURL}/api`,
});

/* =====================================================
   LIST – Todos os imóveis (COM FILTRO REAL)
===================================================== */
export const getAllProperties = async (filters = {}) => {
  try {
    const response = await api.get("/residency/allresd", {
      params: {
        type: filters.negocio || undefined,        // locacao | venda
        propertyType: filters.tipo || undefined,  // casa | apartamento
        region: filters.regiao || undefined,      // bairro / região
      },
    });

    return response.data;
  } catch (error) {
    toast.error("Erro ao carregar imóveis");
    throw error;
  }
};

/* =====================================================
   DETAIL – Imóvel por ID
===================================================== */
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Erro ao carregar o imóvel");
    throw error;
  }
};

/* =====================================================
   HIGHLIGHTS – Melhores Opções
===================================================== */
export const getHighlights = async () => {
  try {
    const response = await api.get("/residency/highlights");
    return response.data;
  } catch (error) {
    toast.error("Erro ao carregar destaques");
    throw error;
  }
};
