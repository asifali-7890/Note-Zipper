import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!content.trim()) newErrors.content = "Content is required";
        if (!category.trim()) newErrors.category = "Category is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
        setErrors({});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const token = localStorage.getItem("token");
        const noteData = { title, content, category };

        try {
            await axios.post("/api/notes", noteData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            resetHandler();
            navigate("/");
        } catch (error) {
            console.error("Error creating note:", error);
            alert(error.response?.data?.message || "Error creating note");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Note</h1>
                    <p className="text-gray-600">Organize your thoughts and ideas</p>
                </div>

                <form onSubmit={submitHandler} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
                    {/* Title Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`block w-full pr-10 p-3 border ${errors.title ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Note title"
                            />
                            {errors.title && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Content Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={6}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={`block w-full p-3 border ${errors.content ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm`}
                            placeholder="Write your note content here..."
                        />
                        <div className="mt-1 text-right text-sm text-gray-500">
                            {content.length}/1000 characters
                        </div>
                        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    {/* Category Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`block w-full p-3 border ${errors.category ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
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
                    <div className="flex justify-end space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="inline-flex items-center px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={resetHandler}
                            className="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                "Create Note"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateNote;