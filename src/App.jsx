import React, { useState } from "react";
import axios from "axios";
import './App.css';
import Navbar from "./Navbar";
import dotenv from "dotenv";

dotenv.config();

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleRemoveBackground = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/background/remove`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Set the edited image URL received from the backend
      setEditedImage(response.data.imageUrl);
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };

  const handleDownload = async () => {
    try {
      if (editedImage) {
        // Fetch the processed image as a blob
        const response = await axios.get(editedImage, {
          responseType: "blob",
        });

       
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "processed_image.png");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  
  
  

  return (
    
    <div className="background-remover">
      <Navbar/>
      <h1>Image Background Remover</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      {editedImage && (
        <div className="image-container">
          <div className="first"><h2>Edited Image:</h2>
          <img src={editedImage} alt="Edited" /></div>
          <div className="second">
          <button className="down" onClick={handleDownload}>Download</button>
          </div>
          

        </div>
        )}
        
    </div>
  );
};

export default App;
