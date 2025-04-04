import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const baseUrl = "http://localhost:5000";
    // const baseUrl = "https://task35-backend.vercel.app";
    const api_version = "api/v1";
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
    
        try {
        const response = await axios.post(`${baseUrl}/${api_version}/uploads`, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
            const percentCompleted = Math.round((event.loaded * 100) / event.total);
            setProgress(percentCompleted);
            },
        });
        console.log("File uploaded successfully:", response.data);
        } catch (error) {
        console.error("Error uploading file:", error);
        } finally {
        setUploading(false);
        setFile(null);
        setProgress(0);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
                    uploading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                {uploading ? `Uploading... ${progress}%` : "Upload"}
            </button>
        </div>
    );
};

export default FileUpload;