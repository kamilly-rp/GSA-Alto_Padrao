//é o “acesso oficial ao banco de dados” da sua aplicação.

//O PrismaClient é quem: Abre a conexão com o banco MongoDB. Executa consultas (findMany, create, update, delete) Garante tipagem e segurança nos dados

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default prisma
