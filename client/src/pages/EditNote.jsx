import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [originalNote, setOriginalNote] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`/api/notes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setFormData(response.data);
                setOriginalNote(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching note:", error);
                alert("Failed to load note");
                navigate("/");
            }
        };

        fetchNote();
    }, [id, navigate]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.content.trim()) newErrors.content = "Content is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetHandler = () => {
        setFormData(originalNote);
        setErrors({});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            await axios.put(`/api/notes/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/");
        } catch (error) {
            console.error("Error updating note:", error);
            alert(error.response?.data?.message || "Update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Note</h1>
                    <p className="text-gray-600">Update your existing note</p>
                </div>

                <form onSubmit={submitHandler} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
                    {/* Title Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`block w-full p-3 border ${errors.title ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:ring-2 focus:ring-blue-500`}
                            placeholder="Note title"
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Content Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="content"
                            rows={6}
                            value={formData.content}
                            onChange={handleInputChange}
                            className={`block w-full p-3 border ${errors.content ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:ring-2 focus:ring-blue-500`}
                            placeholder="Note content"
                        />
                        <div className="mt-1 text-right text-sm text-gray-500">
                            {formData.content.length}/2000 characters
                        </div>
                        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    {/* Category Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`block w-full p-3 border ${errors.category ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:ring-2 focus:ring-blue-500`}
                        >
                            <option value="">Select a category</option>
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                            <option value="Study">Study</option>
                            <option value="Ideas">Ideas</option>
                        </select>
                        {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={resetHandler}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Reset Changes
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Updating...
                                </span>
                            ) : " Update Note"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditNote;