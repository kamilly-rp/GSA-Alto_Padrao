import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
  getHighlights, 
} from "../controllers/resdCntrl.js";

const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get("/highlights", getHighlights); //  rota fixa antes
router.get("/:id", getResidency);         //  rota dinâmica por último

export { router as residencyRoute };
