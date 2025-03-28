import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    const baseUrl = "https://task35-backend.vercel.app";
    const api_version = "api/v1";
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/${api_version}/posts`); // Replace with your API endpoint
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="p-4 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                        <p className="text-gray-600"><strong>Author:</strong> {post.author.name}</p>
                        <p className="text-gray-700"><strong>Content:</strong> {post.content}</p>
                        <p className="text-gray-500 text-sm"><strong>Published Date:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {post.tags && post.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm inline-block">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListPost;