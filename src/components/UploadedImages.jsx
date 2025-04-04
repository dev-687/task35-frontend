import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UploadedImages() {
    const [images, setImages] = useState([]);
    const baseUrl = "http://localhost:5000";
    // const baseUrl = "https://task35-backend.vercel.app";
    const api_version = "api/v1";
    useEffect(() => {
        axios.get(`${baseUrl}/${api_version}/uploads`)
        .then((images) => {
            setImages(images.data);
        })
       
        
    },[])

return (
    <div>
        <h1 className="text-center my-5 text-2xl font-bold">All Images</h1>
        <div className="uploaded-images flex flex-wrap gap-5 justify-center">
            {images.map((image) => (
                <div 
                    key={image._id} 
                    className="image-card w-72 border border-gray-300 rounded-lg shadow-md overflow-hidden text-center bg-white transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2"
                >
                    <img 
                        src={`${baseUrl}/${image.filePath}`} 
                        alt={image.filename} 
                        className="w-full h-52 object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-medium mb-2">{image.filename}</h3>
                        <button 
                            className="delete-button px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>  
    </div>
)
}

export default UploadedImages
