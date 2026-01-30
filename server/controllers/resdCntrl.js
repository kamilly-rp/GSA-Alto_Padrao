import asyncHandler from "express-async-handler";
import prisma from "../config/prisma/prismaConfig.js";

/* =====================================================
   CREATE – Criar novo imóvel
===================================================== */
export const createResidency = asyncHandler(async (req, res) => {
  try {
    const data = req.body;

    const convertToInt = (field) => {
      if (typeof data[field] === "string" && data[field].trim() !== "") {
        const cleaned = data[field].replace(/[.,]/g, "");
        const parsed = parseInt(cleaned, 10);
        if (!isNaN(parsed)) data[field] = parsed;
        else delete data[field];
      } else if (
        data[field] === "" ||
        data[field] === null ||
        data[field] === undefined
      ) {
        delete data[field];
      }
    };

    [
      "price",
      "downPayment",
      "iptu",
      "bedrooms",
      "bathrooms",
      "garage",
      "area",
    ].forEach(convertToInt);

    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) delete data[key];
    });

     // Criar usuário se não existir
    const userEmail = "kamillyr284@gmail.com";
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: "Kamilly Rodrigues Pereira",
        },
      });
    }




    // campo obrigatório no Prisma
    const type = `${data.property}_${data.business}`;

    const residency = await prisma.residency.create({
      data: {
        title: data.title,
        description: data.description,

        business: data.business,
        property: data.property,
        type,
        highlight: data.highlight ?? false,

        price: data.price,
        address: data.address,
        country: data.country,
        city: data.city,
        region: data.region,

        facilities: data.facilities,
        image: data.image,
        code: data.code,

        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        garage: data.garage,
        area: data.area,

        financing: data.financing,
        downPayment: data.downPayment,
        iptu: data.iptu,

        carrossel: data.carrossel,

        owner: {
          connect: { email: data.userEmail },
        },
      },
    });

    res.status(201).json(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});

/* =====================================================
   LIST – Listar imóveis com filtros
===================================================== */
export const getAllResidencies = asyncHandler(async (req, res) => {
  const { business, property, region, highlight } = req.query;

  const filters = {};

  if (business) filters.business = business;
  if (property) filters.property = property;

  if (region) {
    filters.region = {
      contains: region,
      mode: "insensitive",
    };
  }

  if (highlight === "true") filters.highlight = true;

  const residencies = await prisma.residency.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(residencies);
});

/* =====================================================
   HIGHLIGHTS
===================================================== */
export const getHighlights = asyncHandler(async (req, res) => {
  const highlights = await prisma.residency.findMany({
    where: { highlight: true },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(highlights);
});

/* =====================================================
   DETAIL
===================================================== */
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const residency = await prisma.residency.findUnique({
    where: { id },
  });

  res.status(200).json(residency);
});


