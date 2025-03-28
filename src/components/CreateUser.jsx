import React, { useState } from 'react';
import axios from 'axios';
const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const baseUrl = "https://task35-backend.vercel.app";
    const api_version = "api/v1";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        const result=await axios.post(`${baseUrl}/${api_version}/users`, formData, {
        
            headers: {
                "Content-Type": "application/json",
            },
            validateStatus: (status) => status < 500,
        });
        if (result.status === 201) {
            alert(result.data.message);
            setFormData({ name: '', email: '' });
        } else if (result.status === 400) {
            alert(result.data.message);
        } else {
            alert('An error occurred while creating the user.');
        }
    } ;              
    

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser;