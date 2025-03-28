import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [authors, setAuthors] = useState([]);
    const baseUrl = "https://task35-backend.vercel.app";
    const api_version = "api/v1";

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`${baseUrl}/${api_version}/users`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    setAuthors(response.data);
                } else {
                    alert("Failed to fetch authors.");
                }
            } catch (error) {
                console.error("Error fetching authors:", error);
                alert("An error occurred while fetching authors.");
            }
        };

        fetchAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const postData = {
            title,
            content,
            author,
            tags
        };

        try {
            const response = await axios.post(`${baseUrl}/${api_version}/posts`, postData);
            if (response.status === 201) {
                setMessage("Post created successfully!");
                setTitle("");
                setContent("");
                setAuthor("");
            } else {
                setMessage("Failed to create post. Please try again.");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            setMessage("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Author
                    </label>
                    <select
                        id="author"
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>
                            Select an author
                        </option>
                        {authors.map((author) => (
                            <option key={author._id} value={author._id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    <select
                        id="tags"
                        name="tags"
                        multiple
                        onChange={(e) => {
                            const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                            setTags(selectedOptions);
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 text-white font-bold rounded-lg ${
                        loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Post"}
                </button>
            </form>
            {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
        </div>
    );
};

export default CreatePost;