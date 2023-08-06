import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Navbar";
import UploadImage from "./components/UploadImage";
import EditedImage from "./components/EditedImage";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleRemoveBackground = async () => {
    try {
      if (!selectedImage) {
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];

        const apiKey = "AkAcYmqLmt2gekR7DEA7YRrC";
        const apiUrl = "https://api.remove.bg/v1.0/removebg";

        const response = await axios.post(
          apiUrl,
          {
            image_file_b64: base64Image,
          },
          {
            headers: {
              "X-Api-Key": apiKey,
            },
            responseType: "blob",
          }
        );

        const editedImageUrl = URL.createObjectURL(response.data);
        setEditedImage(editedImageUrl);
      };

      reader.readAsDataURL(selectedImage);
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };

  const handleDownload = async () => {
    try {
      if (editedImage) {
        // Fetch the processed image as a base64 string
        const response = await axios.get(editedImage, {
          responseType: "arraybuffer",
        });

        // Converting the array buffer to a base64 string
        const base64String = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        // Converting the base64 string to a Blob
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/png" });

        
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "processed_image.png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove the link element after clicking
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="background-remover">
      <Navbar />
      <UploadImage handleImageUpload={handleImageUpload} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      <EditedImage editedImage={editedImage} handleDownload={handleDownload} />
    </div>
  );
};

export default App;
