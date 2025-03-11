import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";

// Get all notes for the logged-in user
// Get all notes for the logged-in user, with search functionality
const getNotes = asyncHandler(async (req, res) => {
    const searchQuery = req.query.search || ''; // Get search query from URL params
    const notes = await Note.find({
        user: req.user._id,
        $or: [
            { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
            { content: { $regex: searchQuery, $options: 'i' } },
            { category: { $regex: searchQuery, $options: 'i' } }
        ]
    });
    res.json(notes);
});



// Get a single note by ID
const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    note ? res.json(note) : res.status(404).json({ message: "Note not found" });
});

// Create a new note
const CreateNote = asyncHandler(async (req, res) => {
    // console.log('Creating note inside controller...');  // Check if this logs
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const note = new Note({ user: req.user._id, title, content, category });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
});

// Delete a note by ID
const DeleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "Unauthorized action or note not found" });
        return;
    }

    await note.deleteOne();
    res.json({ message: "Note removed" });
});

// Update a note by ID
const UpdateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "Unauthorized action or note not found" });
        return;
    }

    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
});

export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };
