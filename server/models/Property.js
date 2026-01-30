//Ele define como um imóvel é estruturado no banco quando você usa Mongoose, não Prisma.
 
//Definir o formato dos documentos no MongoDB.Validar dados. Criar, buscar, atualizar e deletar registros. Esse model representa um imóvel (Property / Residency).

import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  location: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Property = mongoose.model('Property', propertySchema,'Residency');

export default Property;
