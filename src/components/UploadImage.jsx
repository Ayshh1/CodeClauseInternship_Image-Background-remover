import React from "react";

const UploadImage = ({ handleImageUpload }) => {
  return (
    <>
      <h1>Image Background Remover</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </>
  );
};

export default UploadImage;
