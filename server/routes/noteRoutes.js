import express from "express";
import {
    getNoteById,
    getNotes,
    CreateNote,
    DeleteNote,
    UpdateNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for notes
router.route("/")
    .get(protect, getNotes)
    .post(protect, CreateNote);



router.route("/:id")
    .get(protect, getNoteById)
    .put(protect, UpdateNote)
    .delete(protect, DeleteNote);

export default router;
