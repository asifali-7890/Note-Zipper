// src/pages/Notes.jsx
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext); // Access user details from context
    const navigate = useNavigate();



    const location = useLocation(); // Use this to access the search query from the URL

    useEffect(() => {
        const fetchNotes = async () => {

            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authorization token found!");
                return;
            }

            const searchParams = new URLSearchParams(location.search); // Extract the search query from the URL
            const searchQuery = searchParams.get('search') || ''; // Get the search param if available

            try {
                setLoading(true);
                const response = await axios.get(`/api/notes?search=${searchQuery}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setNotes(response.data);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [user, location.search]); // Trigger fetch when `user` or the `search` query changes


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("No authorization token found!");
                    return;
                }

                await axios.delete(`/api/notes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNotes(notes.filter(note => note._id !== id));
            } catch (error) {
                console.error('Failed to delete note:', error);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/notes/edit/${id}`); // Navigate to note edit page
    };

    const handleCreateNote = () => {
        navigate('/notes/create'); // Navigate to note creation page
    };

    return (
        <div className="container mx-auto py-8 min-h-[calc(100vh-170px)] ">
            <h1 className="text-3xl font-bold mb-4 text-center">Welcome to {user?.name}'s Notes</h1>

            <div className="mb-6 text-center">
                <button
                    onClick={handleCreateNote}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Create New Note
                </button>
            </div>

            {loading ? (
                <p>Loading notes...</p>
            ) : notes.length === 0 ? (
                <p className='text-center'>No notes available. Create a new note!</p>
            ) : (
                <div className="grid gap-4">
                    {notes.map(note => (
                        <div key={note._id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                            <h3 className="text-xl font-semibold">{note.title}</h3>
                            <p className="text-gray-700 mt-2">{note.content}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleEdit(note._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(note._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notes;


